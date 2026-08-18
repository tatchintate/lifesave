import { useState } from "react";
import {
  FileText,
  Stethoscope,
  Droplet,
  Coffee,
  Droplets,
  Smile,
  Utensils,
  Check,
  Sparkles,
  Info,
  X,
  ArrowRight,
  ShieldCheck,
  HeartPulse,
} from "lucide-react";
import { useInView } from "../../hooks/useInView";

const STEPS = [
  {
    num: "1",
    duration: "5 MIN",
    title: "Accueil et questionnaire",
    description:
      "Vous présentez une pièce d'identité et remplissez un questionnaire de santé confidentiel pour préparer l'entretien.",
    icon: FileText,
    details: [
      "Munissez-vous d'une pièce d'identité avec photo (CNI, Passeport, Permis).",
      "Le questionnaire aborde votre état de santé récent et vos antécédents.",
      "Toutes les informations soumises sont strictly confidentielles.",
    ],
  },
  {
    num: "2",
    duration: "10 MIN",
    title: "Entretien médical",
    description:
      "Un professionnel de santé vérifie votre tension, votre taux d'hémoglobine et valide votre aptitude. Tout se dit en tête-à-tête.",
    icon: Stethoscope,
    details: [
      "Entretien individuel et confidentiel avec un médecin ou un(e) infirmier(e).",
      "Mesure rapide de la tension artérielle et test d'hémoglobine au bout du doigt.",
      "C'est le moment idéal pour poser toutes vos questions en toute confiance.",
    ],
  },
  {
    num: "3",
    duration: "8 À 10 MIN",
    title: "Le prélèvement",
    description:
      "Allongé confortablement, une seule piqûre au pli du coude. Environ 450 ml prélevés avec du matériel stérile et à usage unique.",
    icon: Droplet,
    highlight: true,
    details: [
      "Installé sur un fauteuil médical inclinable et confortable.",
      "Matériel 100% stérile et à usage unique — aucun risque d'infection.",
      "Un volume de 450 ml est prélevé, rapidement reconstitué par l'organisme.",
    ],
  },
  {
    num: "4",
    duration: "20 MIN",
    title: "Collation et repos",
    description:
      "Vous restez assis, on vous offre à boire et à manger. C'est ce moment convivial obligatoire qui évite tout malaise.",
    icon: Coffee,
    details: [
      "Collation gourmande offerte (jus de fruits, biscuits, eau, sandwichs).",
      "Supervision attentive par l'équipe pour garantir votre bonne récupération.",
      "Reposez-vous 15 à 20 minutes avant de reprendre vos activités quotidiennes.",
    ],
  },
];

const PREPARATION_CARDS = [
  {
    phase: "Avant le don",
    icon: Droplets,
    badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    iconColor: "text-blue-400 bg-slate-900 border-slate-700/50",
    bullets: [
      "Mangez dans les 3 heures qui précèdent — jamais à jeun.",
      "Buvez 500 ml d'eau de plus que d'habitude.",
      "Munissez-vous d'une pièce d'identité officielle.",
      "Évitez le sport très intense juste avant le don.",
    ],
  },
  {
    phase: "Pendant le don",
    icon: Smile,
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    iconColor: "text-amber-400 bg-slate-900 border-slate-700/50",
    bullets: [
      "Signalez toute gêne : l'équipe s'arrête immédiatement.",
      "Respirez calmement, serrez la balle anti-stress proposée.",
      "Prévenez si vous appréhendez les aiguilles : l'équipe s'adapte.",
      "Détendez-vous, la piqûre ne dure qu'une fraction de seconde.",
    ],
  },
  {
    phase: "Après le don",
    icon: Utensils,
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    iconColor: "text-emerald-400 bg-slate-900 border-slate-700/50",
    bullets: [
      "Prenez la collation offerte, même sans sensation de faim.",
      "Buvez régulièrement de l'eau pendant les 24 heures suivantes.",
      "Évitez le sport intense le jour même.",
      "Conservez le pansement pendant au moins 4 heures.",
    ],
  },
];

