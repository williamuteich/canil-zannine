export function InstagramSearch() {
  return (
    <div className="w-full max-w-md">
      <input
        type="text"
        placeholder="Buscar publicações do Instagram"
        className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-500 focus:ring-offset-1"
      />
    </div>
  );
}