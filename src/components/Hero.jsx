import { useState } from "react";
import { Play, HeartHandshake, MapPin, Clock3, Syringe, ShieldCheck, ArrowRight } from "lucide-react";
import TypewriterText from "./TypewriterText";
import { Button } from "./ui/Button";
import useInView from "../hooks/useInView";

const INFO_CARDS = [
  {
    icon: HeartHandshake,
    label: "Suis-je éligible ?",
    description: "Un test en 30 secondes.",
    href: "#eligibilite",
  },
  {
    icon: MapPin,
    label: "Où puis-je donner ?",
    description: "8 centres, horaires en direct.",
    href: "#ou-donner",
  },
  {
    icon: Clock3,
    label: "Combien de temps ?",
    description: "45 min, étape par étape.",
    href: "#deroulement",
  },
  {
    icon: Syringe,
    label: "Est-ce douloureux ?",
    description: "Une piqûre, rien de plus.",
    href: "#faq",
  },
];

// Vidéo HUG : "Don du sang - vidéo d'information sur le déroulement d'un don"
const VIDEO_ID = "rFmuV3urCKs";
const VIDEO_TITLE = "Déroulement d'un don de sang";

function HeroVideo() {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-[16/9] sm:aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl bg-neutral-900 border border-neutral-200/80 group">
      {playing ? (
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0`}
          title={VIDEO_TITLE}
          allow="accelerate; autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="relative w-full h-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-500 cursor-pointer overflow-hidden block"
          aria-label={`Lancer la vidéo : ${VIDEO_TITLE}`}
        >
          <img
            src={`https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
            alt="Vidéo explicative sur le don de sang"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-neutral-900/35 group-hover:bg-neutral-900/25 transition-colors flex items-center justify-center">
            <span className="inline-flex items-center gap-3 rounded-full bg-white/95 backdrop-blur-md text-neutral-900 font-bold px-7 py-3.5 shadow-2xl transition-all duration-300 group-hover:scale-105 group-hover:bg-white">
              <span className="w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center shadow-md group-hover:bg-primary-700 transition-colors">
                <Play size={18} fill="currentColor" className="ml-0.5" />
              </span>
              <span className="text-sm sm:text-base font-extrabold">Voir le déroulement (3 min)</span>
            </span>
          </div>
        </button>
      )}
    </div>
  );
}

export default function Hero() {
  const [cardsRef, cardsInView] = useInView({ threshold: 0.2 });

  const scrollToSection = (href) => {
    const target = document.querySelector(href);
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section className="relative bg-gradient-to-b from-surface/80 via-surface/40 to-background pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Colonne texte (6 cols) */}
        <div className="lg:col-span-6">
          <span
            className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-primary-700 bg-primary-100/70 border border-primary-200/80 rounded-full px-3.5 py-1 mb-6 opacity-0 animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            <ShieldCheck size={14} className="text-primary-600" />
            Don de sang · Guide Officiel & Indépendant
          </span>

          <TypewriterText
            as="h1"
            text={"Avant de donner,\nsachez tout."}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-neutral-900 leading-[1.08] mb-6"
          />

          <p
            className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-xl mb-8 opacity-0 animate-fade-up"
            style={{ animationDelay: "0.8s" }}
          >
            Vous pensez au don de sang, mais vous avez des hésitations ?
            <strong> LifeSave</strong> déconstruit les idées reçues pour vous guider en toute sérénité : éligibilité, déroulement et centres de don près de chez vous.
          </p>

          {/* Boutons d'action dynamiques */}
          <div
            className="flex flex-wrap items-center gap-4 mb-10 opacity-0 animate-fade-up"
            style={{ animationDelay: "1s" }}
          >
            <Button
              variant="glow"
              size="lg"
              onClick={() => scrollToSection("#eligibilite")}
            >
              <span>Tester mon éligibilité</span>
              <ArrowRight size={18} />
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollToSection("#deroulement")}
            >
              <span>Voir le déroulement</span>
            </Button>
          </div>

          {/* Cartes d'information avec micro-interactions */}
          <div ref={cardsRef} className="grid grid-cols-2 gap-4">
            {INFO_CARDS.map(({ icon: Icon, label, description, href }, index) => (
              <div
                key={label}
                onClick={() => scrollToSection(href)}
                style={{ transitionDelay: `${index * 80}ms` }}
                className={`group flex flex-col gap-2 bg-white/90 backdrop-blur-sm rounded-2xl border border-neutral-200/70 p-4 sm:p-5 shadow-sm hover:shadow-md hover:border-primary-300 hover:-translate-y-1 transition-all duration-300 cursor-pointer ${
                  cardsInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-primary-50 text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                    <Icon size={20} />
                  </div>
                  <span className="text-sm font-bold text-neutral-900 group-hover:text-primary-700 transition-colors">
                    {label}
                  </span>
                </div>
                <p className="text-xs text-neutral-500 pl-1">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Colonne vidéo / visuelle élargie (6 cols) */}
        <div
          className="lg:col-span-6 relative opacity-0 animate-fade-up"
          style={{ animationDelay: "0.4s" }}
        >
          <HeroVideo />

          {/* Badge flottant d'impact */}
          <div className="absolute -bottom-6 -left-2 sm:left-6 max-w-[270px] rounded-2xl bg-white/95 backdrop-blur-md shadow-2xl border border-neutral-200/80 p-4 hidden sm:block">
            <div className="flex items-center gap-2.5 mb-1">
              <span className="w-3 h-3 rounded-full bg-primary-600 animate-ping" />
              <p className="text-xl font-black text-primary-700">
                1 don = 3 vies
              </p>
            </div>
            <p className="text-xs text-neutral-600 leading-snug">
              Un seul don permet d'aider jusqu'à 3 patients (globules rouges, plasma, plaquettes).
            </p>
          </div>
        </div>
      </div>

      {/* Halo lumineux décoratif en arrière-plan */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-300/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary-300/15 rounded-full blur-3xl pointer-events-none -z-10" />
    </section>
  );
}