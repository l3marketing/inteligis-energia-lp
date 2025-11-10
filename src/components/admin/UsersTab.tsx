import { useEffect, useMemo, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Search, UserPlus, Pencil, Trash2, KeyRound, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { getUsersAsync, createUser, updateUser, deleteUser, requestPasswordReset, getCurrentUserRole, updateAuthEmail, type AppUser, type UserRole, type UserStatus } from "@/lib/users";
import { useSupabase } from "@/lib/supabase";

const roleLabels: Record<UserRole, string> = {
  admin: "Admin",
  user: "Usuário",
};

const statusLabels: Record<UserStatus, string> = {
  active: "Ativo",
  inactive: "Inativo",
};

const UsersTab = () => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<AppUser[]>([]);
  const [sortBy, setSortBy] = useState<"name" | "email" | "role" | "status" | "createdAt">("createdAt");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editing, setEditing] = useState<AppUser | null>(null);
  const [currentRole, setCurrentRole] = useState<UserRole>("user");

  useEffect(() => {
    const fetch = async () => {
      const list = await getUsersAsync();
      setUsers(list);
      const role = await getCurrentUserRole();
      setCurrentRole(role);
    };
    fetch();
  }, []);

  useEffect(() => {
    const refresh = async () => {
      const list = await getUsersAsync();
      setUsers(list);
    };
    const onCustom = () => refresh();
    window.addEventListener("inteligis:users_updated", onCustom as EventListener);
    return () => {
      window.removeEventListener("inteligis:users_updated", onCustom as EventListener);
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter(u => [u.name, u.email, u.role, u.status].filter(Boolean).some(v => String(v).toLowerCase().includes(q)));
  }, [users, query]);

  const displayed = useMemo(() => {
    const arr = [...filtered];
    const getVal = (u: AppUser) => {
      switch (sortBy) {
        case "createdAt": return new Date(u.createdAt).getTime();
        case "name": return u.name.toLowerCase();
        case "email": return u.email.toLowerCase();
        case "role": return u.role.toLowerCase();
        case "status": return u.status.toLowerCase();
        default: return "";
      }
    };
    arr.sort((a,b) => {
      const av = getVal(a);
      const bv = getVal(b);
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return arr;
  }, [filtered, sortBy, sortDir]);

  // Create form state
  const [cName, setCName] = useState("");
  const [cEmail, setCEmail] = useState("");
  const [cRole, setCRole] = useState<UserRole>("user");
  const [cStatus, setCStatus] = useState<UserStatus>("active");
  const [cNotes, setCNotes] = useState("");
  const [cPass, setCPass] = useState("");

  const resetCreateForm = () => {
    setCName(""); setCEmail(""); setCRole("user"); setCStatus("active"); setCNotes(""); setCPass("");
  };

  const handleCreate = async () => {
    const payload = { name: cName.trim(), email: cEmail.trim(), role: cRole, status: cStatus, notes: cNotes.trim() || undefined };
    if (!payload.name || !payload.email) {
      toast.error("Preencha nome e e-mail.");
      return;
    }
    const res = await createUser({ ...payload, password: useSupabase ? cPass : undefined });
    if (!res.ok) {
      toast.error(res.error || "Falha ao criar usuário.");
      return;
    }
    toast.success("Usuário criado.");
    setOpenCreate(false);
    resetCreateForm();
    const list = await getUsersAsync();
    setUsers(list);
  };

  const [eName, setEName] = useState("");
  const [eEmail, setEEmail] = useState("");
  const [eRole, setERole] = useState<UserRole>("user");
  const [eStatus, setEStatus] = useState<UserStatus>("active");
  const [eNotes, setENotes] = useState("");

  const openEditDialog = (u: AppUser) => {
    setEditing(u);
    setEName(u.name);
    setEEmail(u.email);
    setERole(u.role);
    setEStatus(u.status);
    setENotes(u.notes || "");
    setOpenEdit(true);
  };

  const handleUpdate = async () => {
    if (!editing) return;
    const next: AppUser = { ...editing, name: eName.trim(), email: eEmail.trim(), role: eRole, status: eStatus, notes: eNotes.trim() || undefined };
    const res = await updateUser(next);
    if (!res.ok) {
      toast.error(res.error || "Falha ao atualizar usuário.");
      return;
    }
    // tentativa de atualizar e-mail de login (requer backend service role)
    if (editing.authId && eEmail.trim() && useSupabase && currentRole === "admin") {
      const upd = await updateAuthEmail(editing.authId, eEmail.trim());
      if (!upd.ok) {
        console.warn("Atualização de e-mail de login não realizada:", upd.error);
        toast.info("E-mail de login não foi atualizado no Supabase (requer backend service role). O e-mail de contato foi atualizado.");
      }
    }
    toast.success("Usuário atualizado.");
    setOpenEdit(false);
    const list = await getUsersAsync();
    setUsers(list);
  };

  const handleDelete = async (u: AppUser) => {
    if (!confirm(`Confirma excluir o usuário ${u.name}?`)) return;
    const res = await deleteUser(u.id);
    if (!res.ok) {
      toast.error(res.error || "Falha ao excluir usuário.");
      return;
    }
    toast.success("Usuário excluído.");
    const list = await getUsersAsync();
    setUsers(list);
  };

  const handleResetPassword = async (u: AppUser) => {
    if (!useSupabase) {
      toast.error("Reset de senha requer Supabase ativo.");
      return;
    }
    const res = await requestPasswordReset(u.email);
    if (!res.ok) {
      toast.error(res.error || "Falha ao solicitar reset de senha.");
      return;
    }
    toast.success("E-mail de redefinição enviado.");
  };

  const toggleSort = (field: typeof sortBy) => {
    if (sortBy === field) {
      setSortDir(d => d === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortDir("asc");
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <CardTitle>Usuários</CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative w-64 max-w-[60vw]">
              <Search className="absolute left-2 top-2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar por nome, e-mail, função..." value={query} onChange={e => setQuery(e.target.value)} className="pl-8" />
            </div>
            <Button onClick={() => setOpenCreate(true)} className="gap-2"><UserPlus className="h-4 w-4" />Novo usuário</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="cursor-pointer" onClick={() => toggleSort("name")}>Nome {sortBy === "name" ? (sortDir === "asc" ? <ArrowUp className="inline h-3 w-3"/> : <ArrowDown className="inline h-3 w-3"/>) : <ArrowUpDown className="inline h-3 w-3"/>}</TableHead>
                  <TableHead className="cursor-pointer" onClick={() => toggleSort("email")}>E-mail {sortBy === "email" ? (sortDir === "asc" ? <ArrowUp className="inline h-3 w-3"/> : <ArrowDown className="inline h-3 w-3"/>) : <ArrowUpDown className="inline h-3 w-3"/>}</TableHead>
                  <TableHead className="cursor-pointer" onClick={() => toggleSort("role")}>Função {sortBy === "role" ? (sortDir === "asc" ? <ArrowUp className="inline h-3 w-3"/> : <ArrowDown className="inline h-3 w-3"/>) : <ArrowUpDown className="inline h-3 w-3"/>}</TableHead>
                  <TableHead className="cursor-pointer" onClick={() => toggleSort("status")}>Status {sortBy === "status" ? (sortDir === "asc" ? <ArrowUp className="inline h-3 w-3"/> : <ArrowDown className="inline h-3 w-3"/>) : <ArrowUpDown className="inline h-3 w-3"/>}</TableHead>
                  <TableHead className="cursor-pointer" onClick={() => toggleSort("createdAt")}>Criado {sortBy === "createdAt" ? (sortDir === "asc" ? <ArrowUp className="inline h-3 w-3"/> : <ArrowDown className="inline h-3 w-3"/>) : <ArrowUpDown className="inline h-3 w-3"/>}</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayed.map(u => (
                  <TableRow key={u.id}>
                    <TableCell>{u.name}</TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell>{roleLabels[u.role]}</TableCell>
                    <TableCell>{statusLabels[u.status]}</TableCell>
                    <TableCell>{new Date(u.createdAt).toLocaleDateString("pt-BR")}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="outline" size="sm" className="gap-1" onClick={() => openEditDialog(u)} disabled={currentRole !== "admin"}><Pencil className="h-4 w-4" />Editar</Button>
                        <Button variant="outline" size="sm" className="gap-1" onClick={() => handleResetPassword(u)} title="Enviar e-mail de redefinição" disabled={currentRole !== "admin"}><KeyRound className="h-4 w-4" />Reset senha</Button>
                        <Button variant="destructive" size="sm" className="gap-1" onClick={() => handleDelete(u)} disabled={currentRole !== "admin"}><Trash2 className="h-4 w-4" />Excluir</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {displayed.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground">Nenhum usuário encontrado.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Dialog de criação */}
      <Dialog open={openCreate} onOpenChange={setOpenCreate}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Novo usuário</DialogTitle>
            <DialogDescription>Crie um usuário. Em Supabase, o Admin define a senha de login do usuário.</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Nome</Label>
              <Input value={cName} onChange={e => setCName(e.target.value)} placeholder="Nome completo" />
            </div>
            <div>
              <Label>E-mail</Label>
              <Input value={cEmail} onChange={e => setCEmail(e.target.value)} placeholder="email@dominio.com" />
            </div>
            <div>
              <Label>Função</Label>
              <Select value={cRole} onValueChange={(v) => setCRole(v as UserRole)}>
                <SelectTrigger><SelectValue placeholder="Função" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="user">Usuário</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Status</Label>
              <Select value={cStatus} onValueChange={(v) => setCStatus(v as UserStatus)}>
                <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Ativo</SelectItem>
                  <SelectItem value="inactive">Inativo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2">
              <Label>Observações</Label>
              <Textarea value={cNotes} onChange={e => setCNotes(e.target.value)} placeholder="Notas livres" />
            </div>
            {useSupabase && (
              <div className="md:col-span-2">
                <Label>Senha (definida pelo Admin)</Label>
                <Input type="password" value={cPass} onChange={e => setCPass(e.target.value)} placeholder="Defina a senha de login do usuário" />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenCreate(false)}>Cancelar</Button>
            <Button onClick={handleCreate} disabled={currentRole !== "admin"}>Criar usuário</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog de edição */}
      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar usuário</DialogTitle>
            <DialogDescription>
              Atualize os metadados do usuário (nome, e-mail de contato, função e status). Alterar o e-mail de login de outro usuário requer backend com service role.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Nome</Label>
              <Input value={eName} onChange={e => setEName(e.target.value)} />
            </div>
            <div>
              <Label>E-mail</Label>
              <Input value={eEmail} onChange={e => setEEmail(e.target.value)} />
            </div>
            <div>
              <Label>Função</Label>
              <Select value={eRole} onValueChange={(v) => setERole(v as UserRole)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="user">Usuário</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Status</Label>
              <Select value={eStatus} onValueChange={(v) => setEStatus(v as UserStatus)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Ativo</SelectItem>
                  <SelectItem value="inactive">Inativo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2">
              <Label>Observações</Label>
              <Textarea value={eNotes} onChange={e => setENotes(e.target.value)} />
            </div>
          </div>
          <DialogFooter className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {useSupabase ? "Para redefinição de senha, use o botão 'Reset senha' na tabela (envia e-mail)." : "Reset de senha por e-mail requer Supabase."}
              </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => setOpenEdit(false)}>Cancelar</Button>
              <Button onClick={handleUpdate} disabled={currentRole !== "admin"}>Salvar alterações</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UsersTab;