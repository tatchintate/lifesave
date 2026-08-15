import React, { useState, useMemo } from "react";
import {
  Search,
  MapPin,
  Clock,
  Phone,
  Navigation,
  Calendar,
  Sparkles,
  Droplet,
  Filter,
  RotateCcw,
  CheckCircle2,
  LocateFixed,
  Loader2,
} from "lucide-react";
import { centres } from "../data/centres";
import { useInView } from "../hooks/useInView";

/**
 * Calcul dynamique du statut (Ouvert / Fermé) en fonction de l'heure réelle de l'appareil
 */
function checkRealtimeStatus(horaires) {
  if (!horaires) return { isOpen: true, label: "Ouvert" };

  const now = new Date();
  const days = [
    "dimanche",
    "lundi",
    "mardi",
    "mercredi",
    "jeudi",
    "vendredi",
    "samedi",
  ];
  const currentDay = days[now.getDay()];
  const scheduleStr = horaires[currentDay];

  if (!scheduleStr || scheduleStr.toLowerCase() === "fermé") {
    return { isOpen: false, label: "Fermé actuellement" };
  }

  if (scheduleStr === "00:00-23:59") {
    return { isOpen: true, label: "Ouvert 24h/24" };
  }

  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const ranges = scheduleStr.split(",");

  for (const range of ranges) {
    const parts = range.trim().split("-");
    if (parts.length === 2) {
      const [startH, startM] = parts[0].split(":").map(Number);
      const [endH, endM] = parts[1].split(":").map(Number);

      const startMinutes = startH * 60 + (startM || 0);
      const endMinutes = endH * 60 + (endM || 0);

      if (currentMinutes >= startMinutes && currentMinutes <= endMinutes) {
        return { isOpen: true, label: "Ouvert actuellement" };
      }
    }
  }

  return { isOpen: false, label: "Fermé actuellement" };
}

/**
 * Calcul de la distance Haversine entre deux points GPS (en kilomètres)
 */
function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
    Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

