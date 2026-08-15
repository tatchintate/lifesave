import React, { useState } from "react";
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
import { useInView } from "../hooks/useInView";

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
      "Toutes les informations soumises sont strictement confidentielles.",
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
    iconColor: "text-blue-400 bg-blue-950/80 border-blue-700/50",
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
    iconColor: "text-amber-400 bg-amber-950/80 border-amber-700/50",
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
    iconColor: "text-emerald-400 bg-emerald-950/80 border-emerald-700/50",
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

  return (
    <section
      ref={sectionRef}
      id="deroulement"
      className="py-20 bg-gradient-to-b from-surface/40 via-white to-surface/30 border-t border-neutral-200/60 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        {/* En-tête de section centré et aligné */}
        <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto mb-12 sm:mb-16 gap-8">
          <div>
            <span className="inline-block text-xs sm:text-sm font-bold tracking-widest uppercase text-primary-700 py-1">
              Déroulement et préparation
            </span>
          </div>
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight mb-4">
              45 minutes, <span className="text-primary-600">dont 10 de prélèvement.</span>
            </h2>
            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
              La grande majorité du temps sert à vous accueillir, vous écouter et vous remettre d'aplomb. Voici exactement ce qui vous attend étape par étape.
            </p>
          </div>


        </div>

        {/* Timeline des 4 étapes avec modale interactive */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 sm:mb-20">
          {STEPS.map(
            ({ num, duration, title, description, icon: Icon, highlight, details }, idx) => (
              <div
                key={num}
                onClick={() => setActiveStepModal({ num, duration, title, description, Icon, details })}
                style={{
                  transitionDelay: `${idx * 120}ms`,
                }}
                className={`group relative rounded-3xl p-6 sm:p-7 border cursor-pointer transition-all duration-500 flex flex-col justify-between hover:-translate-y-2 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  } ${highlight
                    ? "bg-gradient-to-b from-white via-primary-50/30 to-white border-primary-500 shadow-xl ring-2 ring-primary-500/20 hover:shadow-2xl hover:shadow-primary-500/20"
                    : "bg-white border-neutral-200/80 shadow-sm hover:shadow-xl hover:border-primary-300"
                  }`}
              >
                {/* Badge d'étape mise en avant */}
                {highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                    <HeartPulse size={12} className="animate-pulse" /> Étape clé
                  </span>
                )}

                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg transition-transform group-hover:scale-110 duration-300 ${highlight
                        ? "bg-primary-600 text-white shadow-md shadow-primary-600/30"
                        : "bg-neutral-100 text-neutral-800 group-hover:bg-primary-100 group-hover:text-primary-700"
                        }`}
                    >
                      {num}
                    </div>
                    <span
                      className={`text-xs font-extrabold px-3 py-1 rounded-full ${highlight
                        ? "bg-primary-100 text-primary-700"
                        : "bg-neutral-100 text-neutral-600"
                        }`}
                    >
                      {duration}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 mb-2">
                    <Icon
                      size={22}
                      className={`transition-colors ${highlight ? "text-primary-600" : "text-neutral-500 group-hover:text-primary-600"
                        }`}
                    />
                    <h3 className="text-lg font-bold text-neutral-900 group-hover:text-primary-700 transition-colors">
                      {title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-4">
                    {description}
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs font-bold text-primary-600 opacity-90 group-hover:opacity-100">
                  <span>En savoir plus</span>
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            )
          )}
        </div>

        {/* CARD CONSEILS PRATIQUES */}
        <div
          className={`relative bg-[#1A1817] text-white rounded-3xl p-6 sm:p-10 border border-neutral-800 shadow-2xl overflow-hidden transition-all duration-700 ${inView ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
        >
          {/* Effet d'arrière-plan avec halo lumineux rouge */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-primary-600/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Badge Supérieur */}
          <div className="flex items-center justify-between flex-wrap gap-4 mb-8 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-600/30 border border-primary-500/50 flex items-center justify-center text-primary-400 shadow-md">
                <Sparkles size={20} />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  Conseils pratiques pour réussir son don
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Recommandations essentielles pour une expérience sereine
                </p>
              </div>
            </div>

            <span className="text-xs font-black uppercase tracking-widest text-primary-400 bg-primary-950/80 border border-primary-800/80 px-3.5 py-1.5 rounded-full shadow-inner">
              💡 Recommandations EFS & ANTS
            </span>
          </div>

          {/* 3 Colonnes : Avant, Pendant, Après */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {PREPARATION_CARDS.map(({ phase, icon: Icon, badgeColor, iconColor, bullets }) => (
              <div
                key={phase}
                className="bg-[#242220] rounded-2xl p-6 border border-neutral-800/90 hover:border-neutral-700 transition-all duration-300 space-y-4 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl border ${iconColor} transition-transform group-hover:scale-110 duration-300`}>
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
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300 leading-relaxed"
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

          {/* Note de bas de carte */}
          <div className="mt-8 pt-6 border-t border-neutral-800/80 flex items-center gap-2.5 text-xs text-neutral-400 italic justify-center sm:justify-start relative z-10">
            <Info size={16} className="text-primary-400 flex-shrink-0" />
            <span>Un donneur bien hydraté et reposé garantit une expérience 100% sereine et un don rapide !</span>
          </div>
        </div>
      </div>

      {/* Modal interactif pour le détail des étapes du parcours */}
      {activeStepModal && (
        <div
          className="fixed inset-0 z-50 bg-neutral-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in"
          onClick={() => setActiveStepModal(null)}
        >
          <div
            className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl border border-neutral-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-primary-700 via-primary-600 to-primary-800 p-6 text-white relative">
              <button
                onClick={() => setActiveStepModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Fermer"
              >
                <X size={20} />
              </button>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center font-extrabold text-sm text-white">
                  Étape {activeStepModal.num}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-primary-200 bg-white/10 px-2.5 py-0.5 rounded-full">
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
                      <div className="w-5 h-5 rounded-full bg-primary-100 border border-primary-200 flex items-center justify-center text-primary-700 flex-shrink-0 mt-0.5">
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
                  className="px-6 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
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

