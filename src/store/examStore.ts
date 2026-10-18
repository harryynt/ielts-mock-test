import { create } from 'zustand';

export type AnswerValue = string | string[] | boolean | null;

interface ExamState {
  answers: Record<string, AnswerValue>;
  flagged: Record<string, boolean>;
  currentQuestionId: string | null;
  setAnswer: (questionId: string, value: AnswerValue) => void;
  toggleFlag: (questionId: string) => void;
  setCurrentQuestion: (questionId: string | null) => void;
  clear: () => void;
}

export const useExamStore = create<ExamState>((set) => ({
  answers: {},
  flagged: {},
  currentQuestionId: null,
  setAnswer: (questionId, value) =>
    set((state) => ({
      answers: { ...state.answers, [questionId]: value }
    })),
  toggleFlag: (questionId) =>
    set((state) => ({
      flagged: { ...state.flagged, [questionId]: !state.flagged[questionId] }
    })),
  setCurrentQuestion: (questionId) => set({ currentQuestionId: questionId }),
  clear: () => set({ answers: {}, flagged: {}, currentQuestionId: null })
}));
