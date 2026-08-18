import { Ambulance, Baby, HeartPulse, Hourglass } from "lucide-react";
import bloodimage from "../../assets/blood.png";
import { useInView } from "../../hooks/useInView";


const REASONS = [
  {
    icon: Ambulance,
    title: "Urgences et accidents",
    description:
      "Hémorragies massives : plusieurs poches peuvent être nécessaires en quelques minutes lors d'accidents ou d'opérations.",
    color: "bg-red-50 text-red-600 border-red-100",
  },
  {
    icon: Baby,
    title: "Maternité et enfance",
    description:
      "Accouchements compliqués et anémies sévères chez l'enfant, notamment liées au paludisme ou aux complications néonatales.",
    color: "bg-amber-50 text-amber-600 border-amber-100",
  },
  {
    icon: HeartPulse,
    title: "Maladies chroniques",
    description:
      "Drépanocytose, cancers, dialyses : des transfusions régulières et vitales tout au long de l'année.",
    color: "bg-rose-50 text-rose-600 border-rose-100",
  },
  {
    icon: Hourglass,
    title: "Un produit périssable",
    description:
      "Les plaquettes se conservent 7 jours, les globules rouges 42 jours. Le stock doit se reconstituer en continu.",
    color: "bg-indigo-50 text-indigo-600 border-indigo-100",
  },
];

export default function WhyGive() {
  const [sectionRef, inView] = useInView({ threshold: 0.1 });

  return (
    <section
      ref={sectionRef}
      id="pourquoi"
      className="py-16 sm:py-20 bg-[#FAF7F2] dark:bg-slate-900/60 border-t border-neutral-200/60 dark:border-slate-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* En-tête de section */}
        <div
          className={`flex flex-col mb-6 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
        >
          <span className="inline-block text-sm font-bold tracking-widest uppercase text-primary-700 dark:text-primary-400 py-1">
            Pourquoi donner ?
          </span>
          <span className="bg-primary-100/70 dark:bg-primary-950/60 w-10 border border-primary-200/80 dark:border-primary-800 rounded-full px-1 py-0.5 mb-4"></span>
        </div>

        {/* Sous En-tête avec 2 colonnes */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Colonne gauche */}
          <div
            className={`lg:col-span-6 flex flex-col justify-between transition-all duration-700 delay-100 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
          >
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight leading-tight mb-4">
                Le sang ne se fabrique pas.
                <span className="text-primary-600 dark:text-primary-400"> Il se donne.</span>
              </h2>
              <p className="text-base text-justify sm:text-lg text-neutral-600 dark:text-slate-300 leading-relaxed">
                Aucun laboratoire ne sait produire du sang humain. Chaque poche
                transfusée vient d'une personne qui a pris 45 minutes de sa
                journée. C'est le seul circuit d'approvisionnement qui existe.
              </p>
            </div>

            {/* Liste des raisons */}
            <div className="space-y-4 mt-8">
              <ul className="space-y-4">
                {REASONS.map(({ icon, title, description, color }, index) => {
                  const Icon = icon;
                  return (
                    <li
                      key={title}
                      style={{ transitionDelay: `${(index + 1) * 120}ms` }}
                      className={`group hover:shadow-xl hover:-translate-y-0.5 transition-all duration-500 rounded-2xl px-4 py-4 sm:px-5 sm:py-5 bg-white dark:bg-slate-800/90 border border-neutral-200/80 dark:border-slate-700/80 ${inView
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                        }`}
                    >
                      <div className="flex items-start gap-4">
                        {/* Cercle numéroté coloré */}
                        <div
                          className={`flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-bold text-sm sm:text-base transition-transform group-hover:scale-110 duration-300 ${color}`}
                        >
                          <Icon size={16} />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors mb-1">
                            {title}
                          </h3>
                          <p className="text-xs sm:text-sm text-neutral-600 dark:text-slate-300 leading-relaxed">
                            {description}
                          </p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>


          {/* Colonne droite : Image unique blood.jpg */}
          <div
            className={`lg:col-span-6 flex flex-col h-full min-h-[400px] transition-all duration-700 delay-300 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            <div className="relative w-full h-full min-h-[440px] rounded-3xl overflow-hidden shadow-lg border border-neutral-200/80 group">
              <img
                src={bloodimage}
                alt="Don de sang et professionnels de santé"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="inline-block text-xs font-bold uppercase tracking-wider text-primary-300 bg-neutral-950/80 backdrop-blur-md px-3 py-1 rounded-full mb-2 border border-primary-500/30">
                  Solidarité & Don de Soi
                </span>
                <p className="text-white text-base sm:text-lg font-bold leading-snug">
                  Chaque don de sang est une chance de plus offerte à un patient au Bénin.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}