import React from 'react';
import { Question, QuestionGroup } from '../../../types/test';
import { useExamStore } from '../../../store/examStore';

interface QuestionRendererProps {
  group: QuestionGroup;
  question: Question;
}

export function QuestionRenderer({ group, question }: QuestionRendererProps) {
  const answer = useExamStore((state) => state.answers[question.id]);
  const setAnswer = useExamStore((state) => state.setAnswer);

  const onSingleChange = (value: string) => setAnswer(question.id, value);
  const onCheckboxChange = (value: string) => {
    const current = Array.isArray(answer) ? answer : [];
    const exists = current.includes(value);
    const next = exists ? current.filter((item) => item !== value) : [...current, value];
    setAnswer(question.id, next);
  };

  switch (group.type) {
    case 'multiple_choice_single':
      return (
        <div className="space-y-3">
          {group.options?.map((option) => {
            const optionKey = option.split('.')[0].toUpperCase();
            return (
              <label key={option} className="flex items-start gap-3 rounded-md border border-slate-200 p-3 hover:bg-slate-50">
                <input
                  type="radio"
                  name={question.id}
                  checked={String(answer) === optionKey}
                  onChange={() => onSingleChange(optionKey)}
                  className="mt-1 h-4 w-4 accent-brand-500"
                />
                <span>{option}</span>
              </label>
            );
          })}
        </div>
      );

    case 'multiple_choice_multiple':
      return (
        <div className="space-y-3">
          {group.options?.map((option) => {
            const optionKey = option.split('.')[0].toUpperCase();
            const checked = Array.isArray(answer) ? answer.includes(optionKey) : false;
            return (
              <label key={option} className="flex items-start gap-3 rounded-md border border-slate-200 p-3 hover:bg-slate-50">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onCheckboxChange(optionKey)}
                  className="mt-1 h-4 w-4 accent-brand-500"
                />
                <span>{option}</span>
              </label>
            );
          })}
        </div>
      );

    case 'true_false_not_given':
      return (
        <div className="space-y-3">
          {['True', 'False', 'Not Given'].map((option) => (
            <label key={option} className="flex items-center gap-3 rounded-md border border-slate-200 p-3 hover:bg-slate-50">
              <input
                type="radio"
                name={question.id}
                checked={String(answer).toLowerCase() === option.toLowerCase()}
                onChange={() => onSingleChange(option)}
                className="h-4 w-4 accent-brand-500"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      );

    case 'sentence_completion':
      return (
        <input
          value={typeof answer === 'string' ? answer : ''}
          onChange={(event) => setAnswer(question.id, event.target.value)}
          placeholder="Type your answer"
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none ring-0 focus:border-brand-500"
        />
      );

    case 'short_answer':
      return (
        <input
          value={typeof answer === 'string' ? answer : ''}
          onChange={(event) => setAnswer(question.id, event.target.value)}
          placeholder="Answer in 1–2 words"
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none ring-0 focus:border-brand-500"
        />
      );

    default:
      return (
        <div className="rounded-md border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600">
          This question type is prepared for future extension and will be supported in a later phase.
        </div>
      );
  }
}
