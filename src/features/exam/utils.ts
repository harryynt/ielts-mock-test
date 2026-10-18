import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sampleReadingTest } from '../../../data/sampleReadingTest';
import { scoreAttempt } from '../../../lib/grading';
import { useExamStore } from '../../../store/examStore';
import { QuestionRenderer } from './QuestionRenderer';
import { flattenQuestions } from '../../../features/exam/utils';

const totalSeconds = sampleReadingTest.durationMinutes * 60;

export function ReadingExamPage() {
  const navigate = useNavigate();
  const [remainingSeconds, setRemainingSeconds] = useState(totalSeconds);
  const [activeQuestionId, setActiveQuestionId] = useState<string>(flattenQuestions(sampleReadingTest)[0].id);
  const [selectedText, setSelectedText] = useState<string>('');
  const [notes, setNotes] = useState<Record<string, string>>({});

  const answers = useExamStore((state) => state.answers);
  const flagged = useExamStore((state) => state.flagged);
  const setAnswer = useExamStore((state) => state.setAnswer);
  const toggleFlag = useExamStore((state) => state.toggleFlag);

  const allQuestions = useMemo(() => flattenQuestions(sampleReadingTest), []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setRemainingSeconds((previous) => {
        if (previous <= 1) {
          const result = scoreAttempt(sampleReadingTest, answers);
          navigate('/results', { state: { result } });
          return 0;
        }
        return previous - 1;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [answers, navigate]);

  useEffect(() => {
    const beforeUnloadHandler = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', beforeUnloadHandler);
    return () => window.removeEventListener('beforeunload', beforeUnloadHandler);
  }, []);

  const currentQuestion = allQuestions.find((question) => question.id === activeQuestionId) ?? allQuestions[0];
  const currentSection = sampleReadingTest.sections.find((section) =>
    section.questionGroups.some((group) => group.questions.some((question) => question.id === currentQuestion.id))
  );
  const currentGroup = currentSection?.questionGroups.find((group) =>
    group.questions.some((question) => question.id === currentQuestion.id)
  );

  const selectPassageText = () => {
    const text = window.getSelection()?.toString().trim();
    if (text) {
      setSelectedText(text);
    }
  };

  const handlePassageNote = () => {
    if (!selectedText) return;
    const nextNote = notes[selectedText] ?? '';
    const noteText = window.prompt('Add a note for the selected text:', nextNote) ?? nextNote;
    if (noteText) {
      setNotes((previous) => ({ ...previous, [selectedText]: noteText }));
    }
  };

  const getStatusClass = (questionId: string) => {
    const answer = answers[questionId];
    const isFlagged = Boolean(flagged[questionId]);
    if (isFlagged) return 'bg-amber-500 text-white';
    if (answer === undefined || answer === null || answer === '' || (Array.isArray(answer) && answer.length === 0)) return 'bg-slate-200 text-slate-700';
    return 'bg-emerald-500 text-white';
  };

  const minutes = String(Math.floor(remainingSeconds / 60)).padStart(2, '0');
  const seconds = String(remainingSeconds % 60).padStart(2, '0');

  return (
    <div className="flex min-h-screen flex-col bg-slate-100 text-slate-800">
      <header className="border-b border-slate-200 bg-white px-6 py-3 shadow-sm">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">IELTS Mock Test</p>
            <h1 className="text-lg font-semibold">{sampleReadingTest.title}</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium">Reading</div>
            <div className="rounded-lg bg-slate-900 px-4 py-2 font-mono text-xl font-bold text-white">
              {minutes}:{seconds}
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col gap-4 px-4 py-4">
        <div className="flex gap-4 overflow-hidden rounded-b-xl border border-slate-200 bg-white shadow-panel">
          <div className="flex w-[52%] flex-col border-r border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-3">
              <div className="font-medium">Passage</div>
              <div className="flex gap-2">
                <button className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs" onClick={selectPassageText}>Highlight text</button>
                <button className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs" onClick={handlePassageNote}>Add note</button>
              </div>
            </div>
            <div className="max-h-[72vh] overflow-y-auto p-6 text-[15px] leading-8 text-slate-700">
              {currentSection?.passage?.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-5">
                  {paragraph}
                </p>
              ))}
              {selectedText && (
                <div className="mt-6 rounded-lg border border-sky-200 bg-sky-50 p-3 text-sm text-sky-800">
                  Selected: “{selectedText}”
                  {notes[selectedText] ? <div className="mt-2">Note: {notes[selectedText]}</div> : null}
                </div>
              )}
            </div>
          </div>

          <div className="flex w-[48%] flex-col">
            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-3">
              <div className="font-medium">Questions</div>
              <button
                className="rounded-md bg-brand-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-brand-600"
                onClick={() => { const result = scoreAttempt(sampleReadingTest, answers); navigate('/results', { state: { result } }); }}
              >
                Submit test
              </button>
            </div>

            <div className="flex gap-3 border-b border-slate-200 bg-white p-3">
              {sampleReadingTest.sections.map((section) => (
                <button
                  key={section.id}
                  className={`rounded-full border px-3 py-1.5 text-sm ${currentSection?.id === section.id ? 'border-brand-500 bg-brand-50 text-brand-600' : 'border-slate-200 bg-white text-slate-700'}`}
                  onClick={() => {
                    const firstQuestionId = section.questionGroups[0].questions[0].id;
                    setActiveQuestionId(firstQuestionId);
                  }}
                >
                  {section.title}
                </button>
              ))}
            </div>

            <div className="max-h-[62vh] space-y-4 overflow-y-auto p-4">
              {currentGroup?.questions.map((question) => (
                <div
                  key={question.id}
                  className={`rounded-xl border p-4 ${activeQuestionId === question.id ? 'border-brand-200 bg-brand-50' : 'border-slate-200 bg-white'}`}
                  onClick={() => setActiveQuestionId(question.id)}
                >
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div className="text-sm font-semibold text-slate-800">Question {question.number}</div>
                    <div className="flex items-center gap-2">
                      <button
                        className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs"
                        onClick={(event) => {
                          event.stopPropagation();
                          toggleFlag(question.id);
                        }}
                      >
                        {flagged[question.id] ? 'Unflag' : 'Flag for review'}
                      </button>
                    </div>
                  </div>
                  <p className="mb-4 text-[15px] leading-7 text-slate-700">{question.text}</p>
                  <QuestionRenderer group={currentGroup} question={question} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <footer className="sticky bottom-0 z-10 border-t border-slate-200 bg-white px-3 py-3 shadow-[0_-6px_20px_rgba(15,23,42,0.05)]">
          <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-3">
            <div className="flex items-center gap-2 overflow-x-auto">
              {allQuestions.map((question) => (
                <button
                  key={question.id}
                  className={`flex h-10 w-10 items-center justify-center rounded-lg border text-sm font-medium ${activeQuestionId === question.id ? 'border-brand-500 bg-brand-50 text-brand-600' : getStatusClass(question.id)}`}
                  onClick={() => setActiveQuestionId(question.id)}
                >
                  {question.number}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm">Part 1</button>
              <button className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm">Part 2</button>
              <button className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm">Part 3</button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
