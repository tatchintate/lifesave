import React, { useState, useMemo } from "react";
import { Search, MapPin, Clock, Phone, Navigation, CheckCircle, ExternalLink } from "lucide-react";
import { centres } from "../data/centres";


export default function Centers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("Tous");

  const filteredCentres = useMemo(() => {
    return centres.filter((c) => {
      const matchSearch =
        c.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.ville.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.adresse.toLowerCase().includes(searchTerm.toLowerCase());

      const matchType =
        selectedType === "Tous" || c.typesDeDon.includes(selectedType);

      return matchSearch && matchType;
    });
  }, [searchTerm, selectedType]);

  return (
    <section id="ou-donner" className="py-20 bg-background border-t border-neutral-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* En-tête de section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-primary-700 bg-primary-100/70 border border-primary-200/80 rounded-full px-3.5 py-1 mb-4">
              C6 — Où donner
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight">
              Rechercher un <span className="text-primary-700">centre de don</span>
            </h2>
            <p className="text-base text-neutral-600 leading-relaxed mt-2 max-w-2xl">
              Consultez les 8 centres de transfusion répertoriés au Bénin, leurs horaires d'ouverture et leurs coordonnées directes.
            </p>
          </div>
        </div>

        {/* Barre de Recherche et Filtres */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 border border-neutral-200/80 shadow-sm mb-10 flex flex-col md:flex-row items-center gap-4">
          {/* Recherche textuelle */}
          <div className="relative w-full md:w-1/2">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Rechercher par ville (ex: Cotonou, Parakou...) ou nom..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-neutral-50 border border-neutral-200 text-neutral-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all"
            />
          </div>

          {/* Filtres par type de don */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {["Tous", "Sang total", "Plasma", "Plaquettes"].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap border transition-all ${
                  selectedType === type
                    ? "bg-primary-600 text-white border-primary-600 shadow-md"
                    : "bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-neutral-100"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Grille des Centres */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCentres.map((c) => {
            const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${c.coordonnees.lat},${c.coordonnees.lng}`;

            return (
              <div
                key={c.id}
                className="bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Badge statut et nature */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <span className="text-xs font-bold text-primary-700 uppercase tracking-wider bg-primary-50 px-3 py-1 rounded-full border border-primary-100">
                      {c.ville}
                    </span>
                    <span
                      className={`text-xs font-extrabold px-3 py-1 rounded-full ${
                        c.estOuvert
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-neutral-100 text-neutral-600"
                      }`}
                    >
                      {c.estOuvert ? "Ouvert" : "Sur RDV"}
                    </span>
                  </div>

                  {/* Nom du centre */}
                  <h3 className="text-lg font-extrabold text-neutral-900 leading-snug mb-2">
                    {c.nom}
                  </h3>
                  <p className="text-xs text-neutral-500 font-medium mb-4">
                    {c.nature}
                  </p>

                  {/* Coordonnées & Horaires */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-600">
                      <MapPin size={16} className="text-primary-600 flex-shrink-0 mt-0.5" />
                      <span>{c.adresse}</span>
                    </div>

                    <div className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-600">
                      <Clock size={16} className="text-neutral-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-neutral-800">Lun - Ven : {c.horaires.lundi}</p>
                        <p className="text-neutral-500 text-xs">Samedi : {c.horaires.samedi}</p>
                      </div>
                    </div>
                  </div>

                  {/* Badges types de don */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {c.typesDeDon.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] font-bold text-neutral-700 bg-neutral-100 px-2.5 py-1 rounded-lg"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Boutons d'action */}
                <div className="flex items-center gap-3 pt-4 border-t border-neutral-100">
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-900 text-xs font-bold transition-colors"
                  >
                    <Navigation size={14} />
                    <span>Itinéraire</span>
                  </a>
                  <a
                    href={`tel:${c.telephone}`}
                    className="inline-flex items-center justify-center p-2.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                    title={`Appeler ${c.telephone}`}
                  >
                    <Phone size={16} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {filteredCentres.length === 0 && (
          <div className="text-center py-12 bg-white rounded-3xl border border-neutral-200">
            <p className="text-neutral-600 font-semibold">Aucun centre ne correspond à votre recherche.</p>
            <button
              onClick={() => { setSearchTerm(""); setSelectedType("Tous"); }}
              className="mt-3 text-xs font-bold text-primary-600 hover:underline"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
