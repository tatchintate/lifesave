import { AlertCircle, TrendingDown } from "lucide-react";
import { useInView } from "../../hooks/useInView";

const BLOOD_GROUPS = [
  {
    group: "O-",
    percentage: 18,
    status: "Critique",
    strokeColor: "#E05253", // Rouge alerte
    bgBadge: "bg-rose-100 md:bg-rose-950/90 text-rose-800 md:text-rose-300 border-rose-200 md:border-rose-700/80",
    isCritical: true,
    detail: "Donneur universel d'hématies — besoin urgent",
  },
  {
    group: "O+",
    percentage: 41,
    status: "Tendu",
    strokeColor: "#F59E0B", // Amber
    bgBadge: "bg-amber-100 md:bg-amber-950/90 text-amber-800 md:text-amber-300 border-amber-200 md:border-amber-700/80",
    isCritical: false,
    detail: "Groupe le plus fréquent au Bénin",
  },
  {
    group: "A-",
    percentage: 27,
    status: "Critique",
    strokeColor: "#E05253",
    bgBadge: "bg-rose-100 md:bg-rose-950/90 text-rose-800 md:text-rose-300 border-rose-200 md:border-rose-700/80",
    isCritical: true,
    detail: "Fortes demandes chirurgicales",
  },
  {
    group: "A+",
    percentage: 64,
    status: "Satisfaisant",
    strokeColor: "#10B981", // Emerald
    bgBadge: "bg-emerald-100 md:bg-emerald-950/90 text-emerald-800 md:text-emerald-300 border-emerald-200 md:border-emerald-700/80",
    isCritical: false,
    detail: "Niveau de stock stable",
  },
  {
    group: "B-",
    percentage: 22,
    status: "Critique",
    strokeColor: "#E05253",
    bgBadge: "bg-rose-100 md:bg-rose-950/90 text-rose-800 md:text-rose-300 border-rose-200 md:border-rose-700/80",
    isCritical: true,
    detail: "Besoin urgent en pédiatrie & néonatologie",
  },
  {
    group: "B+",
    percentage: 58,
    status: "Satisfaisant",
    strokeColor: "#10B981",
    bgBadge: "bg-emerald-100 md:bg-emerald-950/90 text-emerald-800 md:text-emerald-300 border-emerald-200 md:border-emerald-700/80",
    isCritical: false,
    detail: "Réserves régulières",
  },
  {
    group: "AB-",
    percentage: 35,
    status: "Tendu",
    strokeColor: "#F59E0B",
    bgBadge: "bg-amber-100 md:bg-amber-950/90 text-amber-800 md:text-amber-300 border-amber-200 md:border-amber-700/80",
    isCritical: false,
    detail: "Donneur universel de plasma",
  },
  {
    group: "AB+",
    percentage: 72,
    status: "Satisfaisant",
    strokeColor: "#10B981",
    bgBadge: "bg-emerald-100 md:bg-emerald-950/90 text-emerald-800 md:text-emerald-300 border-emerald-200 md:border-emerald-700/80",
    isCritical: false,
    detail: "Receveur universel d'hématies",
  },
];

