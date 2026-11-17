import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

import { describe, expect, it } from 'vitest';

import { validateCourseDir } from './validate.ts';

function makeCourse(slug: string, manifest: string | null): string {
  const dir = path.join(mkdtempSync(path.join(tmpdir(), 'course-')), slug);
  mkdirSync(dir);
  if (manifest !== null) writeFileSync(path.join(dir, 'course.yaml'), manifest);
  return dir;
}

describe('validateCourseDir', () => {
  it('принимает корректный манифест', () => {
    const dir = makeCourse('pm-senior', 'format_version: 1\nslug: pm-senior\n');
    expect(validateCourseDir(dir).errors).toEqual([]);
  });

  it('ругается на отсутствие course.yaml', () => {
    expect(validateCourseDir(makeCourse('x', null)).errors).toEqual(['нет файла course.yaml']);
  });

  it('ругается, если slug не совпадает с папкой', () => {
    const dir = makeCourse('pm-senior', 'format_version: 1\nslug: other\n');
    expect(validateCourseDir(dir).errors).toHaveLength(1);
  });
});
