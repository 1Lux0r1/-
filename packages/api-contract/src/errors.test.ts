import { describe, expect, it } from 'vitest';

import { ApiErrorSchema } from './errors.ts';

describe('ApiErrorSchema', () => {
  it('принимает ошибку в едином формате', () => {
    const parsed = ApiErrorSchema.safeParse({
      error: { code: 'question_limit_reached', message: 'Лимит уточняющих вопросов исчерпан' },
    });
    expect(parsed.success).toBe(true);
  });

  it('отклоняет неизвестный код', () => {
    const parsed = ApiErrorSchema.safeParse({ error: { code: 'oops', message: 'x' } });
    expect(parsed.success).toBe(false);
  });
});
