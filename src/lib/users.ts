import { supabase, useSupabase } from "./supabase";

export type UserRole = "admin" | "user";
export type UserStatus = "active" | "inactive";

export interface AppUser {
  id: string; // local id or app_users id
  authId?: string; // Supabase auth user id
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  notes?: string;
  createdAt: string; // ISO
  updatedAt: string; // ISO
}

const LOCAL_KEY = "inteligis:users";

function readLocal(): AppUser[] {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    if (Array.isArray(arr)) return arr as AppUser[];
    return [];
  } catch (e) {
    console.error("Falha ao ler usuários locais:", e);
    return [];
  }
}

function writeLocal(users: AppUser[]): void {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(users));
    window.dispatchEvent(new Event("inteligis:users_updated"));
  } catch (e) {
    console.error("Falha ao salvar usuários locais:", e);
  }
}

export async function getUsersAsync(): Promise<AppUser[]> {
  if (useSupabase) {
    const { data, error } = await supabase
      .from("app_users")
      .select("id, auth_id, name, email, role, status, notes, created_at, updated_at")
      .order("created_at", { ascending: false });
    if (error) {
      console.error("Falha ao buscar usuários no Supabase:", error);
      return readLocal();
    }
    return (data || []).map((u: any) => ({
      id: String(u.id),
      authId: u.auth_id ? String(u.auth_id) : undefined,
      name: String(u.name || ""),
      email: String(u.email || ""),
      role: (u.role || "user") as UserRole,
      status: (u.status || "active") as UserStatus,
      notes: u.notes ? String(u.notes) : undefined,
      createdAt: u.created_at || new Date().toISOString(),
      updatedAt: u.updated_at || u.created_at || new Date().toISOString(),
    }));
  }
  return readLocal();
}

export async function createUser(params: {
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  notes?: string;
  password?: string; // definido pelo Admin em Supabase
}): Promise<{ ok: boolean; user?: AppUser; error?: string }> {
  const now = new Date().toISOString();
  if (useSupabase) {
    if (!params.password) {
      return { ok: false, error: "Para criar usuário no Supabase, informe uma senha definida pelo Admin." };
    }
    const { data, error } = await supabase.auth.signUp({
      email: params.email,
      password: params.password,
      options: { data: { name: params.name, role: params.role } },
    });
    if (error) {
      console.error("Falha ao criar usuário (auth) no Supabase:", error);
      return { ok: false, error: error.message };
    }
    const authId = data.user?.id;
    const { data: upData, error: upErr } = await supabase
      .from("app_users")
      .insert({
        auth_id: authId,
        name: params.name,
        email: params.email,
        role: params.role,
        status: params.status,
        notes: params.notes || null,
      })
      .select()
      .single();
    if (upErr) {
      console.error("Falha ao salvar metadados de usuário no Supabase:", upErr);
      return { ok: false, error: upErr.message };
    }
    const user: AppUser = {
      id: String(upData.id),
      authId: authId,
      name: params.name,
      email: params.email,
      role: params.role,
      status: params.status,
      notes: params.notes,
      createdAt: upData.created_at || now,
      updatedAt: upData.updated_at || upData.created_at || now,
    };
    return { ok: true, user };
  }
  // Fallback local
  const users = readLocal();
  const user: AppUser = {
    id: crypto.randomUUID(),
    name: params.name,
    email: params.email,
    role: params.role,
    status: params.status,
    notes: params.notes,
    createdAt: now,
    updatedAt: now,
  };
  users.unshift(user);
  writeLocal(users);
  return { ok: true, user };
}

export async function updateUser(user: AppUser): Promise<{ ok: boolean; user?: AppUser; error?: string }> {
  const now = new Date().toISOString();
  if (useSupabase) {
    const { data, error } = await supabase
      .from("app_users")
      .update({
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        notes: user.notes || null,
      })
      .eq("id", user.id)
      .select()
      .single();
    if (error) {
      console.error("Falha ao atualizar usuário no Supabase:", error);
      return { ok: false, error: error.message };
    }
    const updated: AppUser = {
      ...user,
      updatedAt: data.updated_at || now,
    };
    return { ok: true, user: updated };
  }
  const users = readLocal();
  const idx = users.findIndex(u => u.id === user.id);
  if (idx >= 0) {
    users[idx] = { ...user, updatedAt: now };
    writeLocal(users);
    return { ok: true, user: users[idx] };
  }
  return { ok: false, error: "Usuário não encontrado" };
}

export async function deleteUser(id: string): Promise<{ ok: boolean; error?: string }> {
  if (useSupabase) {
    const { error } = await supabase.from("app_users").delete().eq("id", id);
    if (error) {
      console.error("Falha ao excluir usuário no Supabase:", error);
      return { ok: false, error: error.message };
    }
    return { ok: true };
  }
  const users = readLocal();
  const next = users.filter(u => u.id !== id);
  writeLocal(next);
  return { ok: true };
}

export async function requestPasswordReset(email: string): Promise<{ ok: boolean; error?: string }> {
  if (!useSupabase) {
    return { ok: false, error: "Reset de senha por e-mail requer Supabase ativo." };
  }
  const { data, error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) {
    console.error("Falha ao solicitar reset de senha:", error);
    return { ok: false, error: error.message };
  }
  return { ok: true };
}

export async function getCurrentUserRole(): Promise<UserRole> {
  try {
    if (useSupabase) {
      const { data: auth } = await supabase.auth.getUser();
      const authId = auth?.user?.id;
      if (authId) {
        const { data, error } = await supabase.from("app_users").select("role").eq("auth_id", authId).maybeSingle();
        if (!error && data && data.role) return (data.role as UserRole);
      }
      // fallback: se não encontrado, tratar como "user"
      return "user";
    }
    // modo local: tratar como admin para gestão
    return "admin";
  } catch {
    return useSupabase ? "user" : "admin";
  }
}

export async function updateAuthEmail(authId: string, newEmail: string): Promise<{ ok: boolean; error?: string }> {
  // ATENÇÃO: requer Supabase Service Role via backend seguro; não disponível no cliente anon
  // Este método existe para futura integração: atualmente retorna erro informativo.
  if (!useSupabase) return { ok: false, error: "Requer Supabase ativo." };
  return { ok: false, error: "Alterar e-mail de login de outro usuário requer backend com service role (não disponível no cliente)." };
}