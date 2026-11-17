// Каркас: минимальные правила оценки из CLAUDE.md §7.2.
// Полный набор правил (модули, подсказки, серия слабых попыток, грейды) появится во второй задаче «Фундамента».

/** Статус попытки после проверки (CLAUDE.md §8.2, `submissions.status`). */
export type SubmissionStatus =
  'pending' | 'reviewing' | 'passed' | 'needs_rework' | 'review_failed';

/** Зачёт, если итог не ниже проходного балла курса или задания. */
export function isPassingScore(totalScore: number, passScore: number): boolean {
  return totalScore >= passScore;
}

/** Итог проверки считается в коде как сумма баллов по критериям, а не берётся у модели. */
export function sumCriterionScores(scores: readonly number[]): number {
  return scores.reduce((total, score) => total + score, 0);
}
