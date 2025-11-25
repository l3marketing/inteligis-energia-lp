## Visão Geral

Vamos ativar o envio de webhooks de leads e implementar a injeção real dos pixels (Meta, GTM, GA4, TikTok) em produção, com segurança e verificações.

## Webhooks de Leads

1. Configuração na Vercel:

* Adicionar `VITE_LEADS_WEBHOOK_URL` com o endpoint do seu backend que receberá leads.

* Opcional: `VITE_LEADS_WEBHOOK_TOKEN` (Bearer) para autenticação do webhook.

* Redeploy para aplicar.

1. Payload esperado (JSON):

* Campos: `type`, `project`, `timestamp`, `lead` (id, name, company, whatsapp, email, billValue, sector, estimatedMonthlySavings, origin, createdAt, status), `tracking` (UTMs, sessão, cookies não sensíveis).

1. Server-side recomendado (mais seguro):

* Criar uma função serverless na Vercel (`/api/leads-webhook`) que:

* Recebe o POST do frontend sem token.

* Valida com um segredo não exposto (env sem prefixo `VITE_`), aplica CORS e rate-limit.

* Encaminha (ou processa) para CRM/WhatsApp/e-mail.

* Vantagens: não expõe tokens no bundle do cliente; maior confiabilidade.

1. CORS e respostas:

* Permitir origem do seu domínio Vercel.

* Responder 2xx rapidamente, logar internamente.

* Suportar `keepalive`/`sendBeacon` para eventos de unload.

1. Testes:

* Em `/admin → Integrações → Webhooks`, usar "Testar envio" para enviar um payload de teste e verificar status.

* Observação: hoje o teste usa env (`VITE_LEADS_WEBHOOK_URL`), não o campo salvo; vamos alinhar isso abaixo.

## Pixels e Tags (Meta, GTM, GA4, TikTok)

1. Variáveis de ambiente (produção e preview):

* `VITE_META_PIXEL_ID`, `VITE_GTM_ID`, `VITE_GA4_ID`, `VITE_TIKTOK_PIXEL_ID`.

1. Implementação:

* Injetar dinamicamente os scripts no `index.html`/`main.tsx` se a env existir.

* Respeitar flags de consentimento (`VITE_REQUIRE_CONSENT`) já existentes para cookies.

1. UI de Integrações:

* Exibir estado real das integrações com base nas envs.

* Permitir alternância via UI (localStorage) apenas como rótulo visual no MVP.

* No próximo passo, a UI também poderá controlar a injeção (mesclar env + status UI).

1. Validação:

* Confirmar hits nos respectivos dashboards (GA4/Meta/TikTok) e inspecionar a rede.

## Ajustes no Painel /admin

1. Webhooks:

* Alinhar `IntegrationsTab` para:

* Mostrar a URL efetiva (env) e, opcionalmente, permitir override local.

* Fazer o botão "Testar envio" usar a URL exibida.

1. Feedback:

* Exibir o último payload/resposta (já implementado) e status HTTP.

## Segurança e Observabilidade

* Não expor segredos no cliente (evitar tokens em `VITE_*`).

* Usar envs privadas em serverless para tokens (ex.: `LEADS_WEBHOOK_TOKEN`).

* Logar erros no back-end e retornar 2xx ao cliente quando apropriado.

* Adicionar IDs de correlação no payload para rastrear fim-a-fim.

## Entregáveis

* Configuração das envs na Vercel e redeploy.

* (Opcional e recomendado) Função serverless `/api/leads-webhook` com segredo privado.

* Injeção real dos pixels conforme envs.

* Ajuste do painel de integrações para refletir a URL efetiva e testar corretamente.

* Documentação leve de verificação (rotas, payloads, testes).

