// Доменные типы и чистая бизнес-логика платформы (CLAUDE.md §7).
// Внешних зависимостей нет; относительные импорты пишем с расширением .ts (нужно для Deno).
export { isPassingScore, sumCriterionScores } from './scoring.ts';
export type { SubmissionStatus } from './scoring.ts';
