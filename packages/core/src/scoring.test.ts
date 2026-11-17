import { describe, expect, it } from 'vitest';

import { isPassingScore, sumCriterionScores } from './scoring.ts';

describe('isPassingScore', () => {
  it('69 при проходном 70 — на доработку', () => {
    expect(isPassingScore(69, 70)).toBe(false);
  });

  it('70 при проходном 70 — зачёт', () => {
    expect(isPassingScore(70, 70)).toBe(true);
  });
});

describe('sumCriterionScores', () => {
  it('складывает баллы по критериям', () => {
    expect(sumCriterionScores([20, 15, 10, 5])).toBe(50);
  });

  it('пустой список даёт 0', () => {
    expect(sumCriterionScores([])).toBe(0);
  });
});
