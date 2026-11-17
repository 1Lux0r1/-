// zod-контракты запросов и ответов Edge Functions (CLAUDE.md §9).
// Внешняя зависимость только zod; относительные импорты с расширением .ts.
export { ApiErrorSchema, ERROR_CODES } from './errors.ts';
export type { ApiError, ErrorCode } from './errors.ts';
