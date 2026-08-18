import { Sparkles, MapPin } from "lucide-react";

export default function MobileStickyCta() {
  const scrollToSection = (href) => {
    const target = document.querySelector(href);
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-2.5 bg-slate-900/95 backdrop-blur-xl border-t border-white/10 shadow-2xl flex items-center justify-between gap-2 transition-all">
      <button
        onClick={() => scrollToSection("#eligibilite")}
        className="flex-1 py-2.5 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-rose-600/20 active:scale-[0.98] transition-all cursor-pointer"
      >
        <Sparkles size={14} className="text-rose-200 animate-pulse" />
        <span className="truncate">Éligibilité</span>
      </button>

      <button
        onClick={() => scrollToSection("#ou-donner")}
        className="flex-1 py-2.5 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-rose-600/20 active:scale-[0.98] transition-all cursor-pointer"
      >
        <MapPin size={14} className="text-rose-200" />
        <span className="truncate">Trouver un centre</span>
      </button>
    </div>
  );
}
