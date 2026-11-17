# Журнал роли «Фундамент»

## 2026-11-17 · PR каркаса
- Сделано: перенесены CLAUDE.md и docs из общей папки; монорепо pnpm (TS 6, ESLint, Prettier), Expo SDK 58 в `apps/app` с Expo Router, NativeWind, TanStack Query, клиентом Supabase; заготовки `packages/*` с тестами; `supabase init`; `pnpm sync:shared` + проверка в Deno; CLI `course:validate` (каркас); CI на GitHub Actions.
- Проверено: lint, typecheck, test, `expo export` для web и android, Deno-тест копии пакетов.
- Договорённости: ADR-0002 (vendor-копия пакетов для Edge Functions); маршруты приложения в `apps/app/src/app`; если среда навязывает имя ветки, роль пишется в заголовке PR (CLAUDE.md §5).
- Дальше: PR#2–3 — полная `course-schema` и валидатор §6.4, правила `core` §7, контракты `api-contract` §9.
- Блокеров нет. Ключ Claude API и аккаунт Supabase для каркаса не нужны.