export default function Reserves() {
  const [sectionRef, inView] = useInView({ threshold: 0.1 });
  const circleRadius = 42;
  const circumference = 2 * Math.PI * circleRadius;

  return (
    <section
      ref={sectionRef}
      id="reserves"
      className="py-12 sm:py-16 bg-[#FAF7F2] dark:bg-[#161514] text-neutral-900 dark:text-white relative overflow-hidden border-t border-neutral-200/80 dark:border-neutral-800 transition-colors"
    >
      {/* Halo lumineux bleu sapphire en arrière-plan */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-600/10 dark:bg-primary-600/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        {/* En-tête de section centré */}
        <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto mb-12 gap-3">
          <div>
            <span className="inline-block text-xs sm:text-sm font-bold tracking-widest uppercase text-primary-700 dark:text-primary-400 py-1">
              Niveau des Stocks & Urgences Vitales
            </span>
          </div>
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight leading-tight mb-3">
              État des stocks <span className="text-primary-600 dark:text-primary-400">& besoins du moment.</span>
            </h2>
            <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
              Les groupes Rhésus négatif et les donneurs universels (O-) manquent régulièrement. Si votre groupe est en rouge, votre don répond à une urgence vitale immédiate.
            </p>
          </div>
        </div>

        {/* Grille des 8 groupes sanguins avec CARTES CIRCULAIRES & JAUGES SVG RADIALES */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12">
          {BLOOD_GROUPS.map(
            (
              { group, percentage, status, strokeColor, bgBadge, isCritical, detail },
              idx
            ) => {
              const dashOffset = inView
                ? circumference - (circumference * percentage) / 100
                : circumference;

              return (
                <div
                  key={group}
                  style={{ transitionDelay: `${idx * 75}ms` }}
                  className={`flex flex-col items-center transition-all duration-500 ${
                    inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                >
                  {/* Carte Circulaire (Ronde) avec Anneau SVG */}
                  <div
                    className={`relative w-44 h-44 sm:w-52 sm:h-52 lg:w-56 lg:h-56 rounded-full bg-white dark:bg-[#201E1D] flex flex-col items-center justify-center p-4 border transition-all duration-500 group hover:scale-105 shadow-md ${
                      isCritical
                        ? "border-rose-400/60 dark:border-rose-600/70 shadow-rose-600/10 dark:shadow-xl dark:shadow-rose-950/40"
                        : "border-neutral-200/80 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700"
                    }`}
                  >
                    {/* Anneau SVG Radial de Progression */}
                    <svg
                      className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-1.5"
                      viewBox="0 0 100 100"
                    >
                      {/* Piste de fond */}
                      <circle
                        cx="50"
                        cy="50"
                        r={circleRadius}
                        fill="transparent"
                        stroke="currentColor"
                        strokeWidth="5"
                        className="text-neutral-100 dark:text-neutral-800"
                      />
                      {/* Jauge de progression colorée */}
                      <circle
                        cx="50"
                        cy="50"
                        r={circleRadius}
                        fill="transparent"
                        stroke={strokeColor}
                        strokeWidth="5.5"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={dashOffset}
                        className="transition-all duration-1000 ease-out"
                      />
                    </svg>

                    {/* Contenu Central du Cercle */}
                    <div className="relative z-10 flex flex-col items-center justify-center text-center">
                      <div className="flex items-center gap-1 mb-1">
                        <span className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-white tracking-tight">
                          {group}
                        </span>
                        {isCritical && (
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping" />
                        )}
                      </div>

                      {/* Pourcentage au centre */}
                      <span className="text-xs sm:text-sm font-extrabold text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800/80 px-2.5 py-0.5 rounded-full mb-2">
                        {percentage}% réservé
                      </span>

                      {/* Pill de statut */}
                      <span
                        className={`inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${bgBadge}`}
                      >
                        {isCritical && (
                          <TrendingDown
                            size={12}
                            className="text-rose-600 dark:text-rose-400 animate-pulse"
                          />
                        )}
                        <span>{status}</span>
                      </span>
                    </div>
                  </div>

                  {/* Sous-titre sous la carte ronde */}
                  <p className="mt-3 text-center text-xs text-neutral-600 dark:text-neutral-400 font-medium max-w-[190px] leading-snug px-1">
                    {detail}
                  </p>
                </div>
              );
            }
          )}
        </div>

        {/* Note informative institutionnelle */}
        <div className="flex items-start gap-3 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 bg-white dark:bg-[#201E1D] p-5 rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-xs">
          <AlertCircle size={18} className="text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Les niveaux de réserve sont calculés quotidiennement par l'Agence Nationale pour la Transfusion Sanguine. Si votre groupe sanguin est en situation <strong className="text-rose-600 dark:text-rose-400 font-bold">Critique</strong>, rendez-vous dès aujourd'hui dans le centre le plus proche.
          </p>
        </div>
      </div>
    </section>
  );
}
