import type { Lead } from "./leads";

// Notificações opcionais após cadastro de lead
// Se VITE_LEADS_WEBHOOK_URL estiver definido, envia um POST com os dados do lead
// Nunca coloca segredos no código: tokens e URLs devem vir do .env

function getEnv(name: string): string | undefined {
  // import.meta.env retorna string | boolean | undefined; normalizamos para string
  const v = (import.meta as any).env?.[name];
  return v ? String(v) : undefined;
}

export async function notifyLeadSubmission(lead: Lead): Promise<void> {
  const url = getEnv("VITE_LEADS_WEBHOOK_URL");
  if (!url) return; // webhook não configurado

  const token = getEnv("VITE_LEADS_WEBHOOK_TOKEN");
  const payload = {
    type: "lead_submit",
    project: "inteligis-energia-lp",
    timestamp: new Date().toISOString(),
    lead,
  };

  try {
    // Tenta usar sendBeacon para não bloquear a UI; fallback para fetch
    const data = JSON.stringify(payload);
    const canBeacon = typeof navigator !== "undefined" && (navigator as any).sendBeacon;
    if (canBeacon) {
      const blob = new Blob([data], { type: "application/json" });
      (navigator as any).sendBeacon(url, blob);
      return;
    }
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: data,
      keepalive: true,
    });
  } catch (err) {
    // Evita ruído: loga de forma branda
    console.warn("Falha ao enviar webhook de lead:", err);
  }
}