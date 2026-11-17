// CLI курсов: `pnpm course:validate [courses/<slug>]` и `pnpm course:import courses/<slug>` (CLAUDE.md §6).
// Запускается Node 22 напрямую из TypeScript (встроенное снятие типов), без сборки.
import { existsSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';

import { validateCourseDir } from './validate.ts';

const REPO_ROOT = path.resolve(import.meta.dirname, '../../..');
const COURSES_DIR = path.join(REPO_ROOT, 'courses');

function listCourseDirs(): string[] {
  if (!existsSync(COURSES_DIR)) return [];
  return readdirSync(COURSES_DIR)
    .map((name) => path.join(COURSES_DIR, name))
    .filter((dir) => statSync(dir).isDirectory());
}

function runValidate(args: string[]): number {
  const dirs =
    args.length > 0 ? args.map((arg) => path.resolve(process.cwd(), arg)) : listCourseDirs();
  if (dirs.length === 0) {
    console.log('Курсов для проверки нет (папка courses/ пуста).');
    return 0;
  }

  let failed = 0;
  for (const dir of dirs) {
    const result = validateCourseDir(dir);
    const label = path.relative(REPO_ROOT, dir) || dir;
    for (const warning of result.warnings) console.warn(`⚠ ${label}: ${warning}`);
    for (const error of result.errors) console.error(`✗ ${label}: ${error}`);
    if (result.errors.length === 0) console.log(`✓ ${label}`);
    else failed += 1;
  }
  return failed === 0 ? 0 : 1;
}

function main(): number {
  const [command, ...args] = process.argv.slice(2);
  switch (command) {
    case 'validate':
      return runValidate(args);
    case 'import':
      console.error(
        'Импорт курса ещё не реализован: он появится вместе с функцией import-course (агент «Бэкенд»).',
      );
      return 1;
    default:
      console.error(
        'Использование: course-cli validate [courses/<slug> ...] | import courses/<slug>',
      );
      return 2;
  }
}

process.exitCode = main();
