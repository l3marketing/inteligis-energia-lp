export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).send("Method Not Allowed");
    return;
  }
  const cid = (req.headers["x-correlation-id"] as string) || `${Date.now()}-${Math.random()}`;
  const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
  const uiUrl = body?.webhook_url ? String(body.webhook_url) : "";
  const envUrl = process.env.LEADS_WEBHOOK_URL || "";
  const url = uiUrl || envUrl;
  const token = envUrl && !uiUrl ? (process.env.LEADS_WEBHOOK_TOKEN || "") : "";
  const payload = { ...body, correlation_id: cid };
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
    } catch {}
    res.status(200).json({ ok: r.ok, status: r.status, body: text });
  } catch {
    res.status(200).json({ ok: false });
  }
}