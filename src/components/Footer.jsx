import React from "react";
import Logo from "./Logo";
import {
  Heart,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import heroImg from "../assets/hero.jpg";

export default function Footer() {
  return (
    <footer className="relative bg-[#0B1528] text-white pt-14 pb-8 border-t border-neutral-800/80 overflow-hidden">
      {/* Image d'arrière-plan hero.jpg parfaitement visible sous filtre bleu nuit */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src={heroImg}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center filter brightness-85 contrast-110 opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1528]/95 via-[#0B1528]/80 to-[#0B1528]/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1528] via-[#0B1528]/40 to-[#0B1528]/70" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 items-start">
          {/* Col 1: Brand & Slogan (Logo et texte LifeSave conservés en Blanc & Bleu) */}
          <div className="space-y-3">
            <a href="#" className="flex items-center gap-3 group">
              <Logo size="md" />
              <span className="text-2xl font-black tracking-tight text-white">
                Life<span className="text-primary-400">Save</span>
              </span>
            </a>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-sm">
              Plateforme d'information, de simulation d'éligibilité et de cartographie des centres de don de sang au Bénin.
            </p>
          </div>

          {/* Col 2: Navigation rapide (Éléments d'accentuation en Rose Corail) */}
          <div>
            <h4 className="font-extrabold text-xs uppercase tracking-widest mb-3 text-rose-400">
              Navigation
            </h4>
            <ul className="grid grid-cols-2 gap-2 text-xs text-neutral-300 font-medium">
              {[
                { name: "Pourquoi donner ?", href: "#pourquoi" },
                { name: "Test d'éligibilité", href: "#eligibilite" },
                { name: "Déroulement", href: "#deroulement" },
                { name: "Où donner", href: "#ou-donner" },
                { name: "Réserves", href: "#reserves" },
                { name: "FAQ", href: "#faq" },
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="hover:text-rose-300 transition-colors inline-flex items-center gap-1"
                  >
                    <ChevronRight size={12} className="text-rose-500" />
                    <span>{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact & Urgences ANTS (Accents en Rose Corail) */}
          <div>
            <h4 className="font-extrabold text-xs uppercase tracking-widest mb-3 text-rose-400">
              Contact & Urgences
            </h4>
            <ul className="space-y-2 text-xs text-neutral-300">
              <li className="flex items-center gap-2">
                <MapPin size={14} className="text-rose-400 flex-shrink-0" />
                <span>ANTS Bénin — Quartier Saint-Michel, Cotonou</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-emerald-400 flex-shrink-0" />
                <a
                  href="tel:+2290121320435"
                  className="hover:text-white font-bold text-neutral-100 transition-colors"
                >
                  +229 01 21 32 04 35
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-rose-400 flex-shrink-0" />
                <a
                  href="mailto:contact@lifesave.bj"
                  className="hover:text-white transition-colors"
                >
                  contact@lifesave.bj
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Ligne inférieure simplifiée et épurée avec lien Portfolio */}
        <div className="pt-6 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-400">
          <p>© 2026 LifeSave. Tous droits réservés.</p>
          <p className="flex items-center gap-1.5 font-medium text-neutral-300">
            <span>Conçu et développé avec passion par</span>
            <a
              href="https://portofoliolarissakoussey.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-rose-400 hover:text-rose-300 font-extrabold underline underline-offset-4 inline-flex items-center gap-1 transition-colors"
              title="Visiter le portfolio de LARISSA KOUSSEY"
            >
              <span>LARISSA KOUSSEY</span>
              <ExternalLink size={12} className="text-rose-400" />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
