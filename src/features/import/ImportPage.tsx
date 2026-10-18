export function AdminDashboard() {
  return (
    <div className="min-h-screen bg-slate-100 p-8 text-slate-800">
      <div className="mx-auto max-w-6xl rounded-2xl border border-slate-200 bg-white p-8 shadow-panel">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Admin</p>
        <h1 className="mt-2 text-3xl font-bold">Test authoring dashboard</h1>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <h2 className="font-semibold">Manual creation</h2>
            <p className="mt-2 text-sm text-slate-600">Create sections, upload audio, and author questions.</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <h2 className="font-semibold">JSON/Excel import</h2>
            <p className="mt-2 text-sm text-slate-600">Validate rows and preview before publication.</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <h2 className="font-semibold">AI-assisted import</h2>
            <p className="mt-2 text-sm text-slate-600">Feature flagged pipeline for PDF/Word extraction.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
