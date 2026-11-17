# Обучалка

Личная платформа загружаемых курсов с ИИ-наставником: приложение для телефона (Android, iOS) и веб-версия из одной кодовой базы. Первый курс — школа «Путь к Senior PM».

**Правила для всех, кто пишет код (людей и агентов), — в [CLAUDE.md](CLAUDE.md).** План агентов: [docs/AGENTS-PLAN.md](docs/AGENTS-PLAN.md). Решения владельца: [docs/OWNER-DECISIONS.md](docs/OWNER-DECISIONS.md). Архитектурные решения: [docs/decisions/](docs/decisions/).

## Что нужно установить

- Node.js 22 (версия в `.nvmrc`), pnpm 10 (`corepack enable`).
- Для Edge Functions: [Deno 2](https://deno.com) и [Supabase CLI](https://supabase.com/docs/guides/local-development) (понадобятся агенту «Бэкенд»).

## Как запустить

```bash
pnpm install
pnpm web            # приложение в браузере
pnpm dev            # Expo: QR-код для телефона (Expo Go) и меню платформ
```

Переменные окружения: скопируйте `.env.example` в `apps/app/.env.local` и заполните (пока бэкенд не подключён, приложение работает без них).

## Команды

| Команда | Что делает |
|---|---|
| `pnpm lint` | ESLint по всему репозиторию |
| `pnpm format` / `pnpm format:check` | Prettier |
| `pnpm typecheck` | Проверка типов во всех пакетах и приложении |
| `pnpm test` | Тесты (Vitest) во всех пакетах |
| `pnpm sync:shared` | Копирует `packages/*` в `supabase/functions/_shared/vendor` для Edge Functions |
| `pnpm course:validate [courses/<slug>]` | Проверка курса (пока каркас: только `course.yaml`) |
| `pnpm course:import courses/<slug>` | Импорт курса в базу (появится у «Бэкенда») |

Перед PR: `pnpm lint && pnpm typecheck && pnpm test` (и `pnpm course:validate`, если трогали курсы). CI на GitHub выполняет то же самое плюс проверку пакетов в Deno и веб-сборку.

## Структура

```
apps/app/               Expo-приложение (телефон и веб), маршруты в src/app
packages/core/          бизнес-правила обучения (чистые функции)
packages/course-schema/ формат курса: zod-схема и валидатор
packages/api-contract/  контракты Edge Functions
supabase/               база, миграции, Edge Functions
courses/                курсы (папка на курс)
evals/                  проверка качества ИИ-наставника
tools/                  CLI курсов и служебные скрипты
docs/                   спецификация, решения, журналы агентов
```

Подробно с зонами ответственности: CLAUDE.md §3.
