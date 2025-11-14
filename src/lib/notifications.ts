import type { Lead } from "./leads";
import { collectTrackingSync } from "./tracking";

// Notificações opcionais após cadastro de lead
// Se VITE_LEADS_WEBHOOK_URL estiver definido, envia um POST com os dados do lead
// Nunca coloca segredos no código: tokens e URLs devem vir do .env

function getEnv(name: string): string | undefined {
  // import.meta.env retorna string | boolean | undefined; normalizamos para string
  const v = (import.meta as any).env?.[name];
  return v ? String(v) : undefined;
}

const LAST_WEBHOOK_PAYLOAD_KEY = "inteligis:last_webhook_payload";
const LAST_WEBHOOK_RESULT_KEY = "inteligis:last_webhook_result";

function saveLastWebhook(payload: unknown, result: unknown): void {
  try {
    localStorage.setItem(LAST_WEBHOOK_PAYLOAD_KEY, JSON.stringify(payload));
    localStorage.setItem(LAST_WEBHOOK_RESULT_KEY, JSON.stringify(result));
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("inteligis:webhook_updated"));
    }
  } catch {}
}

export function getLastWebhook(): { payload?: unknown; result?: unknown } {
  try {
    const p = localStorage.getItem(LAST_WEBHOOK_PAYLOAD_KEY);
    const r = localStorage.getItem(LAST_WEBHOOK_RESULT_KEY);
    return { payload: p ? JSON.parse(p) : undefined, result: r ? JSON.parse(r) : undefined };
  } catch {
    return { payload: undefined, result: undefined };
  }
}

export async function notifyLeadSubmission(lead: Lead): Promise<void> {
  const url = getEnv("VITE_LEADS_WEBHOOK_URL");
  if (!url) return; // webhook não configurado

  const token = getEnv("VITE_LEADS_WEBHOOK_TOKEN");
  const tracking = collectTrackingSync();
  const payload = {
    type: "lead_submit",
    project: "inteligis-energia-lp",
    timestamp: new Date().toISOString(),
    lead,
    tracking,
  };

  try {
    // Tenta usar sendBeacon para não bloquear a UI; fallback para fetch
    const data = JSON.stringify(payload);
    const canBeacon = typeof navigator !== "undefined" && (navigator as any).sendBeacon;
    if (canBeacon) {
      const blob = new Blob([data], { type: "application/json" });
      (navigator as any).sendBeacon(url, blob);
      saveLastWebhook(payload, { method: "beacon" });
      return;
    }
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: data,
      keepalive: true,
    });
    let body: string | undefined;
    try {
      body = await res.text();
    } catch {}
    saveLastWebhook(payload, { method: "fetch", status: res.status, ok: res.ok, body });
  } catch (err) {
    // Evita ruído: loga de forma branda
    console.warn("Falha ao enviar webhook de lead:", err);
  }
}

export async function testWebhook(): Promise<{ ok: boolean; status?: number; body?: string }> {
  const url = getEnv("VITE_LEADS_WEBHOOK_URL");
  if (!url) return { ok: false };
  const token = getEnv("VITE_LEADS_WEBHOOK_TOKEN");
  const tracking = collectTrackingSync();
  const lead: Lead = {
    id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
    name: "Teste",
    company: "Teste S/A",
    whatsapp: "(19) 99999-9999",
    email: "teste@example.com",
    createdAt: new Date().toISOString(),
    status: "Novo",
  } as Lead;
  const payload = {
    type: "lead_submit_test",
    project: "inteligis-energia-lp",
    timestamp: new Date().toISOString(),
    lead,
    tracking,
  };
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(payload),
  });
  let body: string | undefined;
  try {
    body = await res.text();
  } catch {}
  saveLastWebhook(payload, { method: "fetch", status: res.status, ok: res.ok, body });
  return { ok: res.ok, status: res.status, body };
}
