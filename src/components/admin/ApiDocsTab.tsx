import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const ApiDocsTab = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Endpoint de Webhooks</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div>
            <div className="font-semibold">URL</div>
            <div className="font-mono bg-muted p-2 rounded">POST /api/leads-webhook</div>
          </div>
          <div>
            <div className="font-semibold">Request body</div>
            <pre className="bg-muted p-3 rounded overflow-auto">{JSON.stringify({
              type: "lead_submit",
              project: "inteligis-energia-lp",
              timestamp: "2025-01-01T12:00:00.000Z",
              lead: { id: "uuid", name: "Nome", company: "Empresa", whatsapp: "(19) 99999-9999", email: "email@exemplo.com" },
              tracking: { utm_source: "google", page_url: "https://..." },
              webhook_url: "https://hooks.zapier.com/hooks/catch/xxx/yyy"
            }, null, 2)}</pre>
          </div>
          <div>
            <div className="font-semibold">Response</div>
            <pre className="bg-muted p-3 rounded overflow-auto">{JSON.stringify({ ok: true, status: 200, body: "texto opcional" }, null, 2)}</pre>
          </div>
          <div>
            <div className="font-semibold">Destino</div>
            <ul className="list-disc ml-6">
              <li>Se <span className="font-mono">webhook_url</span> estiver presente, será usado como destino.</li>
              <li>Senão, usa a URL salva via Admin (Supabase). Se não houver no Admin, usa <span className="font-mono">LEADS_WEBHOOK_URL</span> das envs.</li>
              <li>Token: quando houver token salvo via Admin (Supabase) ou env <span className="font-mono">LEADS_WEBHOOK_TOKEN</span>, será adicionado como <span className="font-mono">Authorization: Bearer ...</span>.</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApiDocsTab;