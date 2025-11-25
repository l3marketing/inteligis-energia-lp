import { supabase, useSupabase } from "./supabase";

export type IntegrationState = {
  metaPixelId: string;
  gtmCode: string;
  ga4Id: string;
  tiktokPixel: string;
  webhookUrl: string;
  webhookToken?: string;
  statuses: Record<string, boolean>;
};

const STORAGE_KEY = "inteligis:integrations";

export async function loadIntegrations(): Promise<IntegrationState> {
  if (useSupabase) {
    try {
      const { data, error } = await supabase
        .from("integrations")
        .select("id, meta_pixel_id, gtm_code, ga4_id, tiktok_pixel, webhook_url, webhook_token, statuses")
        .limit(1)
        .maybeSingle();
      if (!error && data) {
        return {
          metaPixelId: data.meta_pixel_id ?? "",
          gtmCode: data.gtm_code ?? "",
          ga4Id: data.ga4_id ?? "",
          tiktokPixel: data.tiktok_pixel ?? "",
          webhookUrl: data.webhook_url ?? "",
          webhookToken: data.webhook_token ?? "",
          statuses: data.statuses ?? {},
        } as IntegrationState;
      }
    } catch { void 0; }
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { metaPixelId: "", gtmCode: "", ga4Id: "", tiktokPixel: "", webhookUrl: "", webhookToken: "", statuses: {} };
    const parsed = JSON.parse(raw);
    return {
      metaPixelId: parsed.metaPixelId ?? "",
      gtmCode: parsed.gtmCode ?? "",
      ga4Id: parsed.ga4Id ?? "",
      tiktokPixel: parsed.tiktokPixel ?? "",
      webhookUrl: parsed.webhookUrl ?? "",
      webhookToken: parsed.webhookToken ?? "",
      statuses: parsed.statuses ?? {},
    } as IntegrationState;
  } catch {
    return { metaPixelId: "", gtmCode: "", ga4Id: "", tiktokPixel: "", webhookUrl: "", webhookToken: "", statuses: {} };
  }
}

export async function saveIntegrations(state: IntegrationState): Promise<void> {
  if (useSupabase) {
    try {
      const payload = {
        meta_pixel_id: state.metaPixelId || null,
        gtm_code: state.gtmCode || null,
        ga4_id: state.ga4Id || null,
        tiktok_pixel: state.tiktokPixel || null,
        webhook_url: state.webhookUrl || null,
        webhook_token: state.webhookToken || null,
        statuses: state.statuses || {},
      };
      const { error } = await supabase.from("integrations").upsert(payload, { onConflict: "id" });
      if (!error) return;
    } catch { void 0; }
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function subscribeIntegrations(listener: () => void): () => void {
  const handler = () => listener();
  window.addEventListener("inteligis:integrations_updated", handler as EventListener);
  return () => window.removeEventListener("inteligis:integrations_updated", handler as EventListener);
}

export function broadcastIntegrationsUpdate(): void {
  try {
    window.dispatchEvent(new Event("inteligis:integrations_updated"));
  } catch { void 0; }
}