import React from "react";
import { AlertCircle, Droplet, Sparkles, TrendingDown, CheckCircle2 } from "lucide-react";
import { useInView } from "../hooks/useInView";

const BLOOD_GROUPS = [
  {
    group: "O-",
    percentage: 18,
    status: "Critique",
    color: "bg-rose-600",
    bgBadge: "bg-rose-950/90 text-rose-300 border-rose-700/80",
    isCritical: true,
    detail: "Donneur universel d'hématies — besoin urgent",
  },
  {
    group: "O+",
    percentage: 41,
    status: "Tendu",
    color: "bg-amber-500",
    bgBadge: "bg-amber-950/90 text-amber-300 border-amber-700/80",
    isCritical: false,
    detail: "Groupe le plus fréquent au Bénin",
  },
  {
    group: "A-",
    percentage: 27,
    status: "Critique",
    color: "bg-rose-600",
    bgBadge: "bg-rose-950/90 text-rose-300 border-rose-700/80",
    isCritical: true,
    detail: "Fortes demandes chirurgicales",
  },
  {
    group: "A+",
    percentage: 64,
    status: "Satisfaisant",
    color: "bg-emerald-500",
    bgBadge: "bg-emerald-950/90 text-emerald-300 border-emerald-700/80",
    isCritical: false,
    detail: "Niveau de stock stable",
  },
  {
    group: "B-",
    percentage: 22,
    status: "Critique",
    color: "bg-rose-600",
    bgBadge: "bg-rose-950/90 text-rose-300 border-rose-700/80",
    isCritical: true,
    detail: "Besoin urgent en pédiatrie & néonatologie",
  },
  {
    group: "B+",
    percentage: 58,
    status: "Satisfaisant",
    color: "bg-emerald-500",
    bgBadge: "bg-emerald-950/90 text-emerald-300 border-emerald-700/80",
    isCritical: false,
    detail: "Réserves régulières",
  },
  {
    group: "AB-",
    percentage: 35,
    status: "Tendu",
    color: "bg-amber-500",
    bgBadge: "bg-amber-950/90 text-amber-300 border-amber-700/80",
    isCritical: false,
    detail: "Donneur universel de plasma",
  },
  {
    group: "AB+",
    percentage: 72,
    status: "Satisfaisant",
    color: "bg-emerald-500",
    bgBadge: "bg-emerald-950/90 text-emerald-300 border-emerald-700/80",
    isCritical: false,
    detail: "Receveur universel d'hématies",
  },
];

export default function Reserves() {
  const [sectionRef, inView] = useInView({ threshold: 0.1 });

  return (
    <section
      ref={sectionRef}
      id="reserves"
      className="py-20 bg-[#161514] text-white relative overflow-hidden border-t border-neutral-800"
    >
      {/* Halo rouge lumineux en arrière-plan */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-900/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        {/* En-tête de section unifié et moderne */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-xs sm:text-sm font-bold tracking-widest uppercase text-rose-400 bg-rose-950/80 border border-rose-800/80 rounded-full px-4 py-1.5 mb-4 shadow-sm">
            Réserves nationales de sang
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Les besoins <span className="text-primary-500">du moment.</span>
          </h2>
          <p className="text-base sm:text-lg text-neutral-400 leading-relaxed">
            Les groupes Rhésus négatif et les donneurs universels (O-) manquent régulièrement. Si votre groupe est en rouge, votre don répond à une urgence vitale immédiate.
          </p>
        </div>

        {/* Grille des 8 groupes sanguins avec jauges animées */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {BLOOD_GROUPS.map(
            (
              { group, percentage, status, color, bgBadge, isCritical, detail },
              idx
            ) => (
              <div
                key={group}
                style={{ transitionDelay: `${idx * 100}ms` }}
                className={`bg-[#201E1D] rounded-3xl p-6 border transition-all duration-500 flex flex-col justify-between hover:-translate-y-1.5 ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                } ${
                  isCritical
                    ? "border-rose-600/70 shadow-xl shadow-rose-950/30 hover:border-rose-500"
                    : "border-neutral-800 hover:border-neutral-700 shadow-md"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-3xl font-black text-white tracking-tight">
                        {group}
                      </span>
                      {isCritical && (
                        <span className="flex h-2.5 w-2.5 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
                        </span>
                      )}
                    </div>
                    <span className="text-sm font-extrabold text-neutral-300">
                      {percentage}%
                    </span>
                  </div>

                  {/* Jauge de progression animée */}
                  <div className="w-full bg-neutral-800 rounded-full h-3 overflow-hidden mb-4 p-0.5 border border-neutral-700/60">
                    <div
                      className={`h-full rounded-full ${color} transition-all duration-1000 ease-out`}
                      style={{
                        width: inView ? `${percentage}%` : "0%",
                      }}
                    />
                  </div>

                  <p className="text-xs text-neutral-400 font-medium mb-4 leading-snug">
                    {detail}
                  </p>
                </div>

                {/* Badge d'état du stock */}
                <div>
                  <span
                    className={`inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full border ${bgBadge}`}
                  >
                    {isCritical && <TrendingDown size={13} className="text-rose-400 animate-pulse" />}
                    <span>{status}</span>
                  </span>
                </div>
              </div>
            )
          )}
        </div>

        {/* Note informative institutionnelle */}
        <div className="flex items-start gap-3 text-xs sm:text-sm text-neutral-400 bg-[#201E1D] p-5 rounded-2xl border border-neutral-800/80">
          <AlertCircle size={18} className="text-primary-400 flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Les niveaux de réserve sont calculés quotidiennement par l'Agence Nationale pour la Transfusion Sanguine. Si votre groupe sanguin est en situation <strong className="text-rose-400 font-bold">Critique</strong>, rendez-vous dès aujourd'hui dans le centre le plus proche.
          </p>
        </div>
      </div>
    </section>
  );
}
