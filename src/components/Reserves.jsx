import React from "react";
import { AlertCircle } from "lucide-react";

const BLOOD_GROUPS = [
  { group: "O-", percentage: 18, status: "Critique", color: "bg-rose-600", text: "text-rose-400", bgBadge: "bg-rose-950/80 text-rose-300 border-rose-800/60" },
  { group: "O+", percentage: 41, status: "Tendu", color: "bg-amber-500", text: "text-amber-400", bgBadge: "bg-amber-950/80 text-amber-300 border-amber-800/60" },
  { group: "A-", percentage: 27, status: "Critique", color: "bg-rose-600", text: "text-rose-400", bgBadge: "bg-rose-950/80 text-rose-300 border-rose-800/60" },
  { group: "A+", percentage: 64, status: "Satisfaisant", color: "bg-emerald-500", text: "text-emerald-400", bgBadge: "bg-emerald-950/80 text-emerald-300 border-emerald-800/60" },
  { group: "B-", percentage: 22, status: "Critique", color: "bg-rose-600", text: "text-rose-400", bgBadge: "bg-rose-950/80 text-rose-300 border-rose-800/60" },
  { group: "B+", percentage: 58, status: "Satisfaisant", color: "bg-emerald-500", text: "text-emerald-400", bgBadge: "bg-emerald-950/80 text-emerald-300 border-emerald-800/60" },
  { group: "AB-", percentage: 35, status: "Tendu", color: "bg-amber-500", text: "text-amber-400", bgBadge: "bg-amber-950/80 text-amber-300 border-amber-800/60" },
  { group: "AB+", percentage: 72, status: "Satisfaisant", color: "bg-emerald-500", text: "text-emerald-400", bgBadge: "bg-emerald-950/80 text-emerald-300 border-emerald-800/60" },
];

export default function Reserves() {
  return (
    <section id="reserves" className="py-20 bg-neutral-950 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* En-tête de section */}
        <div className="max-w-3xl mb-14">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-rose-400 bg-rose-950/80 border border-rose-800/60 rounded-full px-3.5 py-1 mb-4">
            C7 · État des réserves
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Les besoins <span className="text-primary-400">du moment</span>
          </h2>
          <p className="text-base sm:text-lg text-neutral-400 leading-relaxed">
            Les groupes rares et les donneurs universels (O-) manquent presque toujours. Si votre groupe est en rouge, votre don a un impact immédiat.
          </p>
        </div>

        {/* Grille des 8 groupes sanguins avec jauges visuelles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {BLOOD_GROUPS.map(({ group, percentage, status, color, text, bgBadge }) => (
            <div
              key={group}
              className="bg-neutral-900/90 rounded-3xl p-5 border border-neutral-800 hover:border-neutral-700 transition-all duration-300 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-black text-white">{group}</span>
                  <span className="text-xs font-bold text-neutral-400">{percentage}%</span>
                </div>

                {/* Jauge de progression */}
                <div className="w-full bg-neutral-800 rounded-full h-2 overflow-hidden mb-4">
                  <div
                    className={`h-full rounded-full ${color} transition-all duration-1000 ease-out`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>

              {/* Badge d'état */}
              <div>
                <span className={`inline-block text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full border ${bgBadge}`}>
                  {status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Note informative institutionnelle */}
        <div className="flex items-start gap-3 text-xs text-neutral-500 border-t border-neutral-800/80 pt-6">
          <AlertCircle size={16} className="text-neutral-500 flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Données illustratives fournies dans le cadre du challenge, mises à jour manuellement. Elles ne remplacent pas les communications officielles des établissements de transfusion.
          </p>
        </div>

      </div>

      {/* Arrière-plan rouge profond lumineux */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary-900/10 rounded-full blur-3xl pointer-events-none -z-0" />
    </section>
  );
}
