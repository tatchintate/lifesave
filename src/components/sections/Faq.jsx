import { useState, useMemo } from "react";
import { ChevronDown, Search, AlertCircle, HelpCircle } from "lucide-react";
import { useInView } from "../../hooks/useInView";

const FAQ_ITEMS = [
  {
    id: "douleur",
    question: "Est-ce que le don de sang fait mal ?",
    answer: "Non. La piqûre ne dure qu'une seconde et ressemble à un léger pincement. L'équipe médicale vous accompagne avec douceur à chaque étape. Ces quelques secondes d'inconfort bénin permettent d'offrir toute une vie à quelqu'un.",
  },
  {
    id: "maladie",
    question: "Y a-t-il un risque de contracter une maladie en donnant mon sang ?",
    answer: "Aucun risque. Tout le matériel de prélèvement (aiguilles, tubes, poches) est neuf, 100% stérile, à usage unique et déballé directement sous vos yeux par les professionnels de santé.",
  },
  {
    id: "substitut",
    question: "Existe-t-il un sang artificiel pour remplacer les donneurs ?",
    answer: "Non. La science ne sait pas fabriquer du sang humain. Lorsqu'un enfant souffre d'une anémie sévère ou qu'une mère fait une hémorragie à l'accouchement, seul le don d'une personne solidaire peut sauver sa vie.",
  },
  {
    id: "duree",
    question: "Combien de temps faut-il consacrer pour sauver des vies ?",
    answer: "Seulement 45 minutes au total. Le prélèvement lui-même ne prend que 8 à 10 minutes. 45 minutes de votre journée peuvent offrir des dizaines d'années de vie à 3 personnes.",
  },
  {
    id: "fatigue",
    question: "Le don de sang me rendra-t-il faible les jours suivants ?",
    answer: "Non. Le volume liquide prélevé est naturellement reconstitué par votre corps en 24h à 48h. En buvant de l'eau et en profitant de la collation offerte après le don, vous pouvez reprendre toutes vos activités normales dès le lendemain.",
  },
];

export default function Faq() {
  const [sectionRef] = useInView({ threshold: 0.1 });
  const [openIndex, setOpenIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = useMemo(() => {
    if (!searchQuery.trim()) return FAQ_ITEMS;
    const q = searchQuery.toLowerCase();
    return FAQ_ITEMS.filter(
      (item) =>
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="py-16 sm:py-20 bg-[#FAF7F2] dark:bg-slate-900 border-t border-neutral-200/80 dark:border-slate-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* En-tête de section centré */}
        <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto mb-10 gap-3">
          <span className="inline-block text-xs sm:text-sm font-bold tracking-widest uppercase text-primary-700 dark:text-primary-400 py-1">
            Questions fréquentes
          </span>
          <span className="bg-primary-100/70 dark:bg-primary-950/60 w-10 border border-primary-200/80 dark:border-primary-800 rounded-full px-1 py-0.5 mb-2" />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight leading-tight">
            Tout ce que vous devez savoir pour donner <span className="text-primary-600 dark:text-primary-400">en toute confiance.</span>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Barre de recherche épurée */}
          <div className="mb-8 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-slate-500" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher une question (ex: douleur, maladie, durée...)"
              className="w-full pl-11 pr-4 py-3.5 bg-white dark:bg-slate-800 rounded-2xl border border-neutral-200/80 dark:border-slate-700 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 shadow-xs transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-neutral-400 hover:text-neutral-700 bg-neutral-100 dark:bg-slate-700 dark:text-slate-300 rounded-full px-2.5 py-1 transition-colors"
              >
                Effacer
              </button>
            )}
          </div>

          {/* Liste des 5 questions épurées */}
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-10 bg-white dark:bg-slate-800 rounded-2xl border border-neutral-200 dark:border-slate-700 p-8 shadow-xs">
              <AlertCircle className="mx-auto text-neutral-400 mb-3" size={32} />
              <p className="text-sm font-bold text-neutral-800 dark:text-slate-200">Aucune question ne correspond à votre recherche.</p>
              <button
                onClick={() => setSearchQuery("")}
                className="mt-3 px-4 py-2 rounded-xl bg-primary-50 dark:bg-primary-950/60 text-primary-700 dark:text-primary-300 text-xs font-bold hover:bg-primary-100 transition-colors"
              >
                Voir toutes les questions
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredFaqs.map((item, index) => {
                const isOpen = openIndex === index;

                return (
                  <div
                    key={item.id}
                    className={`bg-white dark:bg-slate-800 rounded-2xl border transition-all duration-300 overflow-hidden shadow-xs hover:shadow-sm ${
                      isOpen
                        ? "border-primary-400/80 dark:border-primary-500/80 shadow-sm"
                        : "border-neutral-200/80 dark:border-slate-700/80"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(index)}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-neutral-900 dark:text-white text-base sm:text-lg hover:text-primary-700 dark:hover:text-primary-400 transition-colors cursor-pointer select-none"
                    >
                      <span className="flex items-center gap-3">
                        <HelpCircle size={19} className={isOpen ? "text-primary-600 dark:text-primary-400" : "text-neutral-400 dark:text-slate-500"} />
                        <span>{item.question}</span>
                      </span>

                      <ChevronDown
                        size={19}
                        className={`text-neutral-400 dark:text-slate-400 flex-shrink-0 transition-transform duration-300 ${
                          isOpen ? "rotate-180 text-primary-600 dark:text-primary-400" : ""
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-5 sm:px-6 pb-5 pt-1 text-sm sm:text-base text-neutral-600 dark:text-slate-300 leading-relaxed border-t border-neutral-100 dark:border-slate-700/60 bg-neutral-50/50 dark:bg-slate-900/40">
                        <p className="mt-2 text-neutral-700 dark:text-slate-200 font-normal">
                          {item.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Pied de FAQ simple */}
          <div className="mt-10 text-center p-5 bg-white dark:bg-slate-800 rounded-2xl border border-neutral-200/80 dark:border-slate-700/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left">
              <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
                Une autre question ?
              </h4>
              <p className="text-xs text-neutral-500 dark:text-slate-400 mt-0.5">
                Renseignez-vous directement auprès du personnel médical dans un centre.
              </p>
            </div>
            <a
              href="#ou-donner"
              className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md shadow-rose-600/20 transition-all whitespace-nowrap"
            >
              Trouver un centre
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
