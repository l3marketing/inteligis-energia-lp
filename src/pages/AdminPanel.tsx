import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthed } from "@/lib/auth";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Brain, Cog, Layers, Users, BookText } from "lucide-react";
import LeadsTab from "@/components/admin/LeadsTab";
import IntegrationsTab from "@/components/admin/IntegrationsTab";
import UsersTab from "@/components/admin/UsersTab";
import ApiDocsTab from "@/components/admin/ApiDocsTab";

const AdminPanel = () => {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isAuthed()) {
      navigate("/login");
      return;
    }
    setReady(true);
  }, [navigate]);

  return (
    <section className="min-h-screen bg-background text-foreground py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-6">
          <Brain className="h-6 w-6 text-secondary" />
          <h1 className="text-2xl font-bold">Painel Inteligis</h1>
        </div>

        <Tabs defaultValue="leads" className="space-y-6">
          <TabsList>
            <TabsTrigger value="leads" className="flex items-center gap-2"><Layers className="h-4 w-4" /> Leads</TabsTrigger>
            <TabsTrigger value="usuarios" className="flex items-center gap-2"><Users className="h-4 w-4" /> Usuários</TabsTrigger>
            <TabsTrigger value="integracoes" className="flex items-center gap-2"><Cog className="h-4 w-4" /> Integrações</TabsTrigger>
            <TabsTrigger value="api" className="flex items-center gap-2"><BookText className="h-4 w-4" /> Documentação API</TabsTrigger>
          </TabsList>

          <TabsContent value="leads" className="space-y-6">
            {ready && <LeadsTab />}
          </TabsContent>
          <TabsContent value="usuarios" className="space-y-6">
            {ready && <UsersTab />}
          </TabsContent>
          <TabsContent value="integracoes" className="space-y-6">
            {ready && <IntegrationsTab />}
          </TabsContent>
          <TabsContent value="api" className="space-y-6">
            {ready && <ApiDocsTab />}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default AdminPanel;