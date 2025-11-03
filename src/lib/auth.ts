// Auth simples client-side para MVP da área restrita

const SESSION_KEY = "inteligis:adminAuthed";

export function isAuthed(): boolean {
  return sessionStorage.getItem(SESSION_KEY) === "true";
}

export function login(username: string, password: string): boolean {
  const expectedUser = import.meta.env.VITE_ADMIN_USERNAME;
  const expectedPass = import.meta.env.VITE_ADMIN_PASSWORD;
  if (!expectedUser || !expectedPass) return false; // exige configuração
  const ok = username === String(expectedUser) && password === String(expectedPass);
  if (ok) sessionStorage.setItem(SESSION_KEY, "true");
  return ok;
}

export function logout(): void {
  sessionStorage.removeItem(SESSION_KEY);
}