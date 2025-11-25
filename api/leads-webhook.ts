import { createClient } from "@supabase/supabase-js";

type RequestLike = {
  method?: string;
  headers: Record<string, unknown>;
  body?: unknown;
  socket?: { remoteAddress?: string };
};

type ResponseLike = {
  status: (code: number) => { send: (body: string) => void; json: (obj: unknown) => void };
};

export default async function handler(req: RequestLike, res: ResponseLike) {
  if (req.method !== "POST") {
    res.status(405).send("Method Not Allowed");
    return;
  }
  const cid = (req.headers["x-correlation-id"] as string) || `${Date.now()}-${Math.random()}`;
  const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
  const uiUrl = body?.webhook_url ? String(body.webhook_url) : "";
  const envUrl = process.env.LEADS_WEBHOOK_URL || "";
  let url = uiUrl || envUrl;
  let token = envUrl && !uiUrl ? (process.env.LEADS_WEBHOOK_TOKEN || "") : "";

  const forwardedFor = (req.headers["x-forwarded-for"] as string) || "";
  const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : (req.headers["x-real-ip"] as string) || (req.socket?.remoteAddress || "");
  const ipCity = (req.headers["x-vercel-ip-city"] as string) || "";
  const ipCountry = (req.headers["x-vercel-ip-country"] as string) || "";
  const ipRegion = (req.headers["x-vercel-ip-country-region"] as string) || "";

  if (!url) {
    try {
      const supaUrl = process.env.SUPABASE_URL || "";
      const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
      if (supaUrl && serviceKey) {
        const serverSupabase = createClient(supaUrl, serviceKey);
        const { data } = await serverSupabase
          .from("integrations")
          .select("webhook_url, webhook_token")
          .limit(1)
          .maybeSingle();
        if (data) {
          url = data.webhook_url || "";
          token = data.webhook_token || "";
        }
      }
    } catch { void 0; }
  }

  const payload = { ...body, correlation_id: cid, client_ip: clientIp, ip_city: ipCity, ip_country: ipCountry, ip_region: ipRegion };
  if (!url) {
    res.status(200).json({ ok: true });
    return;
  }
  try {
    const r = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(payload),
    });
    let text: string | undefined;
    try {
      text = await r.text();
    } catch { void 0; }
    res.status(200).json({ ok: r.ok, status: r.status, body: text });
  } catch {
    res.status(200).json({ ok: false });
  }
}