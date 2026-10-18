import { useMemo } from 'react';
import { sampleReadingTest } from '../../data/sampleReadingTest';
import { useExamStore } from '../../store/examStore';
import { Question, QuestionGroup, Section } from '../../types/test';

export function flattenQuestions(test: typeof sampleReadingTest) {
  return test.sections.flatMap((section) =>
    section.questionGroups.flatMap((group) => group.questions)
  );
}

export function getQuestionById(test: typeof sampleReadingTest, questionId: string) {
  return flattenQuestions(test).find((question) => question.id === questionId);
}

export function getQuestionState(test: typeof sampleReadingTest, question: Question, section: Section, group: QuestionGroup) {
  const store = useExamStore.getState();
  const value = store.answers[question.id];
  const isFlagged = Boolean(store.flagged[question.id]);
  const isAnswered = value !== undefined && value !== null && value !== '' && !(Array.isArray(value) && value.length === 0);

  return {
    value,
    isFlagged,
    isAnswered,
    section,
    group
  };
}

export function getQuestionStatus(test: typeof sampleReadingTest, questionId: string) {
  const answer = useExamStore.getState().answers[questionId];
  const flagged = Boolean(useExamStore.getState().flagged[questionId]);

  const status =
    answer === undefined || answer === null || answer === '' || (Array.isArray(answer) && answer.length === 0)
      ? 'unanswered'
      : 'answered';

  return { status, flagged };
}

export function formatQuestionNumber(value: number) {
  return value.toString().padStart(2, '0');
}

export const useReadingQuestionMap = () => {
  const test = sampleReadingTest;
  return useMemo(() => {
    const map = new Map<string, { section: Section; group: QuestionGroup; question: Question }>();

    test.sections.forEach((section) => {
      section.questionGroups.forEach((group) => {
        group.questions.forEach((question) => {
          map.set(question.id, { section, group, question });
        });
      });
    });

    return map;
  }, []);
};
