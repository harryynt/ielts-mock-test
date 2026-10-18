import { Test } from '../types/test';
import { academicReadingBandScale } from '../data/sampleReadingTest';

export function normalizeAnswer(value: string | string[] | boolean | null): string {
  if (Array.isArray(value)) {
    return value.map((item) => normalizeAnswer(item)).join(',');
  }

  if (typeof value === 'boolean') {
    return value ? 'true' : 'false';
  }

  if (typeof value === 'string') {
    return value.trim().toLowerCase().replace(/\s+/g, ' ');
  }

  return '';
}

export function isAnswerAccepted(questionAcceptedAnswers: string[], candidate: string | string[] | boolean | null) {
  const normalizedCandidate = normalizeAnswer(candidate);
  if (!normalizedCandidate) return false;

  const normalizedAccepted = questionAcceptedAnswers.map((answer) => normalizeAnswer(answer));

  return normalizedAccepted.includes(normalizedCandidate);
}

export function gradeQuestion(question: { acceptedAnswers: string[] }, candidate: string | string[] | boolean | null) {
  const correct = isAnswerAccepted(question.acceptedAnswers, candidate);
  return {
    correct,
    acceptedAnswers: question.acceptedAnswers,
    candidate: normalizeAnswer(candidate)
  };
}

export function countCorrectAnswers(test: Test, answers: Record<string, string | string[] | boolean | null>) {
  const allQuestions = test.sections.flatMap((section) =>
    section.questionGroups.flatMap((group) => group.questions)
  );

  const results = allQuestions.map((question) => {
    const candidate = answers[question.id];
    const { correct } = gradeQuestion(question, candidate);
    return {
      questionId: question.id,
      number: question.number,
      correct,
      acceptedAnswers: question.acceptedAnswers,
      explanation: question.explanation
    };
  });

  return {
    total: results.length,
    correct: results.filter((entry) => entry.correct).length,
    incorrect: results.filter((entry) => !entry.correct).length,
    results
  };
}

export function getBandFromScore(score: number, total: number, skill: Test['skill']) {
  const ratio = total > 0 ? (score / total) * 100 : 0;
  const scale = skill === 'reading' ? academicReadingBandScale : academicReadingBandScale;

  const match = scale.find((item) => ratio >= (item.min / total) * 100 && ratio <= (item.max / total) * 100);

  return match ? match.band : 0;
}

export function scoreAttempt(test: Test, answers: Record<string, string | string[] | boolean | null>) {
  const { total, correct, incorrect, results } = countCorrectAnswers(test, answers);
  const band = getBandFromScore(correct, total, test.skill);

  const byQuestionType: Record<string, { total: number; correct: number }> = {};

  test.sections.forEach((section) => {
    section.questionGroups.forEach((group) => {
      group.questions.forEach((question) => {
        const key = group.type;
        byQuestionType[key] = byQuestionType[key] || { total: 0, correct: 0 };
        byQuestionType[key].total += 1;
        if (gradeQuestion(question, answers[question.id]).correct) {
          byQuestionType[key].correct += 1;
        }
      });
    });
  });

  return {
    totalQuestions: total,
    correctCount: correct,
    incorrectCount: incorrect,
    score: correct,
    band,
    byQuestionType,
    results
  };
}
