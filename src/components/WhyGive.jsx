import React from "react";
import { Ambulance, Baby, HeartPulse, Hourglass, Users, Clock, CalendarDays } from "lucide-react";

const REASONS = [
  {
    icon: Ambulance,
    title: "Urgences et accidents",
    description: "Hémorragies massives : plusieurs poches peuvent être nécessaires en quelques minutes lors d'accidents ou d'opérations.",
    color: "bg-red-50 text-red-600 border-red-100",
  },
  {
    icon: Baby,
    title: "Maternité et enfance",
    description: "Accouchements compliqués et anémies sévères chez l'enfant, notamment liées au paludisme ou aux complications néonatales.",
    color: "bg-amber-50 text-amber-600 border-amber-100",
  },
  {
    icon: HeartPulse,
    title: "Maladies chroniques",
    description: "Drépanocytose, cancers, dialyses : des transfusions régulières et vitales tout au long de l'année.",
    color: "bg-rose-50 text-rose-600 border-rose-100",
  },
  {
    icon: Hourglass,
    title: "Un produit périssable",
    description: "Les plaquettes se conservent 7 jours, les globules rouges 42 jours. Le stock doit se reconstituer en continu.",
    color: "bg-indigo-50 text-indigo-600 border-indigo-100",
  },
];

const STATS = [
  {
    value: "3 patients",
    label: "aidés au maximum par un seul don de sang total",
    icon: Users,
  },
  {
    value: "8 à 10 min",
    label: "le temps du prélèvement lui-même",
    icon: Clock,
  },
  {
    value: "7 jours",
    label: "la durée de vie d'une poche de plaquettes",
    icon: CalendarDays,
  },
];

export default function WhyGive() {
  return (
    <section id="pourquoi" className="py-20 bg-surface/40 border-t border-neutral-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* En-tête de section avec typographie éditoriale */}
        <div className="max-w-3xl mb-14">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-primary-700 bg-primary-100/70 border border-primary-200/80 rounded-full px-3.5 py-1 mb-4">
            Pourquoi donner ??
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight mb-4">
            Le sang ne se fabrique pas. <br className="hidden sm:inline" />
            <span className="text-primary-700">Il se donne.</span>
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
            Aucun laboratoire ne sait produire du sang humain. Chaque poche transfusée vient d'une personne qui a pris 45 minutes de sa journée. C'est le seul circuit d'approvisionnement qui existe.
          </p>
        </div>

        {/* Grille de 4 cartes d'enjeux */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {REASONS.map(({ icon: Icon, title, description, color }) => (
            <div
              key={title}
              className="group bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center mb-5 ${color} transition-transform group-hover:scale-110 duration-300`}>
                  <Icon size={24} />
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2.5 group-hover:text-primary-700 transition-colors">
                  {title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bandeau des 3 chiffres clés (Design Sombre & Élégant) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {STATS.map(({ value, label, icon: Icon }) => (
            <div
              key={value}
              className="bg-neutral-900 text-white rounded-2xl p-6 sm:p-7 flex items-center gap-5 shadow-lg border border-neutral-800 hover:border-neutral-700 transition-all"
            >
              <div className="p-3.5 rounded-2xl bg-white/10 text-primary-400 flex-shrink-0">
                <Icon size={28} />
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black tracking-tight text-white block mb-0.5">
                  {value}
                </span>
                <p className="text-xs sm:text-sm text-neutral-400 font-medium leading-snug">
                  {label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
