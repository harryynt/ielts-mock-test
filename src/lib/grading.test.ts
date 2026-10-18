import { describe, expect, it } from 'vitest';
import { getBandFromScore, gradeQuestion, scoreAttempt } from './grading';
import { sampleReadingTest } from '../data/sampleReadingTest';

describe('gradeQuestion', () => {
  it('accepts case-insensitive trimmed answers', () => {
    const result = gradeQuestion({ acceptedAnswers: ['colour', 'color'] }, ' Color ');
    expect(result.correct).toBe(true);
  });

  it('rejects non-matching answers', () => {
    const result = gradeQuestion({ acceptedAnswers: ['true'] }, 'false');
    expect(result.correct).toBe(false);
  });
});

describe('scoreAttempt', () => {
  it('calculates the score and question stats', () => {
    const answers = {
      q1: 'b',
      q2: 'false',
      q3: 'true',
      q4: 'fruit and vegetables',
      q5: 'volunteers',
      q6: 'a',
      q7: 'space',
      q8: 'public health'
    };

    const result = scoreAttempt(sampleReadingTest, answers);
    expect(result.correctCount).toBe(8);
    expect(result.totalQuestions).toBe(8);
    expect(result.band).toBeGreaterThan(0);
  });
});

describe('getBandFromScore', () => {
  it('maps a perfect score to a top IELTS band', () => {
    expect(getBandFromScore(8, 8, 'reading')).toBeGreaterThanOrEqual(8);
  });

  it('returns zero for no correct answers', () => {
    expect(getBandFromScore(0, 8, 'reading')).toBe(0);
  });
});
