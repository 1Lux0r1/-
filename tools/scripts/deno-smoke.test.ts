// Проверяет, что общие пакеты из supabase/functions/_shared/vendor работают в Deno (рантайм Edge Functions).
// Запуск: deno test --config supabase/functions/deno.json tools/scripts/deno-smoke.test.ts
import { ApiErrorSchema } from '../../supabase/functions/_shared/vendor/api-contract/index.ts';
import { isPassingScore } from '../../supabase/functions/_shared/vendor/core/index.ts';
import { CourseSlugSchema } from '../../supabase/functions/_shared/vendor/course-schema/index.ts';

declare const Deno: { test(name: string, fn: () => void): void };

function assert(condition: boolean, message: string): void {
  if (!condition) throw new Error(message);
}

Deno.test('core работает в Deno', () => {
  assert(isPassingScore(70, 70), '70 при проходном 70 должно быть зачётом');
});

Deno.test('zod-контракты работают в Deno', () => {
  const parsed = ApiErrorSchema.safeParse({
    error: { code: 'ai_unavailable', message: 'Сервис недоступен' },
  });
  assert(parsed.success, 'ошибка в едином формате должна проходить схему');
  assert(CourseSlugSchema.safeParse('pm-senior').success, 'slug pm-senior должен быть валиден');
});
