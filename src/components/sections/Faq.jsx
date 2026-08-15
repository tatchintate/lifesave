import React, { useState, useMemo } from "react";
import {
  ChevronDown,
  HelpCircle,
  ShieldCheck,
  Search,
  CheckCircle2,
  XCircle,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import { useInView } from "../../hooks/useInView";

const FAQ_ITEMS = [
  {
    id: "douleur",
    question: "Est-ce que le don de sang fait mal ?",
    isMyth: true,
    mythStatement: "Le don de sang est une procédure très douloureuse.",
    truthStatement: "La piqûre ressemble à une légère égratignure d'une seconde. La grande majorité des donneurs ne ressentent aucune douleur pendant le prélèvement.",
    answer:
      "La piqûre de l'aiguille est très rapide et comparée à un pincement léger. L'équipe médicale veille à votre confort à chaque étape.",
    category: "Prélèvement & Sécurité",
    tag: "Douleur",
  },
  {
    id: "maladie",
    question: "Y a-t-il un risque de contracter une maladie en donnant ?",
    isMyth: true,
    mythStatement: "On peut attraper une infection ou un virus lors d'un don.",
    truthStatement: "C'est absolument impossible. Tout le matériel est 100% stérile, à usage unique et jeté immédiatement.",
    answer:
      "Le matériel de prélèvement (aiguilles, tubes, poches) est déballé devant vous, strictement stérile et utilisé une seule fois.",
    category: "Prélèvement & Sécurité",
    tag: "Sécurité",
  },
  {
    id: "substitut",
    question: "Existe-t-il un sang artificiel pour remplacer le don ?",
    isMyth: true,
    mythStatement: "La science sait fabriquer du sang synthétique.",
    truthStatement: "Aucun produit artificiel ne peut remplacer le sang humain. Les malades dépendent exclusivement des donneurs.",
    answer:
      "La médecine ne sait pas fabriquer du sang. Le don de sang généreux et régulier reste la seule source de vie pour des milliers de patients.",
    category: "Idées reçues",
    tag: "Science",
  },
  {
    id: "fatigue",
    question: "Le don de sang rend-il faible pendant plusieurs jours ?",
    isMyth: true,
    mythStatement: "On met des semaines à se remettre d'un don.",
    truthStatement: "Le volume liquide prélevé est entièrement réapprovisionné par le corps en 24h à 48h.",
    answer:
      "En buvant beaucoup d'eau après le don et en profitant de la collation offerte sur place, vous pouvez reprendre une vie normale dès le lendemain.",
    category: "Récupération",
    tag: "Récupération",
  },
  {
    id: "tatouage",
    question: "Puis-je donner si je suis tatoué(e) ou percé(e) ?",
    isMyth: false,
    answer:
      "Oui ! Vous pouvez donner votre sang dès lors qu'un délai de 4 mois s'est écoulé depuis votre dernier tatouage, piercing ou maquillage permanent.",
    category: "Éligibilité & Santé",
    tag: "Tatouage & Piercing",
  },
  {
    id: "sport",
    question: "Puis-je faire du sport intense juste après un don ?",
    isMyth: false,
    answer:
      "Il est recommandé d'éviter tout effort physique intense ou sport de compétition le jour même du don, le temps que l'organisme régule son volume sanguin.",
    category: "Récupération",
    tag: "Sport",
  },
  {
    id: "paludisme",
    question: "Puis-je donner si j'ai eu le paludisme récemment ?",
    isMyth: false,
    answer:
      "Après la guérison complète d'un accès palustre, un délai d'attente de 4 mois est requis avant d'effectuer un nouveau don de sang par mesure de sécurité.",
    category: "Éligibilité & Santé",
    tag: "Paludisme",
  },
  {
    id: "duree",
    question: "Combien de temps dure réellement un don de sang ?",
    isMyth: false,
    answer:
      "Le prélèvement lui-même dure seulement entre 8 et 10 minutes. L'expérience globale (accueil, entretien médical, prélèvement et collation) prend environ 45 minutes.",
    category: "Prélèvement & Sécurité",
    tag: "Durée",
  },
  {
    id: "frequence",
    question: "Combien de fois par an puis-je donner mon sang ?",
    isMyth: false,
    answer:
      "Un homme peut donner du sang total jusqu'à 6 fois par an, et une femme jusqu'à 4 fois par an, en respectant au moins 8 semaines entre deux dons.",
    category: "Éligibilité & Santé",
    tag: "Fréquence",
  },
];

const CATEGORIES = [
  "Tous",
  "💡 Idées reçues",
  "🩺 Éligibilité & Santé",
  "💉 Prélèvement & Sécurité",
  "🍎 Récupération",
];

export default function Faq() {
  const [sectionRef, inView] = useInView({ threshold: 0.1 });
  const [openIndex, setOpenIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Tous");

  const filteredFaqs = useMemo(() => {
    return FAQ_ITEMS.filter((item) => {
      // Category filter
      if (activeCategory === "💡 Idées reçues" && !item.isMyth) return false;
      if (
        activeCategory !== "Tous" &&
        activeCategory !== "💡 Idées reçues" &&
        item.category !== activeCategory.replace(/^[^\s]+\s*/, "")
      ) {
        return false;
      }

      // Search filter
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        (item.mythStatement && item.mythStatement.toLowerCase().includes(q)) ||
        (item.truthStatement && item.truthStatement.toLowerCase().includes(q)) ||
        item.tag.toLowerCase().includes(q)
      );
    });
  }, [searchQuery, activeCategory]);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="py-20 bg-gradient-to-b from-surface/40 via-white to-surface/30 border-t border-neutral-200/60"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* En-tête de section */}
        <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto mb-12 gap-8">
          <div>
            <span className="inline-block text-xs sm:text-sm font-bold tracking-widest uppercase text-primary-700 py-1">
              Foire aux Questions & Idées reçues
            </span>
          </div>

          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 lg:max-w-7xl mx-auto tracking-tight leading-tight mb-4">
              Toutes les réponses à <span className="text-rose-600">vos interrogations.</span>
            </h2>
            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
              Nous déconstruisons les idées reçues et fausses croyances pour vous permettre de donner votre sang en toute confiance.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-1">
          {/* Barre de recherche et Filtres par catégories */}
          <div className="mb-10 space-y-4">
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher une question (ex: tatouage, douleur, sport, durée...)"
                className="w-full pl-11 pr-4 py-3 bg-white rounded-2xl border border-neutral-200 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 shadow-sm transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-neutral-400 hover:text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-full px-2 py-1 transition-colors"
                >
                  Effacer
                </button>
              )}
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setOpenIndex(0);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${activeCategory === cat
                    ? "bg-primary-600 text-white shadow-md shadow-primary-600/20 scale-[1.02]"
                    : "bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200/80"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Liste des Accordéons */}
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-3xl border border-neutral-200 p-8 shadow-sm">
              <AlertCircle className="mx-auto text-neutral-400 mb-3" size={36} />
              <p className="text-base font-bold text-neutral-800">Aucune question ne correspond à votre recherche.</p>
              <p className="text-xs text-neutral-500 mt-1">Essayez un autre mot-clé ou réinitialisez les filtres.</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("Tous");
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-primary-50 text-primary-700 text-xs font-bold hover:bg-primary-100 transition-colors"
              >
                Voir toutes les questions
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFaqs.map((item, index) => {
                const isOpen = openIndex === index;

                return (
                  <div
                    key={item.id}
                    style={{ transitionDelay: `${index * 50}ms` }}
                    className={`bg-white rounded-3xl border transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                      } ${isOpen
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
                          className={`w-9 h-9 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors ${isOpen
                            ? "bg-primary-600 text-white shadow-md shadow-primary-600/30"
                            : item.isMyth
                              ? "bg-amber-100 text-amber-700"
                              : "bg-primary-50 text-primary-600"
                            }`}
                        >
                          {item.isMyth ? <Sparkles size={18} /> : <HelpCircle size={18} />}
                        </div>
                        <span className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3">
                          <span>{item.question}</span>
                          {item.isMyth && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full w-fit">
                              Idée reçue
                            </span>
                          )}
                        </span>
                      </span>

                      <div className="flex items-center gap-3">
                        <span className="hidden sm:inline-block text-[11px] font-extrabold uppercase tracking-wider text-primary-700 bg-primary-50 border border-primary-100 px-2.5 py-0.5 rounded-full">
                          {item.tag}
                        </span>
                        <ChevronDown
                          size={20}
                          className={`text-neutral-400 flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-primary-600" : ""
                            }`}
                        />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-5 sm:px-6 pb-6 pt-0 text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 animate-fade-in">
                        {item.isMyth && item.mythStatement && item.truthStatement ? (
                          <div className="mt-4 space-y-3">
                            <div className="flex items-start gap-3 bg-red-50/70 border border-red-100 p-3.5 rounded-2xl">
                              <XCircle size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
                              <div>
                                <span className="text-xs font-bold text-red-700 uppercase tracking-wider block">
                                  Faux (Idée reçue)
                                </span>
                                <p className="text-neutral-700 font-medium text-xs sm:text-sm mt-0.5">
                                  {item.mythStatement}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-start gap-3 bg-emerald-50/70 border border-emerald-100 p-3.5 rounded-2xl">
                              <CheckCircle2 size={18} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                              <div>
                                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
                                  En réalité
                                </span>
                                <p className="text-neutral-800 font-semibold text-xs sm:text-sm mt-0.5">
                                  {item.truthStatement}
                                </p>
                              </div>
                            </div>

                            <div className="pt-2 flex items-start gap-3 bg-neutral-50 p-4 rounded-2xl border border-neutral-100">
                              <ShieldCheck size={18} className="text-primary-600 flex-shrink-0 mt-0.5" />
                              <p className="text-neutral-700 font-normal leading-relaxed text-xs sm:text-sm">
                                {item.answer}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="pt-4 flex items-start gap-3 bg-neutral-50/80 p-4 rounded-2xl border border-neutral-100 mt-2">
                            <ShieldCheck size={18} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                            <p className="text-neutral-700 font-medium leading-relaxed">{item.answer}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Pied de FAQ */}
          <div className="mt-12 text-center p-6 bg-white rounded-3xl border border-neutral-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left">
              <h4 className="text-base font-extrabold text-neutral-900">
                Vous avez une autre question médicale ?
              </h4>
              <p className="text-xs text-neutral-500 mt-0.5">
                Trouvez le centre de prélèvement le plus proche pour vous renseigner directement auprès du personnel médical.
              </p>
            </div>
            <a
              href="#ou-donner"
              className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-all whitespace-nowrap"
            >
              Trouver un centre
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
