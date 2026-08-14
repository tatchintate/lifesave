import { FileText, Stethoscope, Droplet, Coffee, Droplets, Smile, Utensils, Check } from "lucide-react";


const STEPS = [
  {
    num: "1",
    duration: "5 MIN",
    title: "Accueil et questionnaire",
    description: "Vous présentez une pièce d'identité et remplissez un questionnaire de santé confidentiel pour préparer l'entretien.",
    icon: FileText,
  },
  {
    num: "2",
    duration: "10 MIN",
    title: "Entretien médical",
    description: "Un professionnel de santé vérifie votre tension, votre taux d'hémoglobine et valide votre aptitude. Tout se dit en tête-à-tête.",
    icon: Stethoscope,
  },
  {
    num: "3",
    duration: "8 À 10 MIN",
    title: "Le prélèvement",
    description: "Allongé confortablement, une seule piqûre au pli du coude. Environ 450 ml prélevés avec du matériel stérile et à usage unique.",
    icon: Droplet,
    highlight: true,
  },
  {
    num: "4",
    duration: "20 MIN",
    title: "Collation et repos",
    description: "Vous restez assis, on vous offre à boire et à manger. C'est ce moment convivial obligatoire qui évite tout malaise.",
    icon: Coffee,
  },
];

const PREPARATION_CARDS = [
  {
    phase: "Avant",
    icon: Droplets,
    color: "text-secondary-600 bg-secondary-50 border-secondary-200",

    bullets: [
      "Mangez dans les 3 heures qui précèdent — jamais à jeun.",
      "Buvez 500 ml d'eau de plus que d'habitude.",
      "Munissez-vous d'une pièce d'identité officielle.",
      "Évitez le sport très intense juste avant le don.",
    ],
  },
  {
    phase: "Pendant",
    icon: Smile,
    color: "text-amber-600 bg-amber-50 border-amber-200",
    bullets: [
      "Signalez toute gêne : l'équipe s'arrête immédiatement.",
      "Respirez calmement, serrez la balle anti-stress proposée.",
      "Prévenez si vous appréhendez les aiguilles : l'équipe s'adapte.",
    ],
  },
  {
    phase: "Après",
    icon: Utensils,
    color: "text-emerald-600 bg-emerald-50 border-emerald-200",
    bullets: [
      "Prenez la collation offerte, même sans sensation de faim.",
      "Buvez régulièrement de l'eau pendant les 24 heures suivantes.",
      "Évitez le sport intense le jour même.",
      "Conservez le pansement pendant au moins 4 heures.",
    ],
  },
];

export default function ProcessAndPrep() {
  return (
    <section id="deroulement" className="py-20 bg-surface/40 border-t border-neutral-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* En-tête de section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-primary-700 bg-primary-100/70 border border-primary-200/80 rounded-full px-3.5 py-1 mb-4">
            C4 · C5 — Déroulement et préparation
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight mb-4">
            45 minutes, dont <span className="text-primary-700">10 de prélèvement.</span>
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
            La grande majorité du temps sert à vous accueillir, vous écouter et vous remettre d'aplomb. Voici exactement ce qui vous attend étape par étape.
          </p>
        </div>

        {/* Timeline horizontale 4 étapes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 relative">
          {STEPS.map(({ num, duration, title, description, icon: Icon, highlight }, idx) => (
            <div
              key={num}
              className={`relative bg-white rounded-3xl p-6 sm:p-7 border transition-all duration-300 flex flex-col justify-between ${
                highlight
                  ? "border-primary-500 shadow-lg ring-1 ring-primary-500/20"
                  : "border-neutral-200/80 shadow-sm hover:shadow-md"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg ${
                    highlight ? "bg-primary-600 text-white" : "bg-neutral-100 text-neutral-800"
                  }`}>
                    {num}
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    highlight ? "bg-primary-100 text-primary-700 font-extrabold" : "bg-neutral-100 text-neutral-600"
                  }`}>
                    {duration}
                  </span>
                </div>

                <div className="flex items-center gap-2.5 mb-2">
                  <Icon size={20} className={highlight ? "text-primary-600" : "text-neutral-500"} />
                  <h3 className="text-lg font-bold text-neutral-900">
                    {title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Conseils de préparation (Avant / Pendant / Après) */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-neutral-200/80 shadow-sm">
          <h3 className="text-xl font-bold text-neutral-900 mb-8 text-center sm:text-left">
            Conseils pratiques pour réussir son don
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PREPARATION_CARDS.map(({ phase, icon: Icon, color, bullets }) => (
              <div key={phase} className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl border ${color}`}>
                    <Icon size={20} />
                  </div>
                  <h4 className="text-lg font-extrabold text-neutral-900">
                    {phase}
                  </h4>
                </div>
                <ul className="space-y-2.5">
                  {bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-600 leading-relaxed">
                      <Check size={16} className="text-primary-600 flex-shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
