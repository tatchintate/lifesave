import { useState } from "react";
import { Play, HeartHandshake, MapPin, Clock3, Syringe } from "lucide-react";

const INFO_CARDS = [
  { icon: HeartHandshake, label: "Suis-je éligible ?" },
  { icon: MapPin, label: "Où puis-je donner ?" },
  { icon: Clock3, label: "Combien de temps ?" },
  { icon: Syringe, label: "Est-ce douloureux ?" },
];

// Vidéo HUG : "Don du sang - vidéo d'information sur le déroulement d'un don"
// https://www.youtube.com/watch?v=rFmuV3urCKs
const VIDEO_ID = "rFmuV3urCKs";
const VIDEO_TITLE = "Déroulement d'un don de sang";

function HeroVideo() {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl bg-neutral-200">
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
          className="group absolute inset-0 w-full h-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary-300"
          aria-label={`Lancer la vidéo : ${VIDEO_TITLE}`}
        >
          <img
            src={`https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
            alt=""
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <span className="absolute inset-0 bg-neutral-900/25 group-hover:bg-neutral-900/35 transition-colors flex items-center justify-center">
            <span className="inline-flex items-center gap-2 rounded-xl bg-secondary-600 group-hover:bg-secondary-500 text-white px-6 py-3 shadow-lg transition-all duration-200 group-hover:-translate-y-1">
              <Play size={20} fill="currentColor" />
              <span className="font-medium">Voir la vidéo</span>
            </span>
          </span>
        </button>
      )}
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative bg-surface pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        {/* Colonne texte */}
        <div>
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary-700 bg-primary-50 rounded-full px-3 py-1 mb-6">
            Don de sang · Information indépendante
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-primary-700 leading-[1.05] mb-6">
            Avant de donner,
            <br />
            sachez.
          </h1>

          <p className="text-lg text-neutral-600 leading-relaxed max-w-xl mb-8">
            Vous pensez au don de sang, mais vous avez encore des questions ?
            LifeSave transforme vos hésitations en réponses. Découvrez tout ce
            qu'il faut savoir avant de tendre le bras.
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            <button
              type="button"
              className="rounded-full bg-primary-700 hover:bg-primary-800 text-white font-semibold px-6 py-3 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2"
            >
              Tester mon éligibilité
            </button>
            <button
              type="button"
              className="rounded-full bg-white hover:bg-neutral-100 text-neutral-900 font-semibold px-6 py-3 border border-neutral-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2"
            >
              Voir comment ça se passe
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {INFO_CARDS.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-3 bg-white rounded-xl border border-neutral-100 shadow-sm hover:shadow-md transition-shadow p-4 cursor-pointer"
              >
                <Icon className="text-primary-400 flex-shrink-0" size={22} />
                <span className="text-sm font-medium text-neutral-900">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Colonne vidéo */}
        <div className="relative">
          <HeroVideo />

          <div className="absolute -bottom-6 left-6 max-w-[240px] rounded-xl bg-white shadow-lg border border-neutral-100 p-4 hidden sm:block">
            <p className="text-2xl font-extrabold text-primary-700 mb-1">
              1 don
            </p>
            <p className="text-sm text-neutral-600">
              peut aider jusqu'à{" "}
              <span className="font-semibold text-neutral-900">
                3 patients
              </span>{" "}
              : globules rouges, plasma, plaquettes.
            </p>
          </div>
        </div>
      </div>

      {/* Formes décoratives */}
      <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary-200/30 rounded-full blur-3xl -z-10" />
      <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-secondary-200/30 rounded-full blur-3xl -z-10" />
    </section>
  );
}