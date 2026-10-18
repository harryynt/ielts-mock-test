export function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-6">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-panel">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Authentication</p>
        <h1 className="mt-2 text-2xl font-bold">Student login</h1>
        <div className="mt-6 space-y-4">
          <input className="w-full rounded-lg border border-slate-200 px-3 py-2" placeholder="Email" />
          <input type="password" className="w-full rounded-lg border border-slate-200 px-3 py-2" placeholder="Password" />
          <button className="w-full rounded-lg bg-brand-500 px-4 py-2.5 font-medium text-white">Sign in</button>
        </div>
      </div>
    </div>
  );
}
