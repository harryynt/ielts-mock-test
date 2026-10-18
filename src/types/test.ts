export type Skill = 'listening' | 'reading' | 'writing' | 'speaking';
export type Module = 'academic' | 'general';
export type QuestionGroupType =
  | 'multiple_choice_single'
  | 'multiple_choice_multiple'
  | 'true_false_not_given'
  | 'yes_no_not_given'
  | 'matching_headings'
  | 'matching_information'
  | 'sentence_completion'
  | 'short_answer';

export interface Test {
  id: string;
  skill: Skill;
  title: string;
  module: Module;
  durationMinutes: number;
  sections: Section[];
}

export interface Section {
  id: string;
  title: string;
  passage: string | null;
  audioUrl: string | null;
  transcript: string | null;
  questionGroups: QuestionGroup[];
}

export interface QuestionGroup {
  id: string;
  type: QuestionGroupType;
  instruction: string;
  options?: string[];
  questions: Question[];
}

export interface Question {
  id: string;
  number: number;
  text: string;
  acceptedAnswers: string[];
  explanation: string;
}

export interface AttemptAnswer {
  [questionId: string]: string | string[] | boolean | null;
}

export interface AttemptSummary {
  totalQuestions: number;
  correctCount: number;
  incorrectCount: number;
  score: number;
  band: number;
  byQuestionType: Record<string, { total: number; correct: number }>; 
}
