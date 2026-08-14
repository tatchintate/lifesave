import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const FAQ_ITEMS = [
  {
    question: "Est-ce que ça fait mal ?",
    answer: "La piqûre ressemble à une légère égratignure et ne dure qu'une fraction de seconde. La grande majorité des donneurs ne ressentent aucune douleur pendant le prélèvement.",
  },
  {
    question: "Puis-je donner si je suis tatoué(e) ou percé(e) ?",
    answer: "Oui ! Vous pouvez parfaitement donner votre sang à condition d'attendre un délai de 4 mois après la réalisation de votre dernier tatouage ou piercing.",
  },
  {
    question: "Puis-je reprendre le sport après un don ?",
    answer: "Il est fortement conseillé d'attendre 24 à 48 heures avant de reprendre une activité sportive intense ou de porter des charges lourdes pour éviter les hématomes ou malaises.",
  },
  {
    question: "Y a-t-il un risque de contracter une maladie lors du don ?",
    answer: "Absolument aucun. Le matériel utilisé (aiguilles, poches, tubes) est strictement stérile, à usage unique et jeté immédiatement après le prélèvement.",
  },
  {
    question: "Combien de temps dure l'effet de fatigue ?",
    answer: "Le corps reconstitue le volume sanguin prélevé en seulement 24 à 48 heures. En buvant abondamment et en prenant la collation offerte, vous vous sentez en pleine forme très rapidement.",
  },
  {
    question: "Puis-je donner si j'ai eu le paludisme récemment ?",
    answer: "Après la guérison complète d'un accès palustre, un délai de prévenance (généralement 4 mois) est requis avant de pouvoir donner son sang total.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-surface/40 border-t border-neutral-200/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* En-tête de section */}
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-primary-700 bg-primary-100/70 border border-primary-200/80 rounded-full px-3.5 py-1 mb-4">
            C8 — FAQ & Idées reçues
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight mb-4">
            Questions <span className="text-primary-700">fréquentes</span>
          </h2>
          <p className="text-base text-neutral-600 leading-relaxed max-w-xl mx-auto">
            Nous déconstruisons les fausses idées pour vous permettre de donner votre sang en toute sérénité.
          </p>
        </div>

        {/* Liste des Accordéons */}
        <div className="space-y-4">
          {FAQ_ITEMS.map(({ question, answer }, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={question}
                className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm overflow-hidden transition-all duration-300"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-neutral-900 text-base sm:text-lg hover:text-primary-700 transition-colors cursor-pointer select-none"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle size={20} className="text-primary-600 flex-shrink-0" />
                    <span>{question}</span>
                  </span>
                  <ChevronDown
                    size={20}
                    className={`text-neutral-500 flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-primary-600" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-0 text-xs sm:text-sm text-neutral-600 leading-relaxed animate-fade-up border-t border-neutral-100 mt-2">
                    <p className="pt-3">{answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
