// Lead store com provider pattern: LocalStorage e Supabase
// Mantém interface e funções para facilitar troca futura para API (Supabase/REST)
import { supabase, useSupabase } from "./supabase";

export type LeadStatus = "Novo" | "Contato" | "Qualificado" | "Proposta" | "Fechado" | "Perdido";

export interface Lead {
  id: string;
  name: string;
  company: string;
  whatsapp: string;
  email: string;
  billValue?: number;
  sector?: string;
  estimatedMonthlySavings?: number;
  origin?: string;
  createdAt: string; // ISO date
  status: LeadStatus;
}

const STORAGE_KEY = "inteligis:leads";
const TABLE = "leads";

// Helpers de mapeamento (Supabase <-> App)
type DbLead = {
  id: string;
  name: string;
  company: string;
  whatsapp: string;
  email: string;
  bill_value?: number | null;
  sector?: string | null;
  estimated_monthly_savings?: number | null;
  origin?: string | null;
  created_at: string; // ISO
  status: LeadStatus;
};

function normalizeStatus(s: string): LeadStatus {
  const allowed: LeadStatus[] = ["Novo", "Contato", "Qualificado", "Proposta", "Fechado", "Perdido"];
  return (allowed as string[]).includes(s) ? (s as LeadStatus) : "Novo";
}

function toAppLead(row: DbLead): Lead {
  return {
    id: row.id,
    name: row.name,
    company: row.company,
    whatsapp: row.whatsapp,
    email: row.email,
    billValue: row.bill_value ?? undefined,
    sector: row.sector ?? undefined,
    estimatedMonthlySavings: row.estimated_monthly_savings ?? undefined,
    origin: row.origin ?? undefined,
    createdAt: row.created_at,
    status: normalizeStatus(row.status as unknown as string),
  };
}

function toDbLead(input: Lead): DbLead {
  return {
    id: input.id,
    name: input.name,
    company: input.company,
    whatsapp: input.whatsapp,
    email: input.email,
    bill_value: input.billValue ?? null,
    sector: input.sector ?? null,
    estimated_monthly_savings: input.estimatedMonthlySavings ?? null,
    origin: input.origin ?? null,
    created_at: input.createdAt,
    status: input.status,
  };
}

function readAll(): Lead[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeAll(leads: Lead[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
}

export function getLeads(): Lead[] {
  // Compat: leitura síncrona apenas do localStorage
  return readAll();
}

export async function getLeadsAsync(): Promise<Lead[]> {
  if (!useSupabase) return Promise.resolve(readAll());
  const { data, error } = await supabase
    .from<DbLead>(TABLE)
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("Erro ao buscar leads no Supabase:", error);
    return [];
  }
  return (data ?? []).map(toAppLead);
}

export async function addLead(input: Omit<Lead, "id" | "createdAt" | "status"> & Partial<Pick<Lead, "status">>): Promise<Lead> {
  const now = new Date().toISOString();
  const newLead: Lead = {
    id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
    createdAt: now,
    status: input.status ?? "Novo",
    ...input,
  };
  if (!useSupabase) {
    const leads = readAll();
    leads.unshift(newLead);
    writeAll(leads);
    return newLead;
  }
  // No Supabase, deixamos id/created_at serem gerados pelo banco
  const { data, error } = await supabase.from(TABLE).insert({
    name: newLead.name,
    company: newLead.company,
    whatsapp: newLead.whatsapp,
    email: newLead.email,
    bill_value: newLead.billValue ?? null,
    sector: newLead.sector ?? null,
    estimated_monthly_savings: newLead.estimatedMonthlySavings ?? null,
    origin: newLead.origin ?? null,
    status: newLead.status,
  }).select("*").single();
  if (error) {
    console.error("Erro ao inserir lead no Supabase:", error);
    // fallback: não perder o lead
    const leads = readAll();
    leads.unshift(newLead);
    writeAll(leads);
    return newLead;
  }
  return toAppLead(data as DbLead);
}

export async function updateLead(id: string, patch: Partial<Lead>): Promise<Lead | null> {
  if (!useSupabase) {
    const leads = readAll();
    const idx = leads.findIndex(l => l.id === id);
    if (idx === -1) return null;
    leads[idx] = { ...leads[idx], ...patch };
    writeAll(leads);
    return leads[idx];
  }
  // Atualiza apenas campos permitidos
  const dbPatch: Partial<DbLead> = {
    bill_value: patch.billValue ?? undefined,
    sector: patch.sector ?? undefined,
    estimated_monthly_savings: patch.estimatedMonthlySavings ?? undefined,
    origin: patch.origin ?? undefined,
    status: patch.status ?? undefined,
  };
  const { data, error } = await supabase.from<DbLead>(TABLE).update(dbPatch).eq("id", id).select("*").single();
  if (error) {
    console.error("Erro ao atualizar lead no Supabase:", error);
    return null;
  }
  return toAppLead(data as DbLead);
}

export async function deleteLead(id: string): Promise<boolean> {
  if (!useSupabase) {
    const leads = readAll();
    const filtered = leads.filter(l => l.id !== id);
    writeAll(filtered);
    return filtered.length !== leads.length;
  }
  const { error } = await supabase.from(TABLE).delete().eq("id", id);
  if (error) {
    console.error("Erro ao remover lead no Supabase:", error);
    return false;
  }
  return true;
}

export function exportCSV(leads: Lead[]): string {
  // Gera CSV simples; Excel abre normalmente
  const headers = [
    "id","name","company","whatsapp","email","billValue","sector","estimatedMonthlySavings","origin","createdAt","status"
  ];
  const escape = (val: unknown) => {
    const s = val === undefined || val === null ? "" : String(val);
    // Encapsula em aspas e escapa aspas internas
    return `"${s.replace(/"/g, '""')}"`;
  };
  const lines = [headers.join(",")];
  for (const l of leads) {
    lines.push([
      l.id,
      l.name,
      l.company,
      l.whatsapp,
      l.email,
      l.billValue ?? "",
      l.sector ?? "",
      l.estimatedMonthlySavings ?? "",
      l.origin ?? "",
      l.createdAt,
      l.status,
    ].map(escape).join(","));
  }
  return lines.join("\n");
}

export function downloadCSV(filename: string, csv: string): void {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}