import type { Lead } from "./leads";
import { collectTrackingSync } from "./tracking";

// Notificações opcionais após cadastro de lead
// Se VITE_LEADS_WEBHOOK_URL estiver definido, envia um POST com os dados do lead
// Nunca coloca segredos no código: tokens e URLs devem vir do .env

function getEnv(name: string): string | undefined {
  const v = (import.meta as unknown as { env?: Record<string, unknown> }).env?.[name];
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
  } catch { void 0; }
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
  const url = "/api/leads-webhook";
  const tracking = collectTrackingSync();
  let webhookUrl = "";
  try {
    const raw = localStorage.getItem("inteligis:integrations");
    if (raw) webhookUrl = String(JSON.parse(raw)?.webhookUrl || "");
  } catch { void 0; }
  const payload = {
    type: "lead_submit",
    project: "inteligis-energia-lp",
    timestamp: new Date().toISOString(),
    lead,
    tracking,
    webhook_url: webhookUrl || undefined,
  };

  try {
    // Tenta usar sendBeacon para não bloquear a UI; fallback para fetch
    const data = JSON.stringify(payload);
    const canBeacon = typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function";
    if (canBeacon) {
      const blob = new Blob([data], { type: "application/json" });
      navigator.sendBeacon(url, blob);
      saveLastWebhook(payload, { method: "beacon" });
      return;
    }
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: data,
      keepalive: true,
    });
    let body: string | undefined;
    try {
      body = await res.text();
    } catch { void 0; }
    saveLastWebhook(payload, { method: "fetch", status: res.status, ok: res.ok, body });
  } catch (err) {
    console.warn("Falha ao enviar webhook de lead:", err);
  }
}

export async function testWebhook(urlOverride?: string): Promise<{ ok: boolean; status?: number; body?: string }> {
  const url = "/api/leads-webhook";
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
    webhook_url: urlOverride || undefined,
  };
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  let body: string | undefined;
  try {
    body = await res.text();
  } catch { void 0; }
  saveLastWebhook(payload, { method: "fetch", status: res.status, ok: res.ok, body });
  return { ok: res.ok, status: res.status, body };
}
