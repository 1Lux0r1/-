import { describe, expect, it } from 'vitest';

import { CourseSlugSchema } from './manifest.ts';

describe('CourseSlugSchema', () => {
  it('принимает pm-senior', () => {
    expect(CourseSlugSchema.safeParse('pm-senior').success).toBe(true);
  });

  it('отклоняет пробелы и заглавные буквы', () => {
    expect(CourseSlugSchema.safeParse('PM Senior').success).toBe(false);
  });
});
