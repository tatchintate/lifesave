import React, { useState } from "react";
import { CheckCircle2, XCircle, AlertTriangle, HelpCircle, RotateCcw, Info, Calendar } from "lucide-react";
import { Button } from "./ui/Button";

export default function Eligibility() {
  const [gender, setGender] = useState("femme"); // 'femme' ou 'homme'
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [isFirstDonation, setIsFirstDonation] = useState(true);
  const [lastDonationDate, setLastDonationDate] = useState("");
  
  const [result, setResult] = useState(null);

  // Algorithme d'éligibilité (Annexe du Challenge)
  const handleCheckEligibility = (e) => {
    e.preventDefault();

    const numericAge = parseInt(age, 10);
    const numericWeight = parseFloat(weight);

    // 1. Validation de la saisie
    if (isNaN(numericAge) || isNaN(numericWeight)) {
      setResult({
        status: "error_input",
        message: "Veuillez saisir un âge et un poids valides.",
      });
      return;
    }

    // 2. Critère Âge (18 à 65 ans révolus)
    if (numericAge < 18 || numericAge > 65) {
      setResult({
        status: "ineligible",
        reason: `Critère bloquant : L'âge doit être compris entre 18 et 65 ans révolus. (Saisi : ${numericAge} ans)`,
      });
      return;
    }

    // 3. Critère Poids (Minimum 50 kg)
    if (numericWeight < 50) {
      setResult({
        status: "ineligible",
        reason: `Critère bloquant : Le poids minimum requis est de 50 kg. (Saisi : ${numericWeight} kg)`,
      });
      return;
    }

    // 4. Critère Délai entre dons
    if (!isFirstDonation && lastDonationDate) {
      const lastDate = new Date(lastDonationDate);
      const requiredMonths = gender === "homme" ? 3 : 4;
      
      const nextEligibleDate = new Date(lastDate);
      nextEligibleDate.setMonth(nextEligibleDate.getMonth() + requiredMonths);

      const today = new Date();

      if (today < nextEligibleDate) {
        const formattedNextDate = nextEligibleDate.toLocaleDateString("fr-FR", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });
        setResult({
          status: "delay_pending",
          reason: `Délai de prévenance non écoulé (${requiredMonths} mois pour les ${gender === "homme" ? "hommes" : "femmes"}).`,
          nextDate: formattedNextDate,
        });
        return;
      }
    }

    // Si tous les critères sont validés
    setResult({
      status: "eligible",
      message: "Félicitations ! Vous remplissez les critères généraux pour donner votre sang.",
    });
  };

  const handleReset = () => {
    setGender("femme");
    setAge("");
    setWeight("");
    setIsFirstDonation(true);
    setLastDonationDate("");
    setResult(null);
  };

  return (
    <section id="eligibilite" className="py-20 bg-background border-t border-neutral-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Colonne Gauche : Critères généraux & Informations */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="inline-block text-xs font-bold tracking-widest uppercase text-primary-700 bg-primary-100/70 border border-primary-200/80 rounded-full px-3.5 py-1 mb-4">
                C2 · C3 — Qui peut donner
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight leading-tight mb-4">
                La plupart des gens sont éligibles. <br />
                <span className="text-primary-700">Vérifions la vôtre.</span>
              </h2>
              <p className="text-base text-neutral-600 leading-relaxed">
                La peur d'être refusé est le premier frein cité par les nouveaux donneurs. Voici les critères généraux, puis un test rapide qui répond à votre situation personnelle.
              </p>
            </div>

            {/* Tableau des critères généraux */}
            <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm overflow-hidden divide-y divide-neutral-100">
              <div className="p-4 sm:p-5 flex items-center justify-between">
                <span className="text-sm font-semibold text-neutral-700">Âge</span>
                <span className="text-sm font-bold text-neutral-900">18 à 65 ans révolus</span>
              </div>
              <div className="p-4 sm:p-5 flex items-center justify-between">
                <span className="text-sm font-semibold text-neutral-700">Poids</span>
                <span className="text-sm font-bold text-neutral-900">50 kg minimum</span>
              </div>
              <div className="p-4 sm:p-5 flex items-center justify-between">
                <span className="text-sm font-semibold text-neutral-700">Délai entre deux dons</span>
                <span className="text-sm font-bold text-neutral-900">3 mois (homme) · 4 mois (femme)</span>
              </div>
              <div className="p-4 sm:p-5 flex items-center justify-between">
                <span className="text-sm font-semibold text-neutral-700">Le jour J</span>
                <span className="text-sm font-bold text-neutral-900">Être en forme, avoir mangé et bien bu</span>
              </div>
            </div>

            {/* Note d'avertissement médicale obligatoire */}
            <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 flex items-start gap-3.5">
              <Info size={20} className="text-amber-700 flex-shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm leading-relaxed">
                Ces règles sont <strong>simplifiées</strong> pour la simulation. Seul l'entretien médical professionnel réalisé sur place dans le centre de don peut confirmer votre aptitude définitive.
              </p>
            </div>
          </div>

          {/* Colonne Droite : Simulateur Interactif d'Éligibilité */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/80 shadow-xl relative">
            <div className="mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-1">
                Test d'éligibilité en ligne
              </h3>
              <p className="text-xs sm:text-sm text-neutral-500">
                Aucune donnée n'est enregistrée : le calcul s'effectue instantanément dans votre navigateur.
              </p>
            </div>

            <form onSubmit={handleCheckEligibility} className="space-y-5">
              
              {/* Sélecteur de Genre */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
                  Vous êtes
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setGender("femme")}
                    className={`py-3 px-4 rounded-xl text-sm font-bold border transition-all ${
                      gender === "femme"
                        ? "bg-primary-600 text-white border-primary-600 shadow-md"
                        : "bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-neutral-100"
                    }`}
                  >
                    Femme
                  </button>
                  <button
                    type="button"
                    onClick={() => setGender("homme")}
                    className={`py-3 px-4 rounded-xl text-sm font-bold border transition-all ${
                      gender === "homme"
                        ? "bg-primary-600 text-white border-primary-600 shadow-md"
                        : "bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-neutral-100"
                    }`}
                  >
                    Homme
                  </button>
                </div>
              </div>

              {/* Âge et Poids */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="input-age" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Âge (ans)
                  </label>
                  <input
                    id="input-age"
                    type="number"
                    placeholder="Ex. 28"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                    min="1"
                    max="120"
                    className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="input-weight" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Poids (kg)
                  </label>
                  <input
                    id="input-weight"
                    type="number"
                    placeholder="Ex. 62"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    required
                    min="1"
                    max="300"
                    className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Premier don check */}
              <div className="pt-1">
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={isFirstDonation}
                    onChange={(e) => setIsFirstDonation(e.target.checked)}
                    className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500 border-neutral-300 cursor-pointer"
                  />
                  <span className="text-sm font-semibold text-neutral-800">
                    Je n'ai jamais donné mon sang (1er don)
                  </span>
                </label>
              </div>

              {/* Champ date si pas premier don */}
              {!isFirstDonation && (
                <div className="animate-fade-up">
                  <label htmlFor="input-last-date" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Date de votre dernier don
                  </label>
                  <input
                    id="input-last-date"
                    type="date"
                    value={lastDonationDate}
                    onChange={(e) => setLastDonationDate(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all"
                  />
                </div>
              )}

              {/* Boutons d'action */}
              <div className="flex items-center gap-3 pt-2">
                <Button variant="glow" size="md" type="submit" fullWidth>
                  <span>Vérifier mon éligibilité</span>
                </Button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="p-3 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-xl transition-colors"
                  title="Réinitialiser"
                >
                  <RotateCcw size={18} />
                </button>
              </div>
            </form>

            {/* Affichage des Résultats de la Simulation */}
            {result && (
              <div className="mt-6 pt-5 border-t border-neutral-100 animate-fade-up">
                {result.status === "eligible" && (
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-3">
                    <CheckCircle2 size={22} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-emerald-950 text-sm mb-1">
                        Vous êtes potentiellement éligible !
                      </h4>
                      <p className="text-xs text-emerald-800 leading-relaxed">
                        {result.message} Vous pouvez dès maintenant rechercher un centre près de chez vous.
                      </p>
                    </div>
                  </div>
                )}

                {result.status === "ineligible" && (
                  <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 flex items-start gap-3">
                    <XCircle size={22} className="text-rose-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-rose-950 text-sm mb-1">
                        Non éligible actuellement
                      </h4>
                      <p className="text-xs text-rose-800 leading-relaxed">
                        {result.reason}
                      </p>
                    </div>
                  </div>
                )}

                {result.status === "delay_pending" && (
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3">
                    <Calendar size={22} className="text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-amber-950 text-sm mb-1">
                        Délai post-don non écoulé
                      </h4>
                      <p className="text-xs text-amber-800 leading-relaxed mb-1">
                        {result.reason}
                      </p>
                      <p className="text-xs font-bold text-amber-900">
                        🗓️ Prochain don possible à partir du : {result.nextDate}
                      </p>
                    </div>
                  </div>
                )}

                {result.status === "error_input" && (
                  <div className="p-3 rounded-xl bg-neutral-100 text-neutral-800 text-xs font-semibold">
                    {result.message}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
