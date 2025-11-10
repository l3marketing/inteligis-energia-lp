import { useEffect, useMemo, useState } from "react";
import { getLeadsAsync, exportCSV, downloadCSV, updateLead, Lead, LeadStatus } from "@/lib/leads";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Search, Download, CheckSquare, Square, LineChart, Activity, PlugZap, Info, ArrowUp, ArrowDown, ArrowUpDown, Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import type { DateRange } from "react-day-picker";
import { ptBR } from "date-fns/locale";
import { useIsMobile } from "@/hooks/use-mobile";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import LeadDetailsSheet from "@/components/admin/LeadDetailsSheet";

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
  // Ordenação
  const [sortBy, setSortBy] = useState<"name" | "email" | "whatsapp" | "createdAt" | "origin" | "status" | "conversionStatus">("createdAt");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [secondarySortBy, setSecondarySortBy] = useState<"name" | "email" | "whatsapp" | "createdAt" | "origin" | "status" | "conversionStatus" | null>(null);
  const [secondarySortDir, setSecondarySortDir] = useState<"asc" | "desc">("asc");
  // Filtro por datas
  const [datePreset, setDatePreset] = useState<"last7" | "thisMonth" | "lastMonth" | "custom">("thisMonth");
  const [customRange, setCustomRange] = useState<DateRange | undefined>();
  const [calendarOpen, setCalendarOpen] = useState(false);
  const isMobile = useIsMobile();
  // Dialogos
  const [openQualifyDialog, setOpenQualifyDialog] = useState(false);
  const [qualifyLead, setQualifyLead] = useState<Lead | null>(null);
  const [qualifyReason, setQualifyReason] = useState("");

  const [openConversionDialog, setOpenConversionDialog] = useState(false);
  const [conversionLead, setConversionLead] = useState<Lead | null>(null);
  const [conversionType, setConversionType] = useState<"Venda realizada" | "Perdido" | "Retornar em breve" | null>(null);
  const [saleValueInput, setSaleValueInput] = useState<string>("");
  const [conversionReasonInput, setConversionReasonInput] = useState("");
  // Dialog de visualização de motivos/valores
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [viewTitle, setViewTitle] = useState("");
  const [viewText, setViewText] = useState("");

  // Painel lateral de detalhes
  const [openDetails, setOpenDetails] = useState(false);
  const [detailsLead, setDetailsLead] = useState<Lead | null>(null);

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

  // Cálculo de intervalo de datas conforme preset
  const dateRange = useMemo((): { from: Date; to: Date } | null => {
    const now = new Date();
    const startOfDay = (d: Date) => { const x = new Date(d); x.setHours(0,0,0,0); return x; };
    const endOfDay = (d: Date) => { const x = new Date(d); x.setHours(23,59,59,999); return x; };
    if (datePreset === "last7") {
      const from = new Date(now);
      from.setDate(from.getDate() - 6); // inclui hoje + 6 dias anteriores
      return { from: startOfDay(from), to: endOfDay(now) };
    }
    if (datePreset === "thisMonth") {
      const from = new Date(now.getFullYear(), now.getMonth(), 1);
      return { from: startOfDay(from), to: endOfDay(now) };
    }
    if (datePreset === "lastMonth") {
      const from = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const to = new Date(now.getFullYear(), now.getMonth(), 0); // último dia do mês passado
      return { from: startOfDay(from), to: endOfDay(to) };
    }
    if (datePreset === "custom") {
      if (customRange?.from && customRange?.to) {
        return { from: startOfDay(customRange.from), to: endOfDay(customRange.to) };
      }
      return null;
    }
    return null;
  }, [datePreset, customRange]);

  // Texto de período apurado
  const apuradoTexto = useMemo(() => {
    if (!dateRange) return "";
    const fmt = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "long" });
    const left = fmt.format(dateRange.from); // ex.: 07 de outubro
    const rightDayMonth = fmt.format(dateRange.to); // ex.: 06 de novembro
    const rightYear = dateRange.to.getFullYear();
    // Se anos diferentes, incluir ambos
    const leftYear = dateRange.from.getFullYear();
    if (leftYear !== rightYear) {
      return `${left} de ${leftYear} à ${rightDayMonth} de ${rightYear}`;
    }
    return `${left} à ${rightDayMonth} de ${rightYear}`;
  }, [dateRange]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let base = leads;
    if (dateRange) {
      const fromTs = dateRange.from.getTime();
      const toTs = dateRange.to.getTime();
      base = base.filter(l => {
        const t = new Date(l.createdAt).getTime();
        return t >= fromTs && t <= toTs;
      });
    }
    if (!q) return base;
    return base.filter(l => [l.name, l.email, l.whatsapp, l.origin, l.status, l.conversionStatus].filter(Boolean).some(v => String(v).toLowerCase().includes(q)));
  }, [leads, query, dateRange]);

  const displayed = useMemo(() => {
    const arr = [...filtered];
    const getVal = (l: Lead) => {
      switch (sortBy) {
        case "createdAt":
          return new Date(l.createdAt).getTime();
        case "name":
          return (l.name || "").toLowerCase();
        case "email":
          return (l.email || "").toLowerCase();
        case "whatsapp":
          return (l.whatsapp || "").toLowerCase();
        case "origin":
          return (l.origin || "").toLowerCase();
        case "status":
          return (l.status || "").toLowerCase();
        case "conversionStatus":
          return (l.conversionStatus || "").toLowerCase();
        default:
          return "";
      }
    };
    const getSecondaryVal = (l: Lead) => {
      switch (secondarySortBy) {
        case "createdAt":
          return new Date(l.createdAt).getTime();
        case "name":
          return (l.name || "").toLowerCase();
        case "email":
          return (l.email || "").toLowerCase();
        case "whatsapp":
          return (l.whatsapp || "").toLowerCase();
        case "origin":
          return (l.origin || "").toLowerCase();
        case "status":
          return (l.status || "").toLowerCase();
        case "conversionStatus":
          return (l.conversionStatus || "").toLowerCase();
        default:
          return "";
      }
    };
    arr.sort((a, b) => {
      const va = getVal(a);
      const vb = getVal(b);
      if (va === vb) return 0;
      const cmp = va > vb ? 1 : -1;
      const primary = sortDir === "asc" ? cmp : -cmp;
      if (primary !== 0) return primary;
      if (!secondarySortBy) return 0;
      const sva = getSecondaryVal(a);
      const svb = getSecondaryVal(b);
      if (sva === svb) return 0;
      const scmp = sva > svb ? 1 : -1;
      return secondarySortDir === "asc" ? scmp : -scmp;
    });
    return arr;
  }, [filtered, sortBy, sortDir, secondarySortBy, secondarySortDir]);

  const totalLeads = filtered.length;
  const newToday = filtered.filter(l => new Date(l.createdAt).toDateString() === new Date().toDateString()).length;
  const qualifiedCount = filtered.filter(l => l.status === "Qualificado").length;
  const qualificationRate = totalLeads === 0 ? 0 : Math.round((qualifiedCount / totalLeads) * 100);
  const saleMadeCount = filtered.filter(l => l.conversionStatus === "Venda realizada").length;
  const conversionRate = qualifiedCount === 0 ? 0 : Math.round((saleMadeCount / qualifiedCount) * 100);

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
    if (value === "Perdido") {
      const lead = leads.find(l => l.id === id) ?? null;
      setQualifyLead(lead);
      setQualifyReason("");
      setOpenQualifyDialog(true);
      return;
    }
    const updated = await updateLead(id, { status: value, qualificationReason: undefined });
    if (updated) {
      setLeads(prev => prev.map(l => (l.id === id ? updated : l)));
      toast.success("Status atualizado");
    } else {
      toast.error("Falha ao atualizar status");
    }
  };

  const saveQualificationReason = async () => {
    if (!qualifyLead) return;
    const updated = await updateLead(qualifyLead.id, { status: "Perdido", qualificationReason: qualifyReason.trim() || undefined });
    if (updated) {
      setLeads(prev => prev.map(l => (l.id === updated.id ? updated : l)));
      toast.success("Desqualificação registrada");
      setOpenQualifyDialog(false);
      setQualifyLead(null);
      setQualifyReason("");
    } else {
      toast.error("Falha ao salvar motivo");
    }
  };

  const handleConversionChange = async (id: string, value: "Venda realizada" | "Perdido" | "Retornar em breve") => {
    if (value === "Retornar em breve") {
      const updated = await updateLead(id, { conversionStatus: "Retornar em breve", saleValue: undefined, conversionReason: undefined });
      if (updated) {
        setLeads(prev => prev.map(l => (l.id === id ? updated : l)));
        toast.success("Conversão atualizada");
      } else {
        toast.error("Falha ao atualizar conversão");
      }
      return;
    }
    const lead = leads.find(l => l.id === id) ?? null;
    setConversionLead(lead);
    setConversionType(value);
    setSaleValueInput("");
    setConversionReasonInput("");
    setOpenConversionDialog(true);
  };

  const saveConversion = async () => {
    if (!conversionLead || !conversionType) return;
    if (conversionType === "Venda realizada") {
      const valueNum = saleValueInput ? Number(saleValueInput) : undefined;
      const updated = await updateLead(conversionLead.id, { conversionStatus: "Venda realizada", saleValue: valueNum, conversionReason: undefined });
      if (updated) {
        setLeads(prev => prev.map(l => (l.id === updated.id ? updated : l)));
        toast.success("Venda registrada");
        setOpenConversionDialog(false);
        setConversionLead(null);
        setConversionType(null);
      } else {
        toast.error("Falha ao salvar conversão");
      }
      return;
    }
    // Perdido
    const reason = conversionReasonInput.trim() || undefined;
    const updated = await updateLead(conversionLead.id, { conversionStatus: "Perdido", conversionReason: reason, saleValue: undefined });
    if (updated) {
      setLeads(prev => prev.map(l => (l.id === updated.id ? updated : l)));
      toast.success("Motivo de perda registrado");
      setOpenConversionDialog(false);
      setConversionLead(null);
      setConversionType(null);
    } else {
      toast.error("Falha ao salvar conversão");
    }
  };

  const onSortClick = (key: typeof sortBy, e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.shiftKey) {
      if (secondarySortBy === key) {
        setSecondarySortDir(prev => (prev === "asc" ? "desc" : "asc"));
      } else {
        setSecondarySortBy(key);
        setSecondarySortDir("asc");
      }
      return;
    }
    if (sortBy === key) {
      setSortDir(prev => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(key);
      setSortDir("asc");
    }
  };

  return (
    <div className="space-y-6">
      {/* Estatísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
            <CardTitle className="text-sm text-muted-foreground">Taxa de qualificação</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <PlugZap className="h-5 w-5 text-secondary" />
            <span className="text-2xl font-semibold">{qualificationRate}%</span>
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

      {/* Toolbar de busca, filtro por datas e exportação */}
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
          <div className="flex items-center gap-2 flex-wrap">
            {/* Filtro de datas */}
            <Select
              value={datePreset}
              onValueChange={(val) => {
                const v = val as typeof datePreset;
                setDatePreset(v);
                if (v === "custom") {
                  // abre calendário para selecionar período
                  setCalendarOpen(true);
                }
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last7">Últimos 7 Dias</SelectItem>
                <SelectItem value="thisMonth">Esse mês</SelectItem>
                <SelectItem value="lastMonth">Mês Passado</SelectItem>
                <SelectItem value="custom">Personalizado</SelectItem>
              </SelectContent>
            </Select>
            {datePreset === "custom" ? (
              <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="inline-flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4" /> Selecionar período
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-[360px] md:w-[700px] max-h-[calc(100vh-160px)] overflow-y-auto" align="start">
                  <div className="p-3 space-y-3 flex flex-col">
                    <Calendar
                      mode="range"
                      selected={customRange}
                      onSelect={setCustomRange}
                      numberOfMonths={isMobile ? 1 : 2}
                      locale={ptBR}
                    />
                    <div className="flex items-center justify-end gap-2 sticky bottom-0 bg-popover p-2 mt-1 border-t">
                      <Button variant="outline" size="sm" onClick={() => { setCustomRange(undefined); setCalendarOpen(false); }}>Cancelar</Button>
                      <Button size="sm" onClick={() => {
                        // Permitir período de um único dia: se apenas 'from' estiver definido, usar to = from
                        if (customRange?.from && !customRange?.to) {
                          setCustomRange({ from: customRange.from, to: customRange.from });
                        }
                        if (!customRange?.from || !customRange?.to) {
                          toast.error("Selecione um período válido (início e fim)");
                          return;
                        }
                        setCalendarOpen(false);
                        toast.success("Período aplicado");
                      }}>Aplicar</Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            ) : null}
            {apuradoTexto ? (
              <span className="text-xs text-muted-foreground">
                Período: {apuradoTexto}
              </span>
            ) : null}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" /> Exportar
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleExportCSV}>Excel (.csv)</DropdownMenuItem>
                <DropdownMenuItem onClick={handleExportSVG}>SVG</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
                <TableHead>
                  <button className={"inline-flex items-center gap-1 " + (sortBy === "name" ? "text-foreground font-semibold underline" : secondarySortBy === "name" ? "text-foreground/70 italic" : "text-muted-foreground")} onClick={(e) => onSortClick("name", e)}>
                    <span>Nome</span>
                    {sortBy === "name" ? (sortDir === "asc" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />) : <ArrowUpDown className="h-3 w-3 text-muted-foreground" />}
                  </button>
                </TableHead>
                <TableHead>
                  <button className={"inline-flex items-center gap-1 " + (sortBy === "email" ? "text-foreground font-semibold underline" : secondarySortBy === "email" ? "text-foreground/70 italic" : "text-muted-foreground")} onClick={(e) => onSortClick("email", e)}>
                    <span>E-mail</span>
                    {sortBy === "email" ? (sortDir === "asc" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />) : <ArrowUpDown className="h-3 w-3 text-muted-foreground" />}
                  </button>
                </TableHead>
                <TableHead>
                  <button className={"inline-flex items-center gap-1 " + (sortBy === "whatsapp" ? "text-foreground font-semibold underline" : secondarySortBy === "whatsapp" ? "text-foreground/70 italic" : "text-muted-foreground")} onClick={(e) => onSortClick("whatsapp", e)}>
                    <span>Telefone</span>
                    {sortBy === "whatsapp" ? (sortDir === "asc" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />) : <ArrowUpDown className="h-3 w-3 text-muted-foreground" />}
                  </button>
                </TableHead>
                <TableHead>
                  <button className={"inline-flex items-center gap-1 " + (sortBy === "createdAt" ? "text-foreground font-semibold underline" : secondarySortBy === "createdAt" ? "text-foreground/70 italic" : "text-muted-foreground")} onClick={(e) => onSortClick("createdAt", e)}>
                    <span>Data de Cadastro</span>
                    {sortBy === "createdAt" ? (sortDir === "asc" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />) : <ArrowUpDown className="h-3 w-3 text-muted-foreground" />}
                  </button>
                </TableHead>
                <TableHead>
                  <button className={"inline-flex items-center gap-1 " + (sortBy === "origin" ? "text-foreground font-semibold underline" : secondarySortBy === "origin" ? "text-foreground/70 italic" : "text-muted-foreground")} onClick={(e) => onSortClick("origin", e)}>
                    <span>Origem da Captura</span>
                    {sortBy === "origin" ? (sortDir === "asc" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />) : <ArrowUpDown className="h-3 w-3 text-muted-foreground" />}
                  </button>
                </TableHead>
                <TableHead>
                  <button className={"inline-flex items-center gap-1 " + (sortBy === "status" ? "text-foreground font-semibold underline" : secondarySortBy === "status" ? "text-foreground/70 italic" : "text-muted-foreground")} onClick={(e) => onSortClick("status", e)}>
                    <span>Qualificação</span>
                    {sortBy === "status" ? (sortDir === "asc" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />) : <ArrowUpDown className="h-3 w-3 text-muted-foreground" />}
                  </button>
                </TableHead>
                <TableHead>
                  <button className={"inline-flex items-center gap-1 " + (sortBy === "conversionStatus" ? "text-foreground font-semibold underline" : secondarySortBy === "conversionStatus" ? "text-foreground/70 italic" : "text-muted-foreground")} onClick={(e) => onSortClick("conversionStatus", e)}>
                    <span>Conversão</span>
                    {sortBy === "conversionStatus" ? (sortDir === "asc" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />) : <ArrowUpDown className="h-3 w-3 text-muted-foreground" />}
                  </button>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayed.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-muted-foreground py-6">Nenhum lead encontrado</TableCell>
                </TableRow>
              ) : (
                displayed.map(l => {
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
                      <TableCell className="font-medium">
                        <button
                          className="text-primary hover:text-primary/80 underline underline-offset-2"
                          onClick={() => { setDetailsLead(l); setOpenDetails(true); }}
                          title="Ver detalhes do lead"
                        >
                          {l.name}
                        </button>
                      </TableCell>
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
                        {l.qualificationReason ? (
                          <button
                            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mt-2"
                            onClick={() => { setViewTitle("Motivo da desqualificação"); setViewText(l.qualificationReason || ""); setOpenViewDialog(true); }}
                            title="Ver motivo da desqualificação"
                          >
                            <Info className="h-3 w-3" /> Ver motivo
                          </button>
                        ) : null}
                      </TableCell>
                      <TableCell>
                        <Select
                          value={l.conversionStatus ?? ""}
                          onValueChange={(val) => handleConversionChange(l.id, val as "Venda realizada" | "Perdido" | "Retornar em breve")}
                        >
                          <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Definir" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Venda realizada">Venda realizada</SelectItem>
                            <SelectItem value="Perdido">Perdido</SelectItem>
                            <SelectItem value="Retornar em breve">Retornar em breve</SelectItem>
                          </SelectContent>
                        </Select>
                        <div className="flex items-center gap-2 mt-2">
                          {l.conversionStatus === "Venda realizada" && typeof l.saleValue === "number" ? (
                            <Badge variant="secondary" className="cursor-pointer" onClick={() => { setViewTitle("Valor da venda"); setViewText((l.saleValue ?? 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })); setOpenViewDialog(true); }}>
                              {(l.saleValue ?? 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                            </Badge>
                          ) : null}
                          {l.conversionStatus === "Perdido" && l.conversionReason ? (
                            <button
                              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                              onClick={() => { setViewTitle("Motivo da perda"); setViewText(l.conversionReason || ""); setOpenViewDialog(true); }}
                              title="Ver motivo da perda"
                            >
                              <Info className="h-3 w-3" /> Ver motivo
                            </button>
                          ) : null}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dialog: motivo de desqualificação */}
      <Dialog open={openQualifyDialog} onOpenChange={setOpenQualifyDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Motivo da desqualificação</DialogTitle>
            <DialogDescription>Explique brevemente por que o lead foi marcado como não qualificado.</DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Label htmlFor="qualify-reason">Motivo</Label>
            <Textarea id="qualify-reason" value={qualifyReason} onChange={(e) => setQualifyReason(e.target.value)} placeholder="Ex.: Sem perfil, orçamento muito baixo, fora da região, etc." />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setOpenQualifyDialog(false); setQualifyLead(null); setQualifyReason(""); }}>Cancelar</Button>
            <Button onClick={saveQualificationReason} disabled={!qualifyLead}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog: detalhes de conversão */}
      <Dialog open={openConversionDialog} onOpenChange={setOpenConversionDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {conversionType === "Venda realizada" ? "Registrar valor da venda" : conversionType === "Perdido" ? "Motivo da perda" : "Atualizar conversão"}
            </DialogTitle>
            <DialogDescription>
              {conversionType === "Venda realizada" ? "Informe o valor fechado para este lead." : conversionType === "Perdido" ? "Explique brevemente o motivo da perda." : "Selecione o status de conversão desejado."}
            </DialogDescription>
          </DialogHeader>
          {conversionType === "Venda realizada" ? (
            <div className="space-y-2">
              <Label htmlFor="sale-value">Valor da venda (R$)</Label>
              <Input id="sale-value" type="number" inputMode="decimal" placeholder="0,00" value={saleValueInput} onChange={(e) => setSaleValueInput(e.target.value)} />
            </div>
          ) : conversionType === "Perdido" ? (
            <div className="space-y-2">
              <Label htmlFor="conversion-reason">Motivo</Label>
              <Textarea id="conversion-reason" value={conversionReasonInput} onChange={(e) => setConversionReasonInput(e.target.value)} placeholder="Ex.: preço, concorrência, sem resposta, etc." />
            </div>
          ) : null}
          <DialogFooter>
            <Button variant="outline" onClick={() => { setOpenConversionDialog(false); setConversionLead(null); setConversionType(null); }}>Cancelar</Button>
            <Button onClick={saveConversion} disabled={!conversionLead || !conversionType}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog: visualizar conteúdo */}
      <Dialog open={openViewDialog} onOpenChange={setOpenViewDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{viewTitle || "Detalhes"}</DialogTitle>
          </DialogHeader>
          <div className="text-sm whitespace-pre-wrap break-words">{viewText || "—"}</div>
          <DialogFooter>
            <Button onClick={() => setOpenViewDialog(false)}>Fechar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Sheet: detalhes do lead */}
      <LeadDetailsSheet open={openDetails} onOpenChange={setOpenDetails} lead={detailsLead} />
    </div>
  );
};

export default LeadsTab;