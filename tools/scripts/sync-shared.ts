// Копирует исходники packages/* в supabase/functions/_shared/vendor/, чтобы Edge Functions (Deno)
// импортировали тот же код, что и приложение (CLAUDE.md §4.3, ADR-0002).
// `--check` ничего не пишет и падает, если копия устарела (используется в CI).
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const REPO_ROOT = path.resolve(import.meta.dirname, '../..');
const VENDOR_DIR = path.join(REPO_ROOT, 'supabase/functions/_shared/vendor');
const PACKAGES = ['core', 'course-schema', 'api-contract'] as const;
const README = `# СГЕНЕРИРОВАНО — руками не править

Копия \`packages/*/src\` для Edge Functions. Обновляется командой \`pnpm sync:shared\`;
CI проверяет актуальность через \`pnpm sync:shared:check\`. Подробнее: CLAUDE.md §4.3, ADR-0002.
`;

/** Ожидаемое содержимое папки vendor: относительный путь → текст файла. */
function expectedFiles(): Map<string, string> {
  const files = new Map<string, string>([['README.md', README]]);
  for (const pkg of PACKAGES) {
    const srcDir = path.join(REPO_ROOT, 'packages', pkg, 'src');
    for (const entry of readdirSync(srcDir, { recursive: true, withFileTypes: true })) {
      if (!entry.isFile() || !entry.name.endsWith('.ts') || entry.name.endsWith('.test.ts'))
        continue;
      const absolute = path.join(entry.parentPath, entry.name);
      const relative = path.join(pkg, path.relative(srcDir, absolute));
      files.set(relative.split(path.sep).join('/'), readFileSync(absolute, 'utf8'));
    }
  }
  return files;
}

function actualFiles(): Map<string, string> {
  const files = new Map<string, string>();
  if (!existsSync(VENDOR_DIR)) return files;
  for (const entry of readdirSync(VENDOR_DIR, { recursive: true, withFileTypes: true })) {
    if (!entry.isFile()) continue;
    const absolute = path.join(entry.parentPath, entry.name);
    const relative = path.relative(VENDOR_DIR, absolute).split(path.sep).join('/');
    files.set(relative, readFileSync(absolute, 'utf8'));
  }
  return files;
}

function main(): number {
  const expected = expectedFiles();

  if (process.argv.includes('--check')) {
    const actual = actualFiles();
    const stale = [...new Set([...expected.keys(), ...actual.keys()])].filter(
      (file) => expected.get(file) !== actual.get(file),
    );
    if (stale.length > 0) {
      console.error(
        'Копия пакетов в supabase/functions/_shared/vendor устарела. Запустите `pnpm sync:shared`.',
      );
      for (const file of stale.sort()) console.error(`  ${file}`);
      return 1;
    }
    console.log('supabase/functions/_shared/vendor актуальна.');
    return 0;
  }

  rmSync(VENDOR_DIR, { recursive: true, force: true });
  for (const [file, content] of expected) {
    const target = path.join(VENDOR_DIR, file);
    mkdirSync(path.dirname(target), { recursive: true });
    writeFileSync(target, content);
  }
  console.log(`Скопировано файлов: ${expected.size} → supabase/functions/_shared/vendor`);
  return 0;
}

process.exitCode = main();