export default function Centers() {
  const [sectionRef, inView] = useInView({ threshold: 0.1 });

  // États des filtres
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("Toutes");
  const [selectedType, setSelectedType] = useState("Tous");
  const [selectedStatus, setSelectedStatus] = useState("Tous");
  const [onlyUrgent, setOnlyUrgent] = useState(false);
  const [onlyMobile, setOnlyMobile] = useState(false);

  // Géolocalisation
  const [userLocation, setUserLocation] = useState(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState(null);

  const cities = useMemo(() => {
    return ["Toutes", ...Array.from(new Set(centres.map((c) => c.ville)))];
  }, []);

  const handleGeolocate = () => {
    if (!navigator.geolocation) {
      setLocationError("Géolocalisation non supportée par le navigateur.");
      return;
    }

    setIsLocating(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setIsLocating(false);
      },
      () => {
        setIsLocating(false);
        setLocationError("Veuillez autoriser l'accès à votre position GPS.");
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const filteredCentres = useMemo(() => {
    let list = centres.map((c) => {
      const realtime = checkRealtimeStatus(c.horaires);
      let distance = null;
      if (userLocation && c.coordonnees) {
        distance = calculateDistanceKm(
          userLocation.lat,
          userLocation.lng,
          c.coordonnees.lat,
          c.coordonnees.lng
        );
      }
      return { ...c, realtime, distance };
    });

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      list = list.filter(
        (c) =>
          c.nom.toLowerCase().includes(term) ||
          c.ville.toLowerCase().includes(term) ||
          c.adresse.toLowerCase().includes(term) ||
          c.nature.toLowerCase().includes(term)
      );
    }

    if (selectedCity !== "Toutes") {
      list = list.filter((c) => c.ville === selectedCity);
    }

    if (selectedType !== "Tous") {
      list = list.filter((c) => c.typesDeDon.includes(selectedType));
    }

    if (selectedStatus === "ouvert") {
      list = list.filter((c) => c.realtime.isOpen);
    } else if (selectedStatus === "ferme") {
      list = list.filter((c) => !c.realtime.isOpen);
    }

    if (onlyUrgent) {
      list = list.filter((c) => c.isUrgent);
    }

    if (onlyMobile) {
      list = list.filter((c) => c.isCollecteMobile);
    }

    if (userLocation) {
      list.sort((a, b) => (a.distance || 0) - (b.distance || 0));
    }

    return list;
  }, [
    searchTerm,
    selectedCity,
    selectedType,
    selectedStatus,
    onlyUrgent,
    onlyMobile,
    userLocation,
  ]);

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCity("Toutes");
    setSelectedType("Tous");
    setSelectedStatus("Tous");
    setOnlyUrgent(false);
    setOnlyMobile(false);
  };

  const generateGoogleCalendarUrl = (centre) => {
    const title = `Don de sang — ${centre.nom}`;
    const details = `Rappel pour un don de sang à ${centre.nom}.\nAdresse : ${centre.adresse}, ${centre.ville}.\nTéléphone : ${centre.telephone}.`;
    const location = `${centre.adresse}, ${centre.ville}, Bénin`;

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(9, 0, 0, 0);

    const endHour = new Date(tomorrow);
    endHour.setHours(10, 0, 0, 0);

    const formatDate = (date) =>
      date.toISOString().replace(/-|:|\.\d\d\d/g, "");

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      title
    )}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(
      location
    )}&dates=${formatDate(tomorrow)}/${formatDate(endHour)}`;
  };

  return (
    <section
      ref={sectionRef}
      id="ou-donner"
      className="py-16 sm:py-24 bg-[#FAF9F8] border-t border-neutral-200/80 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* En-tête Unifié et Épuré */}
        <div
          className={`flex flex-col mb-10 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
        >
          <div className="flex flex-col mb-6">
            <span className="inline-block text-sm font-bold tracking-widest uppercase text-primary-700 py-1">
              Répertoire des centres
            </span>
            <span className="bg-primary-100/70 w-10 border border-primary-200/80 rounded-full px-1 py-0.5 mb-4" />
          </div>

          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight mb-3">
              Trouver un centre près de chez vous
            </h2>

            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-3xl">
              Localisez facilement les centres de transfusion de l'ANTS et les collectes éphémères au Bénin.
            </p>
          </div>


        </div>

        {/* Disposition Principale : Sidebar Filtres + Grille Résultats */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* ================= PANNEAU LATÉRAL GAUCHE ================= */}
          <aside className="lg:col-span-1 bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-sm space-y-5 sticky top-24">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div className="flex items-center gap-2 font-bold text-neutral-900 text-sm">
                <Filter size={16} className="text-primary-600" />
                <span>Filtres</span>
              </div>
              <button
                onClick={handleResetFilters}
                className="text-xs font-semibold text-neutral-400 hover:text-primary-600 transition-colors flex items-center gap-1"
              >
                <RotateCcw size={12} />
                <span>Réinitialiser</span>
              </button>
            </div>

            {/* Bouton GPS */}
            <div>
              <button
                onClick={handleGeolocate}
                disabled={isLocating}
                className="w-full py-2.5 px-3 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs shadow-sm transition-colors flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-75"
              >
                {isLocating ? (
                  <>
                    <Loader2 size={15} className="animate-spin text-white" />
                    <span>Recherche GPS...</span>
                  </>
                ) : (
                  <>
                    <LocateFixed size={15} />
                    <span>Centres autour de moi</span>
                  </>
                )}
              </button>

              {userLocation && (
                <p className="text-[11px] text-emerald-700 font-bold bg-emerald-50 p-2 rounded-lg border border-emerald-200 mt-2 text-center flex items-center justify-center gap-1">
                  <CheckCircle2 size={12} /> GPS Actif · Trié par proximité
                </p>
              )}

              {locationError && (
                <p className="text-[11px] text-rose-600 bg-rose-50 p-2 rounded-lg border border-rose-200 mt-2 leading-tight">
                  ⚠️ {locationError}
                </p>
              )}
            </div>

            {/* Recherche mot-clé */}
            <div>
              <label className="block text-[11px] font-extrabold uppercase tracking-wider text-neutral-500 mb-1">
                Recherche
              </label>
              <div className="relative">
                <Search
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
                />
                <input
                  type="text"
                  placeholder="Ville, nom du centre..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-primary-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Ville */}
            <div>
              <label className="block text-[11px] font-extrabold uppercase tracking-wider text-neutral-500 mb-1">
                Ville
              </label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-primary-500 focus:bg-white transition-all"
              >
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city === "Toutes" ? "Toutes les villes" : city}
                  </option>
                ))}
              </select>
            </div>

            {/* Type de don */}
            <div>
              <label className="block text-[11px] font-extrabold uppercase tracking-wider text-neutral-500 mb-1">
                Type de don
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {["Tous", "Sang total", "Plasma", "Plaquettes"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setSelectedType(type)}
                    className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition-all text-center ${selectedType === type
                      ? "bg-primary-600 text-white border-primary-600 shadow-xs"
                      : "bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-neutral-100"
                      }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Statut (Ouvert / Fermé) */}
            <div>
              <label className="block text-[11px] font-extrabold uppercase tracking-wider text-neutral-500 mb-1">
                Statut
              </label>
              <div className="grid grid-cols-3 gap-1">
                {[
                  { key: "Tous", label: "Tous" },
                  { key: "ouvert", label: "Ouvert" },
                  { key: "ferme", label: "Fermé" },
                ].map(({ key, label }) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedStatus(key)}
                    className={`py-1.5 px-1.5 rounded-lg text-xs font-semibold border transition-all text-center ${selectedStatus === key
                      ? "bg-neutral-900 text-white border-neutral-900"
                      : "bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-neutral-100"
                      }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Checkboxes Urgence & Mobile */}
            <div className="pt-2 border-t border-neutral-100 space-y-2">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={onlyUrgent}
                  onChange={(e) => setOnlyUrgent(e.target.checked)}
                  className="w-3.5 h-3.5 text-primary-600 rounded border-neutral-300 cursor-pointer"
                />
                <span className="text-xs font-medium text-neutral-700">
                  Besoin urgent uniquement
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={onlyMobile}
                  onChange={(e) => setOnlyMobile(e.target.checked)}
                  className="w-3.5 h-3.5 text-primary-600 rounded border-neutral-300 cursor-pointer"
                />
                <span className="text-xs font-medium text-neutral-700">
                  Collectes mobiles
                </span>
              </label>
            </div>
          </aside>

          {/* ================= CARTES RÉSULTATS ================= */}
          <main className="lg:col-span-3 space-y-5">
            {/* Compteur épuré */}
            <div className="flex items-center justify-between flex-wrap gap-2 bg-white px-4 py-3 rounded-xl border border-neutral-200/80 shadow-xs">
              <p className="text-xs font-semibold text-neutral-700">
                <strong className="text-neutral-900 font-bold">
                  {filteredCentres.length}
                </strong>{" "}
                {filteredCentres.length > 1
                  ? "centres trouvés"
                  : "centre trouvé"}
              </p>

              {userLocation && (
                <span className="text-[11px] font-medium text-neutral-600 bg-neutral-100 px-2.5 py-0.5 rounded-md">
                  📍 Triés du plus proche au plus éloigné
                </span>
              )}
            </div>

            {isLocating && (
              <div className="py-12 bg-white rounded-2xl border border-neutral-200 text-center flex flex-col items-center justify-center gap-2">
                <Droplet size={28} className="text-primary-600 animate-pulse" />
                <p className="text-xs font-medium text-neutral-600">
                  Géolocalisation en cours...
                </p>
              </div>
            )}

            {!isLocating && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredCentres.map((centre) => {
                  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${centre.coordonnees.lat},${centre.coordonnees.lng}`;
                  const calUrl = generateGoogleCalendarUrl(centre);

                  return (
                    <article
                      key={centre.id}
                      className="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                    >
                      <div>
                        {/* Ville & Statut */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="text-xs font-bold text-neutral-600 bg-neutral-100 px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                            {centre.ville}
                          </span>

                          <span
                            className={`text-xs font-medium px-2.5 py-0.5 rounded-md flex items-center gap-1.5 ${centre.realtime.isOpen
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                              : "bg-neutral-100 text-neutral-600"
                              }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${centre.realtime.isOpen
                                ? "bg-emerald-500"
                                : "bg-neutral-400"
                                }`}
                            />
                            {centre.realtime.label}
                          </span>
                        </div>

                        {/* Distances GPS */}
                        {centre.distance !== null && (
                          <p className="text-xs font-semibold text-primary-700 mb-2 flex items-center gap-1">
                            <Navigation size={12} className="text-primary-600" />
                            <span>À {centre.distance} km de vous</span>
                          </p>
                        )}

                        {/* Nom du centre */}
                        <h3 className="text-base font-bold text-neutral-900 leading-snug mb-1">
                          {centre.nom}
                        </h3>
                        <p className="text-xs text-neutral-500 font-normal mb-3">
                          {centre.nature}
                        </p>

                        {/* Alerte Urgence Épurée */}
                        {centre.isUrgent && (
                          <div className="p-2 rounded-lg bg-rose-50 border border-rose-100 text-rose-800 text-xs font-medium mb-3 flex items-center gap-1.5">
                            <Sparkles size={14} className="text-rose-600 flex-shrink-0" />
                            <span>
                              Besoin urgent : {centre.besoinUrgentGroupes.join(", ")}
                            </span>
                          </div>
                        )}

                        {/* Adresse & Horaires */}
                        <div className="space-y-2 mb-4 text-xs text-neutral-600">
                          <div className="flex items-start gap-2">
                            <MapPin size={14} className="text-neutral-400 flex-shrink-0 mt-0.5" />
                            <span>{centre.adresse}</span>
                          </div>

                          <div className="flex items-start gap-2">
                            <Clock size={14} className="text-neutral-400 flex-shrink-0 mt-0.5" />
                            <div>
                              <span>Lun-Ven : {centre.horaires.lundi}</span>
                              {centre.horaires.samedi !== "Fermé" && (
                                <span className="block text-neutral-400">
                                  Samedi : {centre.horaires.samedi}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Badges de don */}
                        <div className="flex flex-wrap items-center gap-1.5 mb-5">
                          {centre.typesDeDon.map((t) => (
                            <span
                              key={t}
                              className="text-[11px] font-medium text-neutral-700 bg-neutral-100 px-2 py-0.5 rounded"
                            >
                              {t}
                            </span>
                          ))}
                          <span className="text-[11px] text-neutral-500 bg-neutral-50 border border-neutral-200/60 px-2 py-0.5 rounded">
                            {centre.modalitesAccueil}
                          </span>
                        </div>
                      </div>

                      {/* 3 BOUTONS D'ACTION HARMONISÉS */}
                      <div className="grid grid-cols-3 gap-2 pt-3 border-t border-neutral-100 text-xs font-semibold">
                        <a
                          href={calUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2 px-2 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-[11px] transition-colors text-center flex items-center justify-center gap-1"
                        >
                          <Calendar size={12} className="text-neutral-600" />
                          <span>Rappel</span>
                        </a>

                        <a
                          href={`tel:${centre.telephone}`}
                          className="py-2 px-2 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-[11px] transition-colors text-center flex items-center justify-center gap-1"
                        >
                          <Phone size={12} className="text-emerald-600" />
                          <span>Appeler</span>
                        </a>

                        <a
                          href={mapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2 px-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white text-[11px] font-bold transition-colors text-center flex items-center justify-center gap-1 shadow-xs"
                        >
                          <Navigation size={12} />
                          <span>Itinéraire</span>
                        </a>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}

            {filteredCentres.length === 0 && !isLocating && (
              <div className="text-center py-12 bg-white rounded-2xl border border-neutral-200 p-6">
                <p className="text-xs text-neutral-600 font-medium mb-3">
                  Aucun centre ne correspond à vos filtres.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 rounded-xl bg-neutral-900 text-white text-xs font-bold hover:bg-neutral-800 transition-colors"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </section>
  );
}
