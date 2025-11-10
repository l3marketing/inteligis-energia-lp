import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Lead } from "@/lib/leads";
import { getLeadMeta, fetchLeadMetaSupabase } from "@/lib/leadMeta";
import { useSupabase } from "@/lib/supabase";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lead: Lead | null;
}

export default function LeadDetailsSheet({ open, onOpenChange, lead }: Props) {
  const [metaJson, setMetaJson] = useState<any | null>(null);

  useEffect(() => {
    if (!lead) {
      setMetaJson(null);
      return;
    }
    let cancelled = false;
    const local = getLeadMeta(lead.id);
    setMetaJson(local);
    const fetchRemote = async () => {
      if (!useSupabase) return;
      const remote = await fetchLeadMetaSupabase(lead.id);
      if (!cancelled && remote) setMetaJson(remote);
    };
    fetchRemote();
    return () => { cancelled = true; };
  }, [lead]);

  const label = (v: unknown) => {
    if (v === undefined || v === null || v === "") return "—";
    if (typeof v === "number") return v.toLocaleString("pt-BR");
    return String(v);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="sm:max-w-xl w-[90vw] max-w-[720px]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <span>{lead?.name ?? "Lead"}</span>
            {lead?.status ? <Badge variant="secondary">{lead.status}</Badge> : null}
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[85vh] pr-4">
          {/* Infos básicas */}
          <div className="space-y-1 text-sm">
            <div className="text-xs text-muted-foreground">Criado em</div>
            <div>{lead ? new Date(lead.createdAt).toLocaleString("pt-BR") : "—"}</div>
            <div className="text-xs text-muted-foreground mt-2">Origem</div>
            <div>{label(lead?.origin)}</div>
          </div>

          <Separator className="my-4" />

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <div className="text-xs text-muted-foreground">E-mail</div>
              <div>{label(lead?.email)}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">WhatsApp</div>
              <div>{label(lead?.whatsapp)}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Empresa</div>
              <div>{label(lead?.company)}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Setor</div>
              <div>{label(lead?.sector)}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Conta (R$)</div>
              <div>{label(lead?.billValue)}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Economia estimada (R$/mês)</div>
              <div>{label(lead?.estimatedMonthlySavings)}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Conversão</div>
              <div>{label(lead?.conversionStatus)}</div>
              {lead?.saleValue ? (
                <div className="text-xs text-muted-foreground">Valor: {Number(lead.saleValue).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</div>
              ) : null}
              {lead?.conversionReason ? (
                <div className="text-xs text-muted-foreground">Motivo: {lead.conversionReason}</div>
              ) : null}
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Qualificação</div>
              <div>{label(lead?.status)}</div>
              {lead?.qualificationReason ? (
                <div className="text-xs text-muted-foreground">Motivo: {lead.qualificationReason}</div>
              ) : null}
            </div>
          </div>

          {/* Formulário enviado */}
          <div className="mt-6">
            <div className="font-semibold mb-2">Dados enviados no formulário</div>
            {metaJson?.formValues ? (
              <div className="grid grid-cols-2 gap-2 text-sm">
                {Object.entries(metaJson.formValues).map(([k, v]) => (
                  <div key={k}>
                    <div className="text-xs text-muted-foreground">{k}</div>
                    <div className="break-words">{label(v)}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">Sem dados adicionais do formulário.</div>
            )}
          </div>

          {/* Tracking: UTMs, cookies, client ids, sessão, páginas, geo */}
          <div className="mt-6">
            <div className="font-semibold mb-2">Rastreamento (UTMs, cookies, sessão)</div>
            {metaJson?.tracking ? (
              <div className="grid grid-cols-2 gap-2 text-sm">
                {Object.entries(metaJson.tracking).map(([k, v]) => (
                  <div key={k}>
                    <div className="text-xs text-muted-foreground">{k}</div>
                    <div className="break-words">{label(v)}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">Sem dados de tracking coletados.</div>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}