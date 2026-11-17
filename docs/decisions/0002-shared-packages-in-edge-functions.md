# 0002. Общие пакеты в Edge Functions через копию vendor
Статус: принято
Дата: 2026-11-17 · Автор: фундамент

## Контекст
`packages/core`, `packages/course-schema` и `packages/api-contract` нужны и приложению (Metro), и Edge Functions (Deno). CLAUDE.md §4.3 предлагал копировать их в `supabase/functions/_shared/vendor` и разрешал упростить схему, если Supabase умеет импортировать пакеты напрямую.

Проверено при создании каркаса:
- Metro (Expo SDK 58) импортирует пакеты-исходники из workspace без настройки, включая относительные импорты с расширением `.ts` (веб- и Android-сборка проходят).
- Deploy Edge Functions загружает только содержимое `supabase/functions/`; импорт файлов за его пределами (`../../packages`) работает локально, но ненадёжен при деплое. Поэтому прямой импорт не берём.

## Решение
- Оставляем схему из §4.3: `pnpm sync:shared` (скрипт `tools/scripts/sync-shared.ts`) копирует `packages/<pkg>/src/**/*.ts` без тестов в `supabase/functions/_shared/vendor/<pkg>/`.
- `pnpm sync:shared:check` в CI падает, если копия отличается от исходников. После правки в `packages/*` автор PR запускает `pnpm sync:shared` и коммитит результат.
- Импорты в функциях через карту в `supabase/functions/deno.json`: `@obuchalka/core`, `@obuchalka/course-schema`, `@obuchalka/api-contract` и `zod` (`npm:zod@^4.6.7`). Если функция заводит собственный `deno.json`, она повторяет эти записи.
- CI проверяет, что копия работает в Deno: `deno test --config supabase/functions/deno.json tools/scripts/deno-smoke.test.ts`.

## Последствия (что меняется для других зон)
- Бэкенд и Наставник импортируют общий код как `@obuchalka/core` и т. п., а не относительным путём в `vendor`.
- Папку `vendor` руками не правят; правки в пакеты просят у «Фундамента».
- Пакеты по-прежнему зависят только от `zod`; новая внешняя зависимость пакета требует записи в `deno.json` и ADR.
