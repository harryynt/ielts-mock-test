import { useLocation, useNavigate } from 'react-router-dom';
import { sampleReadingTest } from '../../data/sampleReadingTest';

export function ResultsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const result = location.state?.result ?? {
    totalQuestions: 8,
    correctCount: 8,
    incorrectCount: 0,
    score: 8,
    band: 8,
    byQuestionType: { multiple_choice_single: { total: 1, correct: 1 }, true_false_not_given: { total: 2, correct: 2 }, sentence_completion: { total: 2, correct: 2 }, multiple_choice_multiple: { total: 1, correct: 1 }, short_answer: { total: 2, correct: 2 } },
    results: []
  };

  return (
    <div className="min-h-screen bg-slate-100 px-6 py-10 text-slate-800">
      <div className="mx-auto max-w-5xl rounded-2xl border border-slate-200 bg-white p-8 shadow-panel">
        <div className="mb-8 flex items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Result</p>
            <h1 className="mt-2 text-3xl font-bold">{sampleReadingTest.title}</h1>
          </div>
          <button
            className="rounded-full bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600"
            onClick={() => navigate('/exam')}
          >
            Retake test
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <div className="text-sm text-slate-500">Band score</div>
            <div className="mt-2 text-4xl font-bold text-brand-600">{result.band.toFixed(1)}</div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <div className="text-sm text-slate-500">Raw score</div>
            <div className="mt-2 text-4xl font-bold">{result.correctCount}/{result.totalQuestions}</div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <div className="text-sm text-slate-500">Accuracy</div>
            <div className="mt-2 text-4xl font-bold">{Math.round((result.correctCount / result.totalQuestions) * 100)}%</div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-slate-200 p-5">
            <h2 className="text-lg font-semibold">Performance by question type</h2>
            <div className="mt-4 space-y-4">
              {Object.entries(result.byQuestionType).map(([type, stats]) => (
                <div key={type}>
                  <div className="mb-1 flex items-center justify-between text-sm text-slate-600">
                    <span className="capitalize">{type.replace(/_/g, ' ')}</span>
                    <span>{stats.correct}/{stats.total}</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
                    <div className="h-full rounded-full bg-brand-500" style={{ width: `${(stats.correct / stats.total) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 p-5">
            <h2 className="text-lg font-semibold">Answer review</h2>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              {result.results.length === 0 ? (
                <p>No answers reviewed yet.</p>
              ) : (
                result.results.map((entry: any) => (
                  <div key={entry.questionId} className="rounded-lg border border-slate-200 p-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-slate-800">Question {entry.number}</span>
                      <span className={`rounded-full px-2 py-1 text-xs ${entry.correct ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                        {entry.correct ? 'Correct' : 'Incorrect'}
                      </span>
                    </div>
                    <p className="mt-2 text-slate-600">Correct answer: {entry.acceptedAnswers.join(' / ')}</p>
                    <p className="mt-1 text-slate-600">Explanation: {entry.explanation}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
