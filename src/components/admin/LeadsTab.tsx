import { useEffect, useMemo, useState } from "react";
import { getLeadsAsync, exportCSV, downloadCSV, updateLead, Lead, LeadStatus } from "@/lib/leads";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { toast } from "sonner";
import { Search, Download, CheckSquare, Square, LineChart, Activity, PlugZap } from "lucide-react";

function generateLeadsSVG(leads: Lead[]): string {
  const width = 1200;
  const rowHeight = 24;
  const padding = 16;
  const height = padding * 2 + rowHeight * (leads.length + 1);
  const headers = ["Nome", "E-mail", "Telefone", "Data", "Origem", "Status"]; 
  // SVG simples tipo tabela
  let y = padding + 18;
  const lines: string[] = [];
  lines.push(`<text x="${padding}" y="${y}" font-size="14" font-weight="bold">${headers.join("  |  ")}</text>`);
  y += rowHeight;
  for (const l of leads) {
    const phone = l.whatsapp ?? "";
    const date = new Date(l.createdAt).toLocaleDateString("pt-BR");
    const origin = l.origin ?? "";
    const row = [l.name, l.email, phone, date, origin, l.status].join("  |  ");
    lines.push(`<text x="${padding}" y="${y}" font-size="13">${row.replace(/&/g, "&amp;")}</text>`);
    y += rowHeight;
  }
  return `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">\n  <rect x="0" y="0" width="${width}" height="${height}" fill="#ffffff"/>\n  ${lines.join("\n  ")}\n</svg>`;
}

const LeadsTab = () => {
  const [query, setQuery] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const init = async () => {
      const list = await getLeadsAsync();
      setLeads(list);
    };
    init();
  }, []);

  // Atualização em tempo real: escuta mudanças no localStorage e evento custom
  useEffect(() => {
    const refresh = async () => {
      const list = await getLeadsAsync();
      setLeads(list);
    };
    const onStorage = (e: StorageEvent) => {
      if (!e || e.key === null || e.key === "inteligis:leads") {
        refresh();
      }
    };
    const onCustom = () => refresh();
    window.addEventListener("storage", onStorage);
    window.addEventListener("inteligis:leads_updated", onCustom as EventListener);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("inteligis:leads_updated", onCustom as EventListener);
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return leads;
    return leads.filter(l => [l.name, l.email, l.whatsapp, l.origin, l.status].filter(Boolean).some(v => String(v).toLowerCase().includes(q)));
  }, [leads, query]);

  const totalLeads = filtered.length;
  const newToday = filtered.filter(l => new Date(l.createdAt).toDateString() === new Date().toDateString()).length;
  const conversionRate = totalLeads === 0 ? 0 : Math.round((filtered.filter(l => l.status === "Qualificado").length / totalLeads) * 100);

  const allSelected = totalLeads > 0 && filtered.every(l => selected[l.id]);
  const toggleAll = (checked: boolean) => {
    const next: Record<string, boolean> = { ...selected };
    for (const l of filtered) next[l.id] = checked;
    setSelected(next);
  };

  const handleExportCSV = () => {
    const toExport = filtered.filter(l => selected[l.id]) ;
    const list = toExport.length > 0 ? toExport : filtered;
    const csv = exportCSV(list);
    downloadCSV(`leads-${new Date().toISOString().slice(0,10)}.csv`, csv);
    toast.success("Exportação concluída (CSV)");
  };

  const handleExportSVG = () => {
    const toExport = filtered.filter(l => selected[l.id]);
    const list = toExport.length > 0 ? toExport : filtered;
    const svg = generateLeadsSVG(list);
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${new Date().toISOString().slice(0,10)}.svg`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast.success("Exportação concluída (SVG)");
  };

  const qualificationOptions: { label: string; value: LeadStatus }[] = [
    { label: "Qualificado", value: "Qualificado" },
    { label: "Não qualificado", value: "Perdido" },
    { label: "Sem contato", value: "Contato" },
  ];

  const handleQualificationChange = async (id: string, value: LeadStatus) => {
    const updated = await updateLead(id, { status: value });
    if (updated) {
      setLeads(prev => prev.map(l => (l.id === id ? updated : l)));
      toast.success("Status atualizado");
    } else {
      toast.error("Falha ao atualizar status");
    }
  };

  return (
    <div className="space-y-6">
      {/* Estatísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Total de leads</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <LineChart className="h-5 w-5 text-secondary" />
            <span className="text-2xl font-semibold">{totalLeads}</span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Novos hoje</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-secondary" />
            <span className="text-2xl font-semibold">{newToday}</span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Taxa de conversão</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <PlugZap className="h-5 w-5 text-secondary" />
            <span className="text-2xl font-semibold">{conversionRate}%</span>
          </CardContent>
        </Card>
      </div>

      {/* Toolbar de busca e exportação */}
      <Card>
        <CardContent className="py-4 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, e-mail, telefone ou origem"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full md:w-96"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleExportCSV} className="flex items-center gap-2"><Download className="h-4 w-4" /> Exportar (Excel .csv)</Button>
            <Button variant="outline" onClick={handleExportSVG} className="flex items-center gap-2"><Download className="h-4 w-4" /> Exportar (SVG)</Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de leads */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <button
                    className="inline-flex items-center justify-center w-6 h-6"
                    aria-label={allSelected ? "Desmarcar todos" : "Selecionar todos"}
                    onClick={() => toggleAll(!allSelected)}
                  >
                    {allSelected ? <CheckSquare className="h-4 w-4" /> : <Square className="h-4 w-4" />}
                  </button>
                </TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>E-mail</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Data de Cadastro</TableHead>
                <TableHead>Origem da Captura</TableHead>
                <TableHead>Qualificação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground py-6">Nenhum lead encontrado</TableCell>
                </TableRow>
              ) : (
                filtered.map(l => {
                  const isSelected = !!selected[l.id];
                  return (
                    <TableRow key={l.id} className="hover:bg-muted/50">
                      <TableCell>
                        <button
                          className="inline-flex items-center justify-center w-6 h-6"
                          aria-label={isSelected ? "Desmarcar" : "Selecionar"}
                          onClick={() => setSelected(prev => ({ ...prev, [l.id]: !isSelected }))}
                        >
                          {isSelected ? <CheckSquare className="h-4 w-4" /> : <Square className="h-4 w-4" />}
                        </button>
                      </TableCell>
                      <TableCell className="font-medium">{l.name}</TableCell>
                      <TableCell>{l.email}</TableCell>
                      <TableCell>{l.whatsapp}</TableCell>
                      <TableCell>{new Date(l.createdAt).toLocaleString("pt-BR")}</TableCell>
                      <TableCell>{l.origin ?? "—"}</TableCell>
                      <TableCell>
                        <Select
                          value={l.status}
                          onValueChange={(val) => handleQualificationChange(l.id, val as LeadStatus)}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {qualificationOptions.map(opt => (
                              <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeadsTab;