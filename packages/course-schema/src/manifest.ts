import { z } from 'zod';

/** Версия формата курса, которую понимает платформа (`format_version` в course.yaml). */
export const COURSE_FORMAT_VERSION = 1;

/** Slug курса: латиница в нижнем регистре, цифры и дефис, например `pm-senior`. */
export const CourseSlugSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
