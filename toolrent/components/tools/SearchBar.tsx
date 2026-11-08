import { ArrowRight, Calendar, Search } from "lucide-react";

export default function SearchBar() {
  return (
    <form
      action="/catalog"
      className="glass flex items-center gap-3 rounded-full bg-white/55 py-2 pl-5 pr-2"
    >
      <Search size={20} className="shrink-0 text-ink" />
      <input
        type="search"
        name="q"
        placeholder="Що шукаєте? Перфоратор, газонокосарка…"
        className="min-w-0 flex-1 bg-transparent text-ink outline-none placeholder:text-ink/40"
      />
      <div className="hidden items-center gap-3 md:flex">
        <span className="h-7 w-px bg-ink/15" />
        <button
          type="button"
          className="flex items-center gap-2 px-1 font-medium text-ink"
        >
          <Calendar size={18} />
          Дати оренди
        </button>
        <button
          type="submit"
          aria-label="Знайти"
          className="flex size-11 shrink-0 items-center justify-center gap-2 rounded-full bg-brand font-medium text-white shadow-[0_8px_20px_rgb(255_107_26/0.35)] transition hover:brightness-105 md:size-auto md:px-5 md:py-3"
        >
          <span className="hidden md:inline">Знайти</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </form>
  );
}
