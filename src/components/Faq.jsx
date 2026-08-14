import React, { useState } from "react";
import { ChevronDown, HelpCircle, Sparkles, CheckCircle2, ShieldCheck } from "lucide-react";
import { useInView } from "../hooks/useInView";

const FAQ_ITEMS = [
  {
    question: "Est-ce que le don de sang fait mal ?",
    answer:
      "La piqûre ressemble à une légère égratignure d'une fraction de seconde. La grande majorité des donneurs confirment ne ressentir aucune douleur durant le prélèvement. L'équipe médicale veille à votre confort absolu à chaque instant.",
    category: "Déroulement",
  },
  {
    question: "Puis-je donner si je suis tatoué(e) ou percé(e) ?",
    answer:
      "Oui ! Vous pouvez donner votre sang dès lors qu'un délai de 4 mois s'est écoulé depuis votre dernier tatouage, piercing ou maquillage permanent.",
    category: "Éligibilité",
  },
  {
    question: "Puis-je reprendre le sport après un don ?",
    answer:
      "Il est recommandé d'éviter toute activité sportive intense le jour même du don pour permettre à votre organisme de reconstituer sereinement son volume sanguin.",
    category: "Après-don",
  },
  {
    question: "Y a-t-il un risque d'infection ou de maladie ?",
    answer:
      "Absolument aucun. Tout le matériel utilisé (aiguilles, poches, tuyaux) est strictement stérile, à usage unique et jeté immédiatement après le prélèvement.",
    category: "Sécurité",
  },
  {
    question: "Combien de temps faut-il pour se remettre d'un don ?",
    answer:
      "Le volume liquide prélevé (450 ml) est reconstitué par l'organisme en seulement 24 à 48 heures. En buvant abondamment et en prenant la collation offerte, vous êtes en pleine forme en quelques minutes !",
    category: "Récupération",
  },
  {
    question: "Puis-je donner si j'ai eu le paludisme récemment ?",
    answer:
      "Après la guérison totale d'un accès palustre, un délai de prévenance de 4 mois est généralement requis avant de pouvoir réaliser un nouveau don de sang.",
    category: "Santé",
  },
];

export default function Faq() {
  const [sectionRef, inView] = useInView({ threshold: 0.1 });
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="py-20 bg-gradient-to-b from-surface/40 via-white to-surface/30 border-t border-neutral-200/60"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* En-tête de section unifié et harmonieux */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-xs sm:text-sm font-bold tracking-widest uppercase text-primary-700 bg-primary-100/80 border border-primary-200/80 rounded-full px-4 py-1.5 mb-4 shadow-sm">
            Foire aux Questions & Idées reçues
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight mb-4">
            Toutes les réponses à <span className="text-primary-600">vos interrogations.</span>
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
            Nous déconstruisons les fausses idées et tabous pour vous permettre de donner votre sang en toute sérénité et confiance.
          </p>
        </div>

        {/* Liste des Accordéons avec animations scroll reveal */}
        <div className="space-y-4">
          {FAQ_ITEMS.map(({ question, answer, category }, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={question}
                style={{ transitionDelay: `${index * 80}ms` }}
                className={`bg-white rounded-3xl border transition-all duration-500 overflow-hidden shadow-sm hover:shadow-md ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                } ${
                  isOpen
                    ? "border-primary-400 shadow-md ring-2 ring-primary-500/10"
                    : "border-neutral-200/80"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-neutral-900 text-base sm:text-lg hover:text-primary-700 transition-colors cursor-pointer select-none"
                >
                  <span className="flex items-center gap-3.5">
                    <div
                      className={`w-9 h-9 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors ${
                        isOpen
                          ? "bg-primary-600 text-white shadow-md shadow-primary-600/30"
                          : "bg-primary-50 text-primary-600"
                      }`}
                    >
                      <HelpCircle size={18} />
                    </div>
                    <span>{question}</span>
                  </span>

                  <div className="flex items-center gap-3">
                    <span className="hidden sm:inline-block text-[11px] font-extrabold uppercase tracking-wider text-primary-700 bg-primary-50 border border-primary-100 px-2.5 py-0.5 rounded-full">
                      {category}
                    </span>
                    <ChevronDown
                      size={20}
                      className={`text-neutral-400 flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-primary-600" : ""
                      }`}
                    />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-0 text-sm text-neutral-600 leading-relaxed animate-fade-in border-t border-neutral-100">
                    <div className="pt-4 flex items-start gap-3 bg-neutral-50/80 p-4 rounded-2xl border border-neutral-100 mt-2">
                      <ShieldCheck size={18} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                      <p className="text-neutral-700 font-medium">{answer}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Pied de FAQ : Besoin d'aide supplémentaire */}
        <div className="mt-12 text-center p-6 bg-white rounded-3xl border border-neutral-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-base font-extrabold text-neutral-900">
              Vous avez d'autres questions médicales ?
            </h4>
            <p className="text-xs text-neutral-500 mt-0.5">
              Contactez directement nos équipes de transfusion ou passez dans le centre le plus proche.
            </p>
          </div>
          <a
            href="#ou-donner"
            className="px-5 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs shadow-md transition-all whitespace-nowrap"
          >
            Trouver un centre
          </a>
        </div>
      </div>
    </section>
  );
}
