## Escopo e Objetivos

* Auditar todos os formulários e padronizar envio de leads, tracking e validações.

* Garantir captura de UTMs, cookies/consentimento, metadados técnicos e origem.

* Unificar o comportamento de submissão, eventos e webhook do painel.

## Diagnóstico Atual (arquivos)

* Formulários com tracking completo:

  * `src/components/HeroSection.tsx:128` usa `handleSubmit` com `trackEvent`, `addLeadWithMeta`, `notifyLeadSubmission`.

  * `src/components/FinalCTA.tsx:131` idem, com validações fortes.

  * `src/components/SavingsCalculator.tsx:67` captura simulação, valida, usa `addLeadWithMeta`, `trackEvent` e `notifyLeadSubmission`.

* Formulários com lacunas:

  * `src/pages/Index.tsx:293` form sem `onSubmit`/validação/tracking; não persiste lead.

  * `src/pages/EnergiaPorAssinatura.tsx:284` `handleSubmit` sem tracking/lead wrapper.

  * `src/pages/FiltrosCapacitivos.tsx:71` e `:475` forms sem tracking/lead wrapper.

  * `src/pages/EnergiaSolar.tsx:936` `handleFormSubmit` apenas alerta/console.

* Infra de tracking:

  * `src/lib/tracking.ts` coleta UTMs, cookies (`_ga`, `_fbp`, `_fbc`), first/last touch, sessão e (opcional) geolocalização por IP.

  * Respeita consentimento via `VITE_REQUIRE_CONSENT` e cookies `consent_marketing`/`consent_analytics`.

  * `src/hooks/use-tracking.ts` injeta campos ocultos (UTMs, sessão, IP geo) de forma síncrona/assíncrona.

* Persistência e webhook:

  * `src/lib/leadCapture.ts` (`addLeadWithMeta`) salva lead e metadados local/Supabase.

  * `src/lib/notifications.ts` envia webhook `/api/leads-webhook` via `sendBeacon`/`fetch`.

## Plano de Implementação

### 1. Componente padrão de formulário de lead

* Criar `components/FormLeadWrapper.tsx` com:

  * Props: `origin`, `fieldsConfig` (nome, email, whatsapp, empresa, conta, adicionais), `onSuccess` opcional.

  * Renderiza Inputs padrão (Shadcn), injeta `useTrackingFields` ocultos, valida email/whatsapp/numéricos.

  * Submete via `addLeadWithMeta`, dispara `trackEvent('submit_lead')` antes e `trackEvent('submit_lead_success')` depois, chama `notifyLeadSubmission`.

  * Mostra `toast` de sucesso/erro e acessibilidade (aria-invalid, helper texts).

### 2. Refatorar páginas para usar o wrapper

* Substituir/encapsular formulários em:

  * `pages/Index.tsx` (final CTA): integrar wrapper e remover form solto.

  * `pages/EnergiaPorAssinatura.tsx`: converter `handleSubmit` para wrapper com `origin: 'assinatura'`.

  * `pages/FiltrosCapacitivos.tsx` (dois formulários): usar wrapper com `origin: 'filtros-capacitivos'` e campos específicos.

  * `pages/EnergiaSolar.tsx`: trocar `handleFormSubmit` por wrapper com `origin: 'solar'`.

* Manter UI/estilos existentes, apenas padronizar a lógica.

### 3. Consentimento de cookies e privacidade

* Adicionar `components/CookieConsent.tsx`:

  * Banner simples com opções “Aceitar/“Recusar”. A opção aceitar em destaque de cor enquanto a opção recusar sem destaque.

  * Grava `consent_marketing` e `consent_analytics` em cookies e respeita `VITE_REQUIRE_CONSENT`.

* Integrar no `App.tsx` acima das rotas.

### 4. Robustez e segurança

* Validações adicionais: mascaramento/brasileiro para telefone, normalização de moeda, limites mínimos.

* Sanitização básica antes de persistir (trim, remover caracteres proibidos) e nunca incluir PII em `trackEvent`.

* Garantir que `notifyLeadSubmission` não bloqueie UI (já usa sendBeacon/fetch keepalive).

* Recomendação backend (fora do escopo do frontend): CSRF token ou verificação de origem em `/api/leads-webhook`.

### 5. Performance e UX

* Evitar re-renderings: memoizar tracking base, usar transições não bloqueantes.

* Feedback visual: estados de carregamento, erro inline, foco/aria-live após envio.

* Manter `ScrollToTop` para evitar flicker na navegação.

### 6. Testes

* Smoke tests manuais:

  * Submissão em cada página, verificar validações e toasts.

  * Checar `localStorage inteligis:leads` e metadados (`inteligis:lead_meta:<id>` via `saveLeadMeta`).

  * Verificar `inteligis:last_webhook_payload/result` e console `dataLayer` (no dev).

* Automação proposta:

  * Testes e2e (Playwright) para fluxo de submissão por página.

  * Mock de webhook endpoint.

### 7. Documentação

* Atualizar style guide (seções: campos obrigatórios, validações, tracking, consentimento, eventos).

* Relatório de auditoria com:

  * Páginas verificadas e resultados.

  * Problemas encontrados (com referências de arquivo/linha).

  * Sugestões e prioridades (alta: padronizar formulários que não persistem; média: consentimento; baixa: UX extra).

* Checklist de consistência para futuros formulários.

## Prioridades

* Alta: `Index.tsx`, `EnergiaPorAssinatura.tsx`, `FiltrosCapacitivos.tsx`, `EnergiaSolar.tsx` — padronizar com wrapper e garantir persistência+tracking.

* Média: Cookie consent, melhorias de validação/UX.

* Baixa: Automação de testes e documentação estendida.

## Entregáveis

* Componente `FormLeadWrapper` e integrações nas 4 páginas.

* Banner de consentimento funcional.

* Relatório de auditoria + checklist.

* Testes básicos e instruções de verificação.

Confirma que posso iniciar a implementação conforme o plano?
