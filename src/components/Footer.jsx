import React from "react";
import Logo from "./Logo";
import { Heart, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white pt-16 pb-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Logo & Slogan */}
          <div className="md:col-span-2 space-y-4">
            <a href="#" className="flex items-center gap-3">
              <Logo size="md" />
              <span className="text-2xl font-black tracking-tight text-white">
                Life<span className="text-primary-400">Save</span>
              </span>
            </a>
            <p className="text-sm text-neutral-400 leading-relaxed max-w-sm">
              Plateforme d'information et de sensibilisation au don de sang. Faciliter l'accès aux centres et déconstruire les tabous pour sauver plus de vies.
            </p>
          </div>

          {/* Navigation Rapide */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4">
              Sections
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              <li>
                <a href="#pourquoi" className="hover:text-white transition-colors">
                  Pourquoi donner
                </a>
              </li>
              <li>
                <a href="#eligibilite" className="hover:text-white transition-colors">
                  Test d'éligibilité
                </a>
              </li>
              <li>
                <a href="#deroulement" className="hover:text-white transition-colors">
                  Déroulement
                </a>
              </li>
              <li>
                <a href="#ou-donner" className="hover:text-white transition-colors">
                  Où donner (8 centres)
                </a>
              </li>
              <li>
                <a href="#reserves" className="hover:text-white transition-colors">
                  Réserves de sang
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Partenaires & Crédits */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4">
              Partenaires & Challenge
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              <li className="font-medium text-white">Figma to Code Challenge — Édition 4</li>
              <li>
                <a href="https://digishub.bj" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors inline-flex items-center gap-1">
                  <span>Digis Hub</span>
                  <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a href="https://chariow.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors inline-flex items-center gap-1">
                  <span>Chariow</span>
                  <ExternalLink size={12} />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Barre inférieure */}
        <div className="pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© 2026 LifeSave / HemoLink. Tous droits réservés.</p>
          <p className="flex items-center gap-1">
            Conçu avec <Heart size={12} className="text-primary-500 fill-primary-500" /> pour le Don de Sang
          </p>
        </div>
      </div>
    </footer>
  );
}
