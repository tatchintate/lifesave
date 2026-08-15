import React, { useState, useEffect, useMemo } from "react";
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Calendar,
  MapPin,
  X,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Droplet,
} from "lucide-react";
import { GENERAL_CRITERIA, checkEligibility } from "../../lib/eligibility";
import { centres } from "../../data/centres";
import { useInView } from "../../hooks/useInView";


// Composant Typewriter pour le titre de la section Éligibilité
function TypewriterTitle({ inView }) {
  const line1 = "Pouvez-vous";
  const line2 = "donner votre sang ?";

  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [activeLine, setActiveLine] = useState(1);

  useEffect(() => {
    if (!inView) return;

    let i = 0;
    let currentLine = 1;

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
          setActiveLine(3);
          clearInterval(timer);
        }
      }
    }, 55);

    return () => clearInterval(timer);
  }, [inView]);

  return (
    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight min-h-[72px] sm:min-h-[96px]">
      <span>{text1}</span>
      {activeLine === 1 && (
        <span className="inline-block w-1 sm:w-1.5 h-6 sm:h-10 bg-primary-500 ml-1.5 animate-pulse align-middle" />
      )}
      {text1.length > 0 && <br />}
      <span className="text-primary-500">
        {text2}
      </span>
      {activeLine === 2 && (
        <span className="inline-block w-1 sm:w-1.5 h-6 sm:h-10 bg-primary-500 ml-1.5 animate-pulse align-middle" />
      )}
    </h2>
  );
}

