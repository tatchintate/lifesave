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

export default function Footer() {
  return (
    <footer className="bg-[#141312] text-white pt-12 pb-8 border-t border-neutral-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 items-start">
          {/* Col 1: Brand & Slogan */}
          <div className="space-y-3">
            <a href="#" className="flex items-center gap-3 group">
              <Logo size="md" />
              <span className="text-2xl font-black tracking-tight text-white group-hover:text-primary-400 transition-colors">
                Life<span className="text-primary-500">Save</span>
              </span>
            </a>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-sm">
              Plateforme d'information, de simulation d'éligibilité et de cartographie des centres de don de sang au Bénin.
            </p>
          </div>

          {/* Col 2: Navigation rapide */}
          <div>
            <h4 className="font-extrabold text-white text-xs uppercase tracking-widest mb-3 text-primary-400">
              Navigation
            </h4>
            <ul className="grid grid-cols-2 gap-2 text-xs text-neutral-400 font-medium">
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
                    className="hover:text-white transition-colors inline-flex items-center gap-1"
                  >
                    <ChevronRight size={12} className="text-primary-500" />
                    <span>{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact & Urgences ANTS */}
          <div>
            <h4 className="font-extrabold text-white text-xs uppercase tracking-widest mb-3 text-primary-400">
              Contact & Urgences
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li className="flex items-center gap-2">
                <MapPin size={14} className="text-primary-500 flex-shrink-0" />
                <span>ANTS Bénin — Quartier Saint-Michel, Cotonou</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-emerald-400 flex-shrink-0" />
                <a
                  href="tel:+2290121320435"
                  className="hover:text-white font-bold text-neutral-200 transition-colors"
                >
                  +229 01 21 32 04 35
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-primary-400 flex-shrink-0" />
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
              className="text-primary-400 hover:text-primary-300 font-extrabold underline underline-offset-4 inline-flex items-center gap-1 transition-colors"
              title="Visiter le portfolio de LARISSA KOUSSEY"
            >
              <span>LARISSA KOUSSEY</span>
              <ExternalLink size={12} className="text-primary-400" />
            </a>
            <Heart size={13} className="text-primary-500 fill-primary-500 ml-0.5 animate-pulse" />
          </p>
        </div>
      </div>
    </footer>
  );
}
