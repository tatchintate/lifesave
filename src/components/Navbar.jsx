import { useState } from "react";
import { MapPin, Menu, X } from "lucide-react";
import Logo from "./Logo";

const NAV_LINKS = [
  { href: "#pourquoi", label: "Pourquoi donner" },
  { href: "#eligibilite", label: "Suis-je éligible ?" },
  { href: "#deroulement", label: "Le déroulement" },
  { href: "#ou-donner", label: "Où donner" },
  { href: "#reserves", label: "Réserves" },
  { href: "#faq", label: "FAQ" },
];

export default function Navbar() {
  const [activeHref, setActiveHref] = useState("#pourquoi");
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 h-20 bg-white/90 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Branding */}
        <a href="#" className="flex items-center gap-3">
          <Logo />
          <span className="text-2xl font-extrabold tracking-tight">
            <span className="text-neutral-900">Life</span>
            <span className="text-primary-400">Save</span>
          </span>
        </a>

        {/* Menu desktop */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = activeHref === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setActiveHref(link.href)}
                aria-current={isActive ? "page" : undefined}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 ${
                  isActive
                    ? "bg-primary-50 text-primary-700"
                    : "text-neutral-700 hover:bg-primary-50 hover:text-primary-700"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-primary-700 hover:bg-primary-800 active:bg-primary-900 text-white text-sm font-semibold px-5 py-2.5 shadow-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2"
          >
            <MapPin size={18} />
            Trouver un centre
          </button>
        </div>

        {/* Toggle mobile */}
        <button
          type="button"
          className="lg:hidden p-2 text-neutral-800 rounded-lg hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menu mobile */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-neutral-200 bg-white px-4 pb-4 pt-2">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => {
                  setActiveHref(link.href);
                  setMobileOpen(false);
                }}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeHref === link.href
                    ? "bg-primary-50 text-primary-700"
                    : "text-neutral-700 hover:bg-neutral-100"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <button
            type="button"
            className="mt-3 w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary-700 hover:bg-primary-800 text-white text-sm font-semibold px-5 py-2.5 transition-colors"
          >
            <MapPin size={18} />
            Trouver un centre
          </button>
        </div>
      )}
    </header>
  );
}