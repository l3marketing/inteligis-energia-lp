// Cliente Supabase centralizado
// Usa variáveis de ambiente e expõe uma única instância para o app
import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

// Ativa Supabase apenas quando flag está true E as variáveis estão presentes
export const useSupabase = (
  (import.meta.env.VITE_USE_SUPABASE ?? "false").toString() === "true"
) && !!url && !!anon;

export const supabase = (() => {
  if (!url || !anon) {
    // Retorna um client "nulo" quando não configurado; chamadas irão falhar com erro claro
    // Isso evita quebrar build em ambientes sem Supabase
    return createClient("https://invalid.local", "invalid-key");
  }
  return createClient(url, anon);
})();