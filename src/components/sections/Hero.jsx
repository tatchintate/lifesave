import React, { useState, useEffect } from "react";
import { Play, ArrowRight, Activity, Clock, Heart, MapPin } from "lucide-react";
import { Button } from "../ui/Button";
import { useInView } from "../../hooks/useInView";
import heroImg from "../../assets/hero.png";


const VIDEO_ID = "rFmuV3urCKs";
const VIDEO_TITLE = "Vidéo explicative : Pourquoi et comment donner son sang ?";

const INFO_CARDS = [
  {
    icon: Activity,
    label: "Suis-je éligible ?",
    description: "Test interactif rapide en 30 sec.",
    href: "#eligibilite",
  },
  {
    icon: MapPin,
    label: "Où puis-je donner ?",
    description: "8 centres répertoriés au Bénin.",
    href: "#ou-donner",
  },
  {
    icon: Clock,
    label: "Combien de temps ?",
    description: "45 minutes au total.",
    href: "#deroulement",
  },
  {
    icon: Heart,
    label: "Est-ce douloureux ?",
    description: "Juste une piqûre rapide sans danger.",
    href: "#faq",
  },
];

function HeroVideo() {
  const [playing, setPlaying] = useState(false);
  const [imgSrc, setImgSrc] = useState(
    `https://img.youtube.com/vi/${VIDEO_ID}/hqdefault.jpg`
  );

  return (
    <div className="relative aspect-[16/9] sm:aspect-[16/10] md:aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl bg-slate-950 border border-white/10 group hover:border-primary-500/50 transition-all duration-500">
      {playing ? (
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0`}
          title={VIDEO_TITLE}
          allow="accelerate; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
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
            src={imgSrc}
            onError={() =>
              setImgSrc(`https://img.youtube.com/vi/${VIDEO_ID}/hqdefault.jpg`)
            }
            alt="Vidéo explicative sur le don de sang"
            className="w-full h-full object-cover opacity-85 transition-transform duration-700 ease-out group-hover:scale-105 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-colors flex items-center justify-center">
            <div className="relative flex items-center justify-center">
              <span className="absolute w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary-500/40 animate-ping" />
              <span className="relative inline-flex items-center gap-2 sm:gap-3 rounded-full bg-white/95 backdrop-blur-md text-slate-900 font-extrabold px-3 py-2 sm:px-5 sm:py-3 shadow-2xl transition-all duration-300 group-hover:scale-105 group-hover:bg-white border border-white">
                <span className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary-500 text-white flex items-center justify-center shadow-md group-hover:bg-primary-600 group-hover:scale-110 transition-all">
                  <Play size={14} fill="currentColor" className="ml-0.5" />
                </span>
                <span className="text-[10px] xs:text-xs sm:text-sm font-extrabold text-slate-900 whitespace-nowrap">
                  Voir la vidéo <span className="hidden xs:inline">(2 min)</span>
                </span>
              </span>
            </div>
          </div>
        </button>
      )}
    </div>
  );
}

function TypewriterTitle() {
  const line1 = "Votre sang";
  const line2 = "sauve des vies.";
  const line3 = "Chaque jour.";

  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [text3, setText3] = useState("");
  const [activeLine, setActiveLine] = useState(1);

  useEffect(() => {
    let currentLine = 1;
    let i = 0;

    const timer = setInterval(() => {
      if (currentLine === 1) {
        if (i < line1.length) {
          setText1(line1.slice(0, i + 1));
          i++;
        } else {
          currentLine = 2;
          setActiveLine(2);
          i = 0;
        }
      } else if (currentLine === 2) {
        if (i < line2.length) {
          setText2(line2.slice(0, i + 1));
          i++;
        } else {
          currentLine = 3;
          setActiveLine(3);
          i = 0;
        }
      } else if (currentLine === 3) {
        if (i < line3.length) {
          setText3(line3.slice(0, i + 1));
          i++;
        } else {
          setActiveLine(4);
          clearInterval(timer);
        }
      }
    }, 45);

    return () => clearInterval(timer);
  }, []);

  return (
    <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-[3.35rem] xl:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
      <span>{text1}</span>
      {activeLine === 1 && (
        <span className="inline-block w-1 sm:w-1.5 h-7 sm:h-11 bg-rose-500 ml-1.5 animate-pulse align-middle" />
      )}
      <br />
      <span className="text-rose-500 font-serif italic font-normal">
        {text2}
      </span>
      {activeLine === 2 && (
        <span className="inline-block w-1 sm:w-1.5 h-7 sm:h-11 bg-rose-500 ml-1.5 animate-pulse align-middle" />
      )}
      {text2.length > 0 && <br />}
      <span>{text3}</span>
      {activeLine === 3 && (
        <span className="inline-block w-1 sm:w-1.5 h-7 sm:h-11 bg-rose-500 ml-1.5 animate-pulse align-middle" />
      )}
    </h1>
  );
}

