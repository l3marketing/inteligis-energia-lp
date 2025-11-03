// Lead store (MVP) com persistência em localStorage
// Mantém interface e funções para facilitar troca futura para API (Supabase/REST)

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
  return readAll();
}

export function addLead(input: Omit<Lead, "id" | "createdAt" | "status"> & Partial<Pick<Lead, "status">>): Lead {
  const leads = readAll();
  const now = new Date().toISOString();
  const newLead: Lead = {
    id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
    createdAt: now,
    status: input.status ?? "Novo",
    ...input,
  };
  leads.unshift(newLead); // adiciona no topo
  writeAll(leads);
  return newLead;
}

export function updateLead(id: string, patch: Partial<Lead>): Lead | null {
  const leads = readAll();
  const idx = leads.findIndex(l => l.id === id);
  if (idx === -1) return null;
  leads[idx] = { ...leads[idx], ...patch };
  writeAll(leads);
  return leads[idx];
}

export function deleteLead(id: string): boolean {
  const leads = readAll();
  const filtered = leads.filter(l => l.id !== id);
  writeAll(filtered);
  return filtered.length !== leads.length;
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