export default function Eligibility() {
  const [sectionRef, inView] = useInView({ threshold: 0.1 });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Formulaire d'éligibilité
  const [gender, setGender] = useState("femme");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [bloodType, setBloodType] = useState("inconnu");
  const [isFirstDonation, setIsFirstDonation] = useState(true);
  const [lastDonationDate, setLastDonationDate] = useState("");
  const [selectedCity, setSelectedCity] = useState("Cotonou");

  // Résultat de la simulation
  const [result, setResult] = useState(null);

  // Liste des villes depuis centres.js
  const availableCities = useMemo(() => {
    return Array.from(new Set(centres.map((c) => c.ville)));
  }, []);

  // Fermer le modal avec Échap
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = checkEligibility({
      gender,
      age,
      weight,
      isFirstDonation,
      lastDonationDate,
      selectedCity,
      bloodType,
    });
    setResult(res);
  };

  const handleReset = () => {
    setGender("femme");
    setAge("");
    setWeight("");
    setBloodType("inconnu");
    setIsFirstDonation(true);
    setLastDonationDate("");
    setSelectedCity(availableCities[0] || "Cotonou");
    setResult(null);
  };

  const scrollToCentres = () => {
    setIsModalOpen(false);
    const target = document.querySelector("#centres");
    if (target) {
      const offset = 80;
      const top =
        target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="eligibilite"
      className="py-16 sm:py-24 bg-[#181716] text-white border-t border-neutral-800 relative overflow-hidden"
    >
      {/* Halo décoratif rouge très doux en arrière-plan */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-8 relative z-10">
        {/* En-tête centré avec écriture lettre par lettre */}
        <div className="flex flex-col items-center justify-center text-center mb-10 sm:mb-12 gap-8">
          <div>
            <span className="inline-block text-xs sm:text-sm font-bold tracking-widest uppercase text-primary-400 py-1">
              Éligibilité au don
            </span>
          </div>
          <div className="">
            <TypewriterTitle inView={inView} />
          </div>

        </div>

        {/* Le CARD complet sautille/flotte gentiment, icônes calmes */}
        <div className="bg-[#211F1D] rounded-3xl p-6 sm:p-10 border border-neutral-800/80 shadow-2xl mb-10 animate-float-bounce hover:border-primary-500/30 transition-all">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 tracking-tight">
            Critères généraux
          </h3>

          <ul className="space-y-4">
            {GENERAL_CRITERIA.map((criterion, idx) => (
              <li key={idx} className="flex items-start gap-3.5 group">
                {criterion.type === "success" ? (
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-950/80 border border-emerald-600/60 flex items-center justify-center text-emerald-400 mt-0.5">
                    <CheckCircle2 size={16} className="text-emerald-400" />
                  </div>
                ) : (
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-rose-950/80 border border-rose-600/60 flex items-center justify-center text-rose-400 mt-0.5">
                    <AlertTriangle size={15} className="text-rose-400" />
                  </div>
                )}
                <span className="text-sm sm:text-base text-neutral-200 font-medium leading-relaxed">
                  {criterion.text}
                </span>
              </li>
            ))}
          </ul>

          {/* Sub-text obligatoire en bas du bloc */}
          <div className="mt-8 pt-6 border-t border-neutral-800 text-center sm:text-left">
            <p className="text-xs sm:text-sm text-neutral-400 italic">
              Seul un entretien médical professionnel peut confirmer définitivement votre aptitude au don.
            </p>
          </div>
        </div>

        {/* Bouton d'action principal centré sous le bloc */}
        <div className="flex flex-col items-center justify-center">
          <button
            onClick={() => {
              setIsModalOpen(true);
              setResult(null);
            }}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-base sm:text-lg font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-2xl shadow-xl shadow-rose-600/30 transition-all duration-300 animate-vibrate hover:scale-[1.05] active:scale-[0.98] cursor-pointer"
          >
            <Sparkles size={20} className="text-rose-200 animate-pulse" />
            <span>Vérifier mon éligibilité</span>
            <ArrowRight
              size={20}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
          <span className="mt-2.5 text-xs text-neutral-400">
            Test gratuit, anonyme & instantané (1 minute)
          </span>
        </div>
      </div>

      {/* Modal interactif d'éligibilité avec des COULEURS DOUCES & CALMES (Rose Médical Doux) */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-neutral-950/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative w-full max-w-xl bg-white text-neutral-900 rounded-3xl overflow-hidden shadow-2xl border border-neutral-200/80 my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header du Modal avec Rose Médical Apaisant */}
            <div className="bg-gradient-to-r from-primary-600 via-primary-500 to-rose-500 p-6 text-white relative">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors backdrop-blur-sm"
                aria-label="Fermer"
              >
                <X size={20} />
              </button>
              <div className="flex items-center gap-2 mb-1">
                <ShieldCheck size={20} className="text-primary-100" />
                <span className="text-xs font-extrabold uppercase tracking-widest text-primary-100">
                  Simulateur d'éligibilité
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold">
                Test en ligne gratuit
              </h3>
              <p className="text-xs text-white/90 mt-1">
                Répondez à ces questions rapides pour évaluer votre aptitude.
              </p>
            </div>

            {/* Corps du Formulaire avec Couleurs Douces & Agréables */}
            <div className="p-6 sm:p-8 space-y-5 max-h-[75vh] overflow-y-auto bg-neutral-50/50">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* 1. Sélecteur de Genre */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
                    1. Votre Sexe
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setGender("femme")}
                      className={`py-3 px-4 rounded-xl text-sm font-bold border transition-all ${gender === "femme"
                        ? "bg-primary-600 text-white border-primary-600 shadow-md shadow-primary-600/20"
                        : "bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-100"
                        }`}
                    >
                      Femme
                    </button>
                    <button
                      type="button"
                      onClick={() => setGender("homme")}
                      className={`py-3 px-4 rounded-xl text-sm font-bold border transition-all ${gender === "homme"
                        ? "bg-primary-600 text-white border-primary-600 shadow-md shadow-primary-600/20"
                        : "bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-100"
                        }`}
                    >
                      Homme
                    </button>
                  </div>
                </div>

                {/* 2. Âge et Poids */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="modal-input-age"
                      className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5"
                    >
                      2. Âge (ans)
                    </label>
                    <input
                      id="modal-input-age"
                      type="number"
                      placeholder="Ex. 25"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      required
                      min="1"
                      max="120"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-neutral-200 text-neutral-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="modal-input-weight"
                      className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5"
                    >
                      3. Poids (kg)
                    </label>
                    <input
                      id="modal-input-weight"
                      type="number"
                      placeholder="Ex. 65"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      required
                      min="1"
                      max="300"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-neutral-200 text-neutral-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all"
                    />
                  </div>
                </div>

                {/* 3. Groupe Sanguin */}
                <div>
                  <label
                    htmlFor="modal-input-blood"
                    className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5 flex items-center gap-1.5"
                  >
                    <Droplet size={14} className="text-primary-600" />
                    <span>4. Votre Groupe Sanguin (Optionnel)</span>
                  </label>
                  <select
                    id="modal-input-blood"
                    value={bloodType}
                    onChange={(e) => setBloodType(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-neutral-200 text-neutral-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all"
                  >
                    <option value="inconnu">Je ne connais pas mon groupe</option>
                    <option value="O-">O- (Donneur universel d'hématies)</option>
                    <option value="O+">O+ (Groupe très demandé)</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+ (Receveur universel)</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>

                {/* 4. Ville au Bénin */}
                <div>
                  <label
                    htmlFor="modal-input-city"
                    className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5 flex items-center gap-1.5"
                  >
                    <MapPin size={14} className="text-primary-600" />
                    <span>5. Votre Ville au Bénin</span>
                  </label>
                  <select
                    id="modal-input-city"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-neutral-200 text-neutral-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all"
                  >
                    {availableCities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 5. Premier don check */}
                <div className="pt-1">
                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={isFirstDonation}
                      onChange={(e) => setIsFirstDonation(e.target.checked)}
                      className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500 border-neutral-300 cursor-pointer"
                    />
                    <span className="text-sm font-semibold text-neutral-800">
                      C'est mon premier don de sang (aucun don antérieur)
                    </span>
                  </label>
                </div>

                {/* Champ Date si pas premier don */}
                {!isFirstDonation && (
                  <div className="animate-fade-up">
                    <label
                      htmlFor="modal-input-last-date"
                      className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5"
                    >
                      Date de votre dernier don
                    </label>
                    <input
                      id="modal-input-last-date"
                      type="date"
                      value={lastDonationDate}
                      onChange={(e) => setLastDonationDate(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white border border-neutral-200 text-neutral-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all"
                    />
                  </div>
                )}

                {/* Boutons du Formulaire */}
                <div className="flex items-center gap-3 pt-3">
                  <button
                    type="submit"
                    className="flex-1 py-3.5 px-6 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm shadow-lg shadow-primary-600/20 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Lancer la vérification</span>
                    <ArrowRight size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="p-3 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-200/60 rounded-xl transition-colors"
                    title="Réinitialiser"
                  >
                    <RotateCcw size={18} />
                  </button>
                </div>
              </form>

              {/* Résultat de la simulation */}
              {result && (
                <div className="mt-6 pt-5 border-t border-neutral-200 animate-fade-in">
                  {/* CAS 1 : ÉLIGIBLE */}
                  {result.status === "eligible" && (
                    <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle2
                          size={24}
                          className="text-emerald-600 flex-shrink-0 mt-0.5"
                        />
                        <div>
                          <h4 className="font-extrabold text-emerald-950 text-base mb-1">
                            Vous êtes éligible au don de sang !
                          </h4>
                          <p className="text-xs text-emerald-800 leading-relaxed">
                            {result.message}
                          </p>
                        </div>
                      </div>

                      {/* Information Groupe sanguin */}
                      {result.bloodMessage && (
                        <div className="p-3.5 rounded-xl bg-white border border-emerald-200 text-xs text-emerald-900 leading-relaxed font-medium">
                          {result.bloodMessage}
                        </div>
                      )}

                      {/* Information du centre partenaire */}
                      {result.center && (
                        <div className="p-4 rounded-xl bg-white border border-emerald-200 shadow-sm space-y-2">
                          <div className="flex items-center gap-2 text-xs font-extrabold text-emerald-800 uppercase tracking-wider">
                            <MapPin size={15} className="text-emerald-600" />
                            <span>Centre recommandé ({result.center.ville})</span>
                          </div>
                          <p className="text-sm font-bold text-neutral-900">
                            {result.center.nom}
                          </p>
                          <p className="text-xs text-neutral-600">
                            📍 {result.center.adresse} · 📞 {result.center.telephone}
                          </p>
                          <div className="pt-1 flex items-center justify-between">
                            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                              Accueil : {result.center.modalitesAccueil}
                            </span>
                            <button
                              onClick={scrollToCentres}
                              className="text-xs font-bold text-primary-700 hover:text-primary-800 underline"
                            >
                              Voir sur la carte
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* CAS 2 : INÉLIGIBLE */}
                  {result.status === "ineligible" && (
                    <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-950 flex items-start gap-3">
                      <XCircle
                        size={24}
                        className="text-rose-600 flex-shrink-0 mt-0.5"
                      />
                      <div>
                        <h4 className="font-extrabold text-rose-950 text-base mb-1">
                          Refus d'éligibilité temporaire
                        </h4>
                        <p className="text-xs text-rose-800 leading-relaxed">
                          {result.reason}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* CAS 3 : DÉLAI POST-DON NON ÉCOULÉ */}
                  {result.status === "delay_pending" && (
                    <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 space-y-3">
                      <div className="flex items-start gap-3">
                        <Calendar
                          size={24}
                          className="text-amber-600 flex-shrink-0 mt-0.5"
                        />
                        <div>
                          <h4 className="font-extrabold text-amber-950 text-base mb-1">
                            Délai entre deux dons non écoulé
                          </h4>
                          <p className="text-xs text-amber-800 leading-relaxed">
                            {result.reason}
                          </p>
                        </div>
                      </div>
                      <div className="p-3 rounded-xl bg-white border border-amber-200 text-center">
                        <p className="text-xs text-neutral-500 font-semibold mb-0.5">
                          Date du prochain don possible :
                        </p>
                        <p className="text-sm font-extrabold text-amber-900">
                          🗓️ {result.nextDate}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Erreur de saisie */}
                  {result.status === "error_input" && (
                    <div className="p-3.5 rounded-xl bg-neutral-100 text-neutral-800 text-xs font-semibold">
                      ⚠️ {result.message}
                    </div>
                  )}
                </div>
              )}

              {/* Rappel note médicale */}
              <p className="text-[11px] text-neutral-400 italic text-center pt-2">
                * Seul un entretien médical réalisé en centre de collecte confirme votre aptitude définitive.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
