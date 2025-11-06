// Auth simples client-side para MVP da área restrita
// Suporta modo Supabase (quando VITE_USE_SUPABASE=true) com fallback para env-based
import { supabase, useSupabase } from "./supabase";

const SESSION_KEY = "inteligis:adminAuthed";

export function isAuthed(): boolean {
  return sessionStorage.getItem(SESSION_KEY) === "true";
}

export async function login(username: string, password: string): Promise<boolean> {
  if (useSupabase) {
    const { data, error } = await supabase.auth.signInWithPassword({ email: username, password });
    if (error || !data.session) {
      console.error("Falha no login Supabase:", error);
      return false;
    }
    sessionStorage.setItem(SESSION_KEY, "true");
    return true;
  }
  const expectedUser = import.meta.env.VITE_ADMIN_USERNAME;
  const expectedPass = import.meta.env.VITE_ADMIN_PASSWORD;
  if (!expectedUser || !expectedPass) return false; // exige configuração
  const ok = username === String(expectedUser) && password === String(expectedPass);
  if (ok) sessionStorage.setItem(SESSION_KEY, "true");
  return ok;
}

export async function logout(): Promise<void> {
  sessionStorage.removeItem(SESSION_KEY);
  if (useSupabase) {
    await supabase.auth.signOut();
  }
}