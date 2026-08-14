import { centres } from "../data/centres";

// Critères généraux pour l'affichage de la section
export const GENERAL_CRITERIA = [
  {
    type: "success",
    text: "Avoir entre 18 et 65 ans révolus",
  },
  {
    type: "success",
    text: "Peser au moins 50 kg",
  },
  {
    type: "success",
    text: "Être en bonne santé générale",
  },
  {
    type: "success",
    text: "Avoir dormi au moins 5 h la nuit précédente",
  },
  {
    type: "warning",
    text: "Délai de 3 mois (homme) ou 4 mois (femme) depuis le dernier don",
  },
  {
    type: "warning",
    text: "Pas de tatouage ou piercing dans les 4 derniers mois",
  },
  {
    type: "warning",
    text: "Pas de voyage en zone à risque dans les 4 derniers mois",
  },
];

/**
 * Information personnalisée sur le groupe sanguin
 */
export function getBloodTypeInfo(bloodType) {
  switch (bloodType) {
    case "O-":
      return "🩸 Groupe O- : Vous êtes un donneur universel d'hématies ! Vos poches de sang sont d'une importance capitale pour les urgences vitales au Bénin.";
    case "O+":
      return "🩸 Groupe O+ : Groupe très répandu au Bénin, vos poches sont extrêmement sollicitées pour les transfusions du quotidien.";
    case "AB+":
      return "🩸 Groupe AB+ : Vous êtes un receveur universel d'hématies et un donneur universel de plasma !";
    case "AB-":
    case "A-":
    case "B-":
      return "🩸 Groupe Rhésus Négatif : Votre sang est rare et précieux pour répondre aux besoins spécifiques des patients.";
    case "A+":
    case "B+":
      return "🩸 Votre groupe sanguin est essentiel pour maintenir l'équilibre des stocks de sécurité dans nos centres.";
    default:
      return "ℹ️ Si vous ne connaissez pas votre groupe sanguin, un test de groupage rapide sera réalisé gratuitement lors de votre premier don.";
  }
}

/**
 * Algorithme d'éligibilité au don de sang (Annexe du Challenge)
 */
export function checkEligibility({
  gender,
  age,
  weight,
  isFirstDonation,
  lastDonationDate,
  selectedCity,
  bloodType = "inconnu",
}) {
  const numericAge = parseInt(age, 10);
  const numericWeight = parseFloat(weight);

  // 1. Validation de la saisie
  if (isNaN(numericAge) || isNaN(numericWeight)) {
    return {
      status: "error_input",
      message: "Veuillez saisir un âge et un poids valides.",
    };
  }

  // 2. Critère Âge (18 à 65 ans révolus)
  if (numericAge < 18 || numericAge > 65) {
    return {
      status: "ineligible",
      reason: `Critère bloquant : L'âge doit être compris entre 18 et 65 ans révolus. (Saisi : ${numericAge} ans)`,
    };
  }

  // 3. Critère Poids (Minimum 50 kg)
  if (numericWeight < 50) {
    return {
      status: "ineligible",
      reason: `Critère bloquant : Le poids minimum requis est de 50 kg. (Saisi : ${numericWeight} kg)`,
    };
  }

  // 4. Critère Délai entre deux dons : 3 mois (hommes), 4 mois (femmes)
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

      return {
        status: "delay_pending",
        reason: `Délai post-don non écoulé (${requiredMonths} mois nécessaires pour les ${
          gender === "homme" ? "hommes" : "femmes"
        }).`,
        nextDate: formattedNextDate,
      };
    }
  }

  // Centre de don correspondant à la ville sélectionnée dans centres.js
  const matchedCenter =
    centres.find(
      (c) => c.ville.toLowerCase() === (selectedCity || "").toLowerCase()
    ) || centres[0];

  const bloodMessage = getBloodTypeInfo(bloodType);

  return {
    status: "eligible",
    message:
      "Félicitations ! Vous remplissez l'ensemble des critères généraux pour effectuer un don de sang.",
    center: matchedCenter,
    bloodMessage,
  };
}
