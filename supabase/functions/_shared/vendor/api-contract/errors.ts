import { z } from 'zod';

/** Коды ошибок Edge Functions (CLAUDE.md §4.4). Новые коды добавляются сюда. */
export const ERROR_CODES = [
  'attempt_too_short',
  'hint_step_locked',
  'question_limit_reached',
  'module_locked',
  'ai_unavailable',
] as const;

export type ErrorCode = (typeof ERROR_CODES)[number];

/** Единый формат ошибки: `code` для логики, `message` по-русски для показа пользователю. */
export const ApiErrorSchema = z.object({
  error: z.object({
    code: z.enum(ERROR_CODES),
    message: z.string().min(1),
  }),
});

export type ApiError = z.infer<typeof ApiErrorSchema>;
