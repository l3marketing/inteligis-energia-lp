import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!import.meta.env.VITE_ADMIN_USERNAME || !import.meta.env.VITE_ADMIN_PASSWORD) {
      toast.error("VITE_ADMIN_USERNAME/VITE_ADMIN_PASSWORD não configurados no ambiente");
      return;
    }
    // Validação simples de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Por favor, insira um e-mail válido");
      return;
    }
    const ok = login(email, password);
    if (ok) {
      toast.success("Acesso liberado");
      navigate("/admin/leads");
    } else {
      toast.error("Senha inválida");
    }
  };

  return (
    <section className="min-h-screen bg-foreground text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
        <h1 className="text-2xl font-bold mb-4">Área Restrita</h1>
        <p className="text-white/80 mb-6">Insira seu e-mail e senha para acessar os leads.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="admin-email" className="text-white">E-mail</Label>
            <Input
              id="admin-email"
              type="email"
              placeholder="contato@inteligis.com.br"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 bg-white text-foreground"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="admin-pass" className="text-white">Senha</Label>
            <Input
              id="admin-pass"
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 bg-white text-foreground"
              required
            />
          </div>
          <Button type="submit" className="w-full h-12 bg-secondary hover:bg-secondary/90 text-white font-semibold">Entrar</Button>
        </form>
      </div>
    </section>
  );
};

export default Login;