export default function Hero() {
  const [cardsRef, cardsInView] = useInView({ threshold: 0.15 });

  const scrollToSection = (href) => {
    const target = document.querySelector(href);
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center pt-24 xs:pt-28 sm:pt-32 md:pt-36 pb-12 sm:pb-16 md:pb-24 overflow-hidden bg-[#0B1528] text-white">
      {/* Image de fond hero.jpg sous filtre bleu nuit & corail */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={heroImg}
          alt="Don de sang et soins médicaux"
          className="w-full h-full object-cover object-center filter brightness-90 contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1528]/95 via-[#0B1528]/75 to-[#0B1528]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1528] via-transparent to-[#0B1528]/50" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 xs:px-6 sm:px-8 lg:px-12 grid lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-16 items-center">
        {/* Colonne texte (6 cols) */}
        <div className="lg:col-span-6 flex flex-col gap-5 sm:gap-7">
          {/* Titre avec effet d'écriture machine à écrire */}
          <TypewriterTitle />

          {/* Texte de présentation ultra-lisible */}
          <p className="text-sm xs:text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-xl">
            Au Bénin, des centaines de poches de sang sont nécessaires quotidiennement.
            Aucun substitut artificiel ne peut remplacer le sang humain.
            Êtes-vous prêt à faire la différence ?
          </p>

          {/* Boutons d'action pillules - HARMONISATION DUAL-TONE */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <Button
              variant="glow"
              size="lg"
              onClick={() => scrollToSection("#eligibilite")}
              className="bg-rose-600 hover:bg-rose-700 text-white rounded-full px-5 sm:px-7 py-2.5 sm:py-3.5 shadow-lg shadow-rose-600/30 border-none font-bold text-xs sm:text-sm lg:text-base"
            >
              <span className="whitespace-nowrap">Vérifier mon éligibilité</span>
              <ArrowRight size={16} />
            </Button>

            <Button
              variant="glass"
              size="lg"
              onClick={() => scrollToSection("#deroulement")}
              className="bg-white/10 hover:bg-white/20 text-white border-white/20 rounded-full px-5 sm:px-7 py-2.5 sm:py-3.5 font-semibold backdrop-blur-md text-xs sm:text-sm lg:text-base"
            >
              <span className="whitespace-nowrap">Comment ça se passe ?</span>
            </Button>
          </div>
        </div>

        {/* Colonne droite : Carte en verre sombre avec vidéo & repères rapides */}
        <div className="lg:col-span-6 relative mt-6 sm:mt-8 lg:mt-0">
          <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 shadow-2xl space-y-4 sm:space-y-5">
            <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2 px-1">
              <span className="text-[10px] xs:text-xs font-bold uppercase tracking-wider text-slate-400">
                Informations & Vidéo
              </span>
              <span className="text-[10px] xs:text-xs text-rose-400 font-semibold whitespace-nowrap bg-rose-500/10 px-2.5 py-1 rounded-full border border-rose-500/20">
                1 don = 3 vies
              </span>
            </div>

            <HeroVideo />

            {/* CARDS - Repères rapides avec reflets bleu sapphire et touches corail */}
            <div ref={cardsRef} className="grid grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
              {INFO_CARDS.map(({ icon: Icon, label, description, href }, index) => (
                <div
                  key={label}
                  onClick={() => scrollToSection(href)}
                  style={{ transitionDelay: `${index * 70}ms` }}
                  className={`group flex flex-col gap-1 bg-slate-950/50 backdrop-blur-md rounded-xl sm:rounded-2xl border border-white/10 p-2.5 sm:p-3.5 lg:p-4 hover:border-primary-500/50 hover:bg-slate-900/80 transition-all duration-300 cursor-pointer ${cardsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                >
                  <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-2.5">
                    <div className="p-1 sm:p-1.5 lg:p-2 rounded-lg bg-rose-500/10 text-rose-400 group-hover:bg-rose-600 group-hover:text-white transition-colors duration-300 flex-shrink-0">
                      <Icon size={14} className="sm:size-[15px] lg:size-[17px]" />
                    </div>
                    <span className="text-[10px] xs:text-xs sm:text-sm lg:text-[15px] font-bold text-white group-hover:text-primary-300 transition-colors leading-tight">
                      {label}
                    </span>
                  </div>
                  <p className="text-[10px] xs:text-[11px] sm:text-xs lg:text-[13px] text-slate-400 leading-snug pl-0.5 lg:pl-1">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}