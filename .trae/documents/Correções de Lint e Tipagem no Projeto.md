## Objetivos
- Eliminar erros de lint sem alterar comportamentos de runtime.
- Remover usos de `any`, blocos vazios e `require()` incompatíveis com TypeScript/ESM.
- Manter estilo e layout intactos.

## Intervenções por Arquivo
- `tailwind.config.ts`
  - Substituir `plugins: [require("tailwindcss-animate")]` por import ESM: `import animate from "tailwindcss-animate";` e usar `plugins: [animate]`.
- `src/components/ui/textarea.tsx`
  - Trocar `export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}` por `export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;`.
- `src/main.tsx`
  - Preencher `catch {}` vazio com `void 0;` para remover `no-empty` sem introduzir `no-console`.
- `src/lib/integrations.ts`
  - Garantir que todos `catch {}` tenham corpo mínimo (`void 0;`).
- `src/lib/leadMeta.ts`
  - Remover diretivas `// eslint-disable-next-line no-console` não utilizadas.
  - Trocar `(data.meta as any)` por `(data.meta as Record<string, unknown>)` e ajustar montagem de `LeadMeta`.
- `src/lib/logger.ts`
  - Substituir `(console as any)[level]` por `(console as Console)[level]` e tipar `args: unknown[]` (já está) para remover `no-explicit-any`.
- `src/lib/notifications.ts`
  - Em `getEnv`, trocar `(import.meta as any).env?.[name]` por `(import.meta as unknown as { env?: Record<string, unknown> }).env?.[name]`.
  - Substituir checagem e uso de beacon: `typeof navigator.sendBeacon === "function"` e chamar `navigator.sendBeacon(url, blob)` sem `any`.
  - Preencher `catch {}` vazios com `void 0;` quando necessário.
- `src/lib/tracking.ts`
  - Trocar `(window as any).dataLayer` por `(window as unknown as { dataLayer?: unknown[] }).dataLayer` e manter a verificação com `Array.isArray`.
- `src/lib/users.ts`
  - Tipar o resultado Supabase com `UserRow` e remover `(u: any)`: `from<UserRow>("app_users")` e mapear `UserRow` -> `AppUser`.

## Itens com Avisos (Opcional)
- `react-refresh/only-export-components`: separar constantes/funções não-componentes em arquivos dedicados nos componentes apontados (form, navigation-menu, sidebar, sonner, toggle). Propor correção futura; não afeta execução atual.
- Remover diretivas `eslint-disable` não utilizadas em `leadCapture.ts`, `leadMeta.ts`, `logger.ts`, `tracking.ts`.

## Validação
- Rodar `eslint` para confirmar que erros foram eliminados.
- Rodar build de produção (`vite build`) para garantir que não houve regressões.

## Riscos e Mitigação
- Mudanças de tipagem podem revelar problemas ocultos: cobrir via tipos explícitos e `unknown` com conversões seguras.
- Preencher `catch` com `void 0;` mantém comportamento atual e evita `no-empty`.

Confirma executar o plano? Após sua confirmação, aplico as alterações, rodo lint e build e reporto resultados.