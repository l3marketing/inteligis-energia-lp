import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthed } from "@/lib/auth";
import { getLeads, exportCSV, downloadCSV, Lead } from "@/lib/leads";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AdminLeads = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    if (!isAuthed()) {
      navigate("/login");
      return;
    }
    setLeads(getLeads());
  }, [navigate]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return leads;
    return leads.filter(l =>
      [l.name, l.company, l.whatsapp, l.email, l.sector, l.status]
        .filter(Boolean)
        .some(v => String(v).toLowerCase().includes(q))
    );
  }, [leads, query]);

  const handleExportCSV = () => {
    const csv = exportCSV(filtered);
    downloadCSV(`leads-${new Date().toISOString().slice(0,10)}.csv`, csv);
  };

  return (
    <section className="min-h-screen bg-background text-foreground py-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Leads</h1>
          <div className="flex items-center gap-3">
            <Input
              placeholder="Buscar por nome, empresa, e-mail, setor, status"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-80 bg-white"
            />
            <Button onClick={handleExportCSV} className="bg-secondary text-white hover:bg-secondary/90">Exportar CSV</Button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-black/10 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-black/5">
              <tr>
                <th className="text-left p-3">Nome</th>
                <th className="text-left p-3">Empresa</th>
                <th className="text-left p-3">WhatsApp</th>
                <th className="text-left p-3">E-mail</th>
                <th className="text-left p-3">Conta (R$)</th>
                <th className="text-left p-3">Setor</th>
                <th className="text-left p-3">Economia (R$/mês)</th>
                <th className="text-left p-3">Status</th>
                <th className="text-left p-3">Criado em</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td className="p-4 text-center text-gray-500" colSpan={9}>Nenhum lead encontrado</td>
                </tr>
              ) : (
                filtered.map((l) => (
                  <tr key={l.id} className="border-t border-black/5">
                    <td className="p-3">{l.name}</td>
                    <td className="p-3">{l.company}</td>
                    <td className="p-3">{l.whatsapp}</td>
                    <td className="p-3">{l.email}</td>
                    <td className="p-3">{l.billValue?.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td className="p-3">{l.sector}</td>
                    <td className="p-3">{l.estimatedMonthlySavings?.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td className="p-3">{l.status}</td>
                    <td className="p-3">{new Date(l.createdAt).toLocaleString('pt-BR')}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default AdminLeads;