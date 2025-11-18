import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Webhook } from "lucide-react";
import { testWebhook, getLastWebhook } from "@/lib/notifications";
import { loadIntegrations as loadIntegrationsAsync, saveIntegrations as saveIntegrationsAsync, type IntegrationState } from "@/lib/integrations";

async function loadIntegrations(): Promise<IntegrationState> {
  return await loadIntegrationsAsync();
}

async function saveIntegrations(state: IntegrationState) {
  await saveIntegrationsAsync(state);
}

const IntegrationsTab = () => {
  const [integrations, setIntegrations] = useState<IntegrationState>({ metaPixelId: "", gtmCode: "", ga4Id: "", tiktokPixel: "", webhookUrl: "", webhookToken: "", statuses: {} });
  const [lastWebhookPayload, setLastWebhookPayload] = useState<string>("");
  const [lastWebhookResult, setLastWebhookResult] = useState<string>("");

  useEffect(() => {
    // Garantir estado sincronizado (ex.: outra aba)
    (async () => {
      const loaded = await loadIntegrations();
      setIntegrations(loaded);
    })();
    const load = () => {
      const { payload, result } = getLastWebhook();
      setLastWebhookPayload(payload ? JSON.stringify(payload, null, 2) : "");
      setLastWebhookResult(result ? JSON.stringify(result, null, 2) : "");
    };
    load();
    const onUpdate = () => load();
    window.addEventListener("inteligis:webhook_updated", onUpdate as EventListener);
    return () => window.removeEventListener("inteligis:webhook_updated", onUpdate as EventListener);
  }, []);

  const setStatus = async (key: string, value: boolean) => {
    const next = { ...integrations, statuses: { ...integrations.statuses, [key]: value } };
    setIntegrations(next);
    await saveIntegrations(next);
  };

  const saveField = async (patch: Partial<IntegrationState>) => {
    const next = { ...integrations, ...patch };
    setIntegrations(next);
    await saveIntegrations(next);
    toast.success("Configurações salvas");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Meta Ads Pixel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Badge variant="secondary">Ativo/Inativo</Badge> Pixel do Meta Ads</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Status</span>
              <Switch checked={!!integrations.statuses.metaPixel} onCheckedChange={(v) => setStatus("metaPixel", v)} />
            </div>
            <Input placeholder="Insira o ID do Pixel" value={integrations.metaPixelId} onChange={(e) => setIntegrations(prev => ({ ...prev, metaPixelId: e.target.value }))} />
            <div className="flex gap-2">
              <Button onClick={() => saveField({ metaPixelId: integrations.metaPixelId })}>Conectar</Button>
              <Button variant="outline" onClick={() => toast.info(`Status: ${integrations.statuses.metaPixel ? "Ativo" : "Inativo"}`)}>Ver status</Button>
            </div>
          </CardContent>
        </Card>

        {/* Google Tag Manager */}
        <Card>
          <CardHeader>
            <CardTitle>Google Tag Manager</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Status</span>
              <Switch checked={!!integrations.statuses.gtm} onCheckedChange={(v) => setStatus("gtm", v)} />
            </div>
            <Input placeholder="GTM-XXXX" value={integrations.gtmCode} onChange={(e) => setIntegrations(prev => ({ ...prev, gtmCode: e.target.value }))} />
            <Button onClick={() => saveField({ gtmCode: integrations.gtmCode })}>Salvar</Button>
          </CardContent>
        </Card>

        {/* Google Analytics */}
        <Card>
          <CardHeader>
            <CardTitle>Google Analytics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Status</span>
              <Switch checked={!!integrations.statuses.ga} onCheckedChange={(v) => setStatus("ga", v)} />
            </div>
            <Input placeholder="G-XXXXXXXX" value={integrations.ga4Id} onChange={(e) => setIntegrations(prev => ({ ...prev, ga4Id: e.target.value }))} />
            <Button onClick={() => saveField({ ga4Id: integrations.ga4Id })}>Salvar</Button>
          </CardContent>
        </Card>

        {/* TikTok Ads */}
        <Card>
          <CardHeader>
            <CardTitle>TikTok Ads</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Status</span>
              <Switch checked={!!integrations.statuses.tiktok} onCheckedChange={(v) => setStatus("tiktok", v)} />
            </div>
            <Input placeholder="Pixel ID" value={integrations.tiktokPixel} onChange={(e) => setIntegrations(prev => ({ ...prev, tiktokPixel: e.target.value }))} />
            <Button onClick={() => saveField({ tiktokPixel: integrations.tiktokPixel })}>Salvar</Button>
          </CardContent>
        </Card>

        {/* Webhooks */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Webhook className="h-4 w-4" /> Webhooks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Status</span>
              <Switch checked={!!integrations.statuses.webhook} onCheckedChange={(v) => setStatus("webhook", v)} />
            </div>
            <Input placeholder="https://api.seusistema.com/webhook" value={integrations.webhookUrl} onChange={(e) => setIntegrations(prev => ({ ...prev, webhookUrl: e.target.value }))} />
            <div className="flex gap-2">
              <Button onClick={() => saveField({ webhookUrl: integrations.webhookUrl })}>Salvar</Button>
              <Button variant="outline" onClick={async () => {
                const res = await testWebhook(integrations.webhookUrl || undefined);
                if (res.ok) {
                  toast.success(`Webhook OK (${res.status ?? ""})`);
                } else {
                  toast.error(`Falha ao enviar webhook (${res.status ?? ""})`);
                }
                const { payload, result } = getLastWebhook();
                setLastWebhookPayload(payload ? JSON.stringify(payload, null, 2) : "");
                setLastWebhookResult(result ? JSON.stringify(result, null, 2) : "");
              }}>Testar envio</Button>
            </div>
            <Input placeholder="Bearer token (opcional)" value={integrations.webhookToken || ""} onChange={(e) => setIntegrations(prev => ({ ...prev, webhookToken: e.target.value }))} />
            <div className="flex gap-2">
              <Button onClick={() => saveField({ webhookToken: integrations.webhookToken })}>Salvar token</Button>
            </div>
            {(lastWebhookPayload || lastWebhookResult) && (
              <div className="mt-4 space-y-3">
                <div>
                  <div className="text-sm text-muted-foreground mb-2">Último payload</div>
                  <pre className="bg-muted p-3 rounded-md overflow-auto max-h-64 text-xs">{lastWebhookPayload}</pre>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-2">Último resultado</div>
                  <pre className="bg-muted p-3 rounded-md overflow-auto max-h-64 text-xs">{lastWebhookResult}</pre>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <Separator />
      <p className="text-sm text-muted-foreground">As integrações acima são persistidas via Admin. Quando Supabase está ativo, são salvas no banco; caso contrário, ficam no dispositivo atual.</p>
    </div>
  );
};

export default IntegrationsTab;