export default function ProcessAndPrep() {
  const [sectionRef, inView] = useInView({ threshold: 0.1 });
  const [activeStepModal, setActiveStepModal] = useState(null);
  const [activePrepTab, setActivePrepTab] = useState(0);

  return (
    <section
      ref={sectionRef}
      id="deroulement"
      className="py-16 sm:py-24 bg-[#FDFBF7] dark:bg-slate-950 border-t border-neutral-200/80 dark:border-slate-800 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        {/* En-tête de section */}
        <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto mb-12 sm:mb-16 gap-3">
          <span className="inline-block text-sm font-bold tracking-widest uppercase text-primary-700 dark:text-primary-400 py-1">
            Déroulement et préparation
          </span>
          <span className="bg-primary-100/70 dark:bg-primary-950/60 w-10 border border-primary-200/80 dark:border-primary-800 rounded-full px-1 py-0.5 mb-2" />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight leading-tight">
            45 minutes, <span className="text-primary-600 dark:text-primary-400">dont 10 de prélèvement.</span>
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            La grande majorité du temps sert à vous accueillir, vous écouter et vous remettre d'aplomb. Voici exactement ce qui vous attend étape par étape.
          </p>
        </div>

        {/* Timeline des 4 étapes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 sm:mb-20">
          {STEPS.map(
            ({ num, duration, title, description, icon: Icon, highlight, details }, idx) => (
              <div
                key={num}
                onClick={() => setActiveStepModal({ num, duration, title, description, Icon, details })}
                style={{
                  transitionDelay: `${idx * 100}ms`,
                }}
                className={`group relative rounded-3xl p-6 sm:p-7 border cursor-pointer transition-all duration-500 flex flex-col justify-between hover:-translate-y-1.5 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  } ${highlight
                    ? "bg-gradient-to-b from-white via-primary-50/40 to-white dark:from-slate-800 dark:via-primary-950/20 dark:to-slate-800 border-primary-500 shadow-md ring-2 ring-primary-500/20 hover:shadow-xl hover:shadow-primary-500/10"
                    : "bg-white dark:bg-slate-800/90 border-neutral-200/80 dark:border-slate-700/80 shadow-xs hover:shadow-md hover:border-primary-300 dark:hover:border-primary-600"
                  }`}
              >
                {highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                    <HeartPulse size={12} className="animate-pulse" /> Étape clé
                  </span>
                )}

                <div>
                  <div className="flex items-center justify-between mb-5">
                    {/* Numéro d'étape */}
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center text-center font-black text-lg leading-none transition-transform group-hover:scale-105 duration-300 ${highlight
                        ? "bg-primary-600 text-white shadow-md shadow-primary-600/30"
                        : "bg-neutral-100 dark:bg-slate-700 text-neutral-800 dark:text-slate-100 group-hover:bg-primary-100 dark:group-hover:bg-primary-950 group-hover:text-primary-700 dark:group-hover:text-primary-300"
                        }`}
                    >
                      <span>{num}</span>
                    </div>
                    <span
                      className={`text-xs font-extrabold px-3 py-1 rounded-full ${highlight
                        ? "bg-primary-100 dark:bg-primary-950/80 text-primary-700 dark:text-primary-300"
                        : "bg-neutral-100 dark:bg-slate-700 text-neutral-600 dark:text-slate-300"
                        }`}
                    >
                      {duration}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 mb-2">
                    <Icon
                      size={22}
                      className={`transition-colors ${highlight ? "text-primary-600 dark:text-primary-400" : "text-neutral-500 dark:text-slate-400 group-hover:text-primary-600 dark:group-hover:text-primary-400"
                        }`}
                    />
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors">
                      {title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-slate-300 leading-relaxed mb-4">
                    {description}
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-100 dark:border-slate-700/60 flex items-center justify-between text-xs font-bold text-primary-600 dark:text-primary-400 opacity-90 group-hover:opacity-100">
                  <span>En savoir plus</span>
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            )
          )}
        </div>

        {/* CARD CONSEILS PRATIQUES - Harmonisé en Dark Slate #0B1528 */}
        <div
          className={`relative bg-[#0B1528] text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl overflow-hidden transition-all duration-700 ${inView ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
        >
          <div className="flex items-center justify-between flex-wrap gap-4 mb-8 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-600/20 border border-primary-500/40 flex items-center justify-center text-primary-400 shadow-md">
                <Sparkles size={20} />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  Conseils pratiques pour réussir son don
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Recommandations essentielles pour une expérience sereine
                </p>
              </div>
            </div>

            <span className="text-xs font-black uppercase tracking-widest text-primary-300 bg-primary-950/60 border border-primary-800/60 px-3.5 py-1.5 rounded-full shadow-inner">
              💡 Recommandations EFS & ANTS
            </span>
          </div>

          {/* Onglets Mobiles */}
          <div className="md:hidden flex rounded-2xl bg-slate-900 p-1.5 border border-slate-800 mb-6 relative z-10">
            {PREPARATION_CARDS.map(({ phase }, idx) => (
              <button
                key={phase}
                type="button"
                onClick={() => setActivePrepTab(idx)}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all text-center ${activePrepTab === idx
                    ? "bg-primary-600 text-white shadow-md font-extrabold"
                    : "text-slate-400 hover:text-white"
                  }`}
              >
                {phase.replace(" le don", "")}
              </button>
            ))}
          </div>

          {/* Affichage des cartes */}
          <div className="relative z-10">
            {/* Version Mobile */}
            <div className="block md:hidden">
              {(() => {
                const { phase, icon: Icon, badgeColor, iconColor, bullets } = PREPARATION_CARDS[activePrepTab];
                return (
                  <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-xl border ${iconColor}`}>
                          <Icon size={20} />
                        </div>
                        <h4 className="text-lg font-bold text-white">{phase}</h4>
                      </div>
                      <span className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full border ${badgeColor}`}>
                        Conseils
                      </span>
                    </div>

                    <ul className="space-y-3">
                      {bullets.map((bullet, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                          <div className="w-5 h-5 rounded-full bg-emerald-950/80 border border-emerald-600/60 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check size={13} className="text-emerald-400" />
                          </div>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })()}
            </div>

            {/* Version Desktop */}
            <div className="hidden md:grid md:grid-cols-3 gap-6">
              {PREPARATION_CARDS.map(({ phase, icon: Icon, badgeColor, iconColor, bullets }) => (
                <div
                  key={phase}
                  className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800 hover:border-slate-700 transition-all duration-300 space-y-4 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-xl border ${iconColor} transition-transform group-hover:scale-105 duration-300`}>
                        <Icon size={20} />
                      </div>
                      <h4 className="text-lg font-bold text-white">
                        {phase}
                      </h4>
                    </div>
                    <span className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full border ${badgeColor}`}>
                      Conseils
                    </span>
                  </div>

                  <ul className="space-y-3">
                    {bullets.map((bullet, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed"
                      >
                        <div className="w-5 h-5 rounded-full bg-emerald-950/80 border border-emerald-600/60 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check size={13} className="text-emerald-400" />
                        </div>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800 flex items-center gap-2.5 text-xs text-slate-400 italic justify-center sm:justify-start relative z-10">
            <Info size={16} className="text-primary-400 flex-shrink-0" />
            <span>Un donneur bien hydraté et reposé garantit une expérience 100% sereine et un don rapide !</span>
          </div>
        </div>
      </div>

      {/* Modal d'étape */}
      {activeStepModal && (
        <div
          className="fixed inset-0 z-50 bg-neutral-950/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in"
          onClick={() => setActiveStepModal(null)}
        >
          <div
            className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl border border-neutral-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-primary-600 p-6 text-white relative">
              <button
                onClick={() => setActiveStepModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
                aria-label="Fermer"
              >
                <X size={20} />
              </button>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-white/20 font-extrabold text-xs text-white uppercase tracking-wider">
                  Étape {activeStepModal.num}
                </span>

                <span className="text-xs font-bold uppercase tracking-wider text-primary-100 bg-white/10 px-2.5 py-0.5 rounded-full">
                  Durée : {activeStepModal.duration}
                </span>
              </div>
              <h3 className="text-2xl font-extrabold">{activeStepModal.title}</h3>
            </div>

            <div className="p-6 sm:p-8 space-y-4">
              <p className="text-sm text-neutral-700 leading-relaxed font-medium">
                {activeStepModal.description}
              </p>

              <div className="pt-3">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-neutral-500 mb-3 flex items-center gap-1.5">
                  <ShieldCheck size={16} className="text-primary-600" />
                  Détails & Garanties de cette étape :
                </h4>
                <ul className="space-y-2.5">
                  {activeStepModal.details.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700">
                      <div className="w-5 h-5 rounded-full bg-primary-50 border border-primary-200 flex items-center justify-center text-primary-600 flex-shrink-0 mt-0.5">
                        <Check size={13} />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setActiveStepModal(null)}
                  className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md shadow-rose-600/20 transition-colors cursor-pointer"
                >
                  Compris, fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
