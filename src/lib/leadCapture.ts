import { addLead, type Lead } from "@/lib/leads";
import { collectTrackingSync } from "@/lib/tracking";
import { saveLeadMeta, upsertLeadMetaSupabase } from "@/lib/leadMeta";

/**
 * Wrapper para criação de lead que também salva metadados (localStorage e Supabase, se habilitado).
 * Retorna o Lead salvo (da mesma forma que addLead).
 */
export async function addLeadWithMeta(
  input: Omit<Lead, "id" | "createdAt" | "status"> & Partial<Pick<Lead, "status">>
): Promise<Lead> {
  const saved = await addLead(input);
  try {
    const tracking = collectTrackingSync();
    const formValues: Record<string, unknown> = { ...input };
    // Local: sempre persistimos
    saveLeadMeta(saved.id, { tracking, formValues });
    // Remoto: melhor esforço (não bloqueante)
    await upsertLeadMetaSupabase(saved.id, { tracking, formValues });
  } catch (e) {
    console.warn("Falha ao salvar metadados do lead (wrapper)", e);
  }
  return saved;
}