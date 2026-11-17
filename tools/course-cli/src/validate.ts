import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

import { COURSE_FORMAT_VERSION, CourseSlugSchema } from '@obuchalka/course-schema';
import { parse } from 'yaml';

export interface ValidationResult {
  errors: string[];
  warnings: string[];
}

/**
 * Каркас валидатора: проверяет только манифест (наличие, format_version, slug = имя папки).
 * Полные правила CLAUDE.md §6.4 переедут в packages/course-schema во второй задаче «Фундамента».
 */
export function validateCourseDir(dir: string): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [
    'каркас валидатора: проверяется только course.yaml, полные правила §6.4 ещё не реализованы',
  ];

  const manifestPath = path.join(dir, 'course.yaml');
  if (!existsSync(manifestPath)) {
    errors.push('нет файла course.yaml');
    return { errors, warnings };
  }

  let manifest: unknown;
  try {
    manifest = parse(readFileSync(manifestPath, 'utf8'));
  } catch (error) {
    errors.push(`course.yaml не читается как YAML: ${(error as Error).message}`);
    return { errors, warnings };
  }

  if (typeof manifest !== 'object' || manifest === null) {
    errors.push('course.yaml должен быть объектом');
    return { errors, warnings };
  }

  const { format_version: formatVersion, slug } = manifest as Record<string, unknown>;
  if (formatVersion !== COURSE_FORMAT_VERSION) {
    errors.push(
      `format_version должен быть ${COURSE_FORMAT_VERSION}, указано: ${String(formatVersion)}`,
    );
  }
  if (!CourseSlugSchema.safeParse(slug).success) {
    errors.push(`slug «${String(slug)}» не подходит: только a-z, 0-9 и дефис`);
  } else if (slug !== path.basename(dir)) {
    errors.push(`slug «${String(slug)}» не совпадает с именем папки «${path.basename(dir)}»`);
  }

  return { errors, warnings };
}
