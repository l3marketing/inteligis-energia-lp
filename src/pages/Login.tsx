import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Mail, Lock } from "lucide-react";
import logoUrl from "@/assets/logo-inteligis-branco.svg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validação simples de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Por favor, insira um e-mail válido");
      return;
    }
    const ok = await login(email, password);
    if (ok) {
      toast.success("Acesso liberado");
      navigate("/admin");
    } else {
      toast.error("Senha inválida");
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-600 text-foreground flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img src={logoUrl} alt="Inteligis" className="h-[120px] md:h-[160px]" />
        </div>
        <Card className="shadow-xl border border-black/10">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Bem-vindo ao painel Inteligis</CardTitle>
            <p className="text-sm text-muted-foreground">Conecte, integre e acompanhe seus resultados.</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="admin-email">E-mail</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="admin-email"
                    type="email"
                    placeholder="contato@inteligis.com.br"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11 pl-9"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="admin-pass">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="admin-pass"
                    type="password"
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11 pl-9"
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full h-11 bg-secondary hover:bg-secondary/90 text-white font-semibold">Entrar</Button>
              <div className="text-center">
                <a href="#" className="text-sm text-primary hover:underline">Esqueci minha senha</a>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Login;