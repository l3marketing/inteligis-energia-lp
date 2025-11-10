// Persistência simples de metadados do lead (tracking, valores do formulário, etc.)
// Fica desacoplado do store principal para evitar acoplamento com Supabase/DB.
import type { TrackingFields } from "@/lib/tracking";
import { supabase, useSupabase } from "@/lib/supabase";

export interface LeadMeta {
  id: string;
  // Campos de rastreamento coletados no momento da captura
  tracking?: TrackingFields;
  // Payload bruto enviado pelo formulário (sem segredos)
  formValues?: Record<string, unknown>;
  // Timestamp de criação dos metadados (ISO)
  createdAt?: string;
}

const META_PREFIX = "inteligis:lead_meta:";

function key(id: string): string {
  return `${META_PREFIX}${id}`;
}

export function saveLeadMeta(id: string, meta: Omit<LeadMeta, "id">): void {
  try {
    const now = new Date().toISOString();
    const payload: LeadMeta = { id, createdAt: now, ...meta };
    localStorage.setItem(key(id), JSON.stringify(payload));
    // Notifica listeners interessados em atualizações de metadados
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("inteligis:lead_meta_updated", { detail: { id } }));
    }
  } catch (e) {
    // Silencioso: nunca quebrar a captura por falha de meta
    // eslint-disable-next-line no-console
    console.warn("Falha ao salvar LeadMeta", e);
  }
}

export function getLeadMeta(id: string): LeadMeta | null {
  try {
    const raw = localStorage.getItem(key(id));
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? (parsed as LeadMeta) : null;
  } catch {
    return null;
  }
}

export function removeLeadMeta(id: string): void {
  try {
    localStorage.removeItem(key(id));
  } catch {}
}

// Persistência remota (Supabase): tabela recomendada `lead_meta` com colunas:
// - lead_id (uuid) PK/FK
// - meta (jsonb)
// - created_at (timestamp)
type DbLeadMeta = { lead_id: string; meta: Record<string, unknown>; created_at?: string };

export async function upsertLeadMetaSupabase(id: string, meta: Omit<LeadMeta, "id">): Promise<boolean> {
  if (!useSupabase) return false;
  try {
    const payload: DbLeadMeta = { lead_id: id, meta: meta as unknown as Record<string, unknown> };
    const { error } = await supabase.from<DbLeadMeta>("lead_meta").upsert(payload, { onConflict: "lead_id" });
    if (error) {
      // eslint-disable-next-line no-console
      console.error("Erro ao upsert lead_meta no Supabase:", error.message);
      return false;
    }
    return true;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("Falha ao salvar lead_meta no Supabase:", e);
    return false;
  }
}

export async function fetchLeadMetaSupabase(id: string): Promise<LeadMeta | null> {
  if (!useSupabase) return null;
  try {
    const { data, error } = await supabase
      .from<DbLeadMeta>("lead_meta")
      .select("lead_id, meta, created_at")
      .eq("lead_id", id)
      .maybeSingle();
    if (error) {
      // eslint-disable-next-line no-console
      console.error("Erro ao buscar lead_meta no Supabase:", error.message);
      return null;
    }
    if (!data) return null;
    const result: LeadMeta = { id: data.lead_id, createdAt: data.created_at, ...(data.meta as any) };
    return result;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("Falha ao buscar lead_meta no Supabase:", e);
    return null;
  }
}