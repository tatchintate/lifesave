import { useEffect, useState, useRef } from "react";
import { MapPin, Menu, X, Heart, Activity, Calendar, HelpCircle, ShieldCheck, Sun, Moon } from "lucide-react";
import Logo from "../ui/Logo";
import { Button } from "../ui/Button";
import { cn } from "../../lib/utils";
import { useTheme } from "../../context/ThemeContext";

const NAV_LINKS = [
  { href: "#pourquoi", label: "Pourquoi donner", icon: Heart },
  { href: "#reserves", label: "Réserves", icon: Activity },
  { href: "#deroulement", label: "Déroulement", icon: Calendar },
  { href: "#eligibilite", label: "Suis-je éligible ?", icon: ShieldCheck },
  { href: "#ou-donner", label: "Où donner", icon: MapPin },
  { href: "#faq", label: "FAQ", icon: HelpCircle },
];

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const [activeHref, setActiveHref] = useState("#pourquoi");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [hoveredHref, setHoveredHref] = useState(null);
  
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });

  const lastScrollY = useRef(0);
  const navContainerRef = useRef(null);
  const linkRefs = useRef({});

  // 1. Masquage intelligent au défilement & détection de section active
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Ombre et arrière-plan au scroll
      setScrolled(currentScrollY > 20);

      // Cache la navbar vers le bas, la réaffiche au scroll vers le haut
      if (currentScrollY > 150) {
        if (currentScrollY > lastScrollY.current + 10) {
          setVisible(false);
        } else if (currentScrollY < lastScrollY.current - 10) {
          setVisible(true);
        }
      } else {
        setVisible(true);
      }
      lastScrollY.current = currentScrollY;

      // Détection dynamique de la section active
      const sectionIds = NAV_LINKS.map((link) => link.href.substring(1));
      const scrollPosition = currentScrollY + 200;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (section) {
          const top = section.offsetTop;
          if (scrollPosition >= top) {
            setActiveHref(`#${sectionIds[i]}`);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. Positionnement dynamique de la pilule d'arrière-plan sur desktop
  useEffect(() => {
    const targetHref = hoveredHref || activeHref;
    const targetEl = linkRefs.current[targetHref];
    const containerEl = navContainerRef.current;

    if (targetEl && containerEl) {
      const containerRect = containerEl.getBoundingClientRect();
      const targetRect = targetEl.getBoundingClientRect();

      setIndicatorStyle({
        left: targetRect.left - containerRect.left,
        width: targetRect.width,
        opacity: 1,
      });
    }
  }, [activeHref, hoveredHref]);

  // Smooth scroll
  const handleLinkClick = (href, e) => {
    e.preventDefault();
    setMobileOpen(false);
    setActiveHref(href);

    const targetId = href.substring(1);
    const targetEl = document.getElementById(targetId);

    if (targetEl) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = targetEl.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 transform",
        visible ? "translate-y-0" : "-translate-y-full",
        scrolled
          ? isDark
            ? "bg-[#0B1528]/95 border-b border-slate-800 shadow-md py-3 text-white"
            : "bg-[#F8F6F1]/95 backdrop-blur-md border-b border-neutral-200/80 shadow-xs py-3 text-neutral-900"
          : "bg-transparent py-4 sm:py-5 text-white"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Logo de la marque */}
        <a
          href="#"
          className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-lg p-1"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <Logo className="transition-transform duration-300 group-hover:scale-105" />
          <span className="text-xl sm:text-2xl font-extrabold tracking-tight">
            <span className={scrolled ? (isDark ? "text-white" : "text-neutral-900") : "text-white"}>
              Life
            </span>
            <span className="text-primary-600 dark:text-primary-400">Save</span>
          </span>
        </a>

        {/* Navigation Desktop */}
        <nav
          ref={navContainerRef}
          onMouseLeave={() => setHoveredHref(null)}
          className={cn(
            "hidden lg:flex items-center gap-1 relative px-1 py-1 rounded-full backdrop-blur-sm transition-colors",
            scrolled
              ? "bg-neutral-200/50 dark:bg-slate-800/60 border border-neutral-300/60 dark:border-slate-700/50"
              : "bg-slate-900/60 border border-white/15"
          )}
        >
          <div
            className={cn(
              "absolute top-1 bottom-1 rounded-full shadow-xs border transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] pointer-events-none",
              scrolled
                ? "bg-white dark:bg-slate-700 border-neutral-200/60 dark:border-slate-600"
                : "bg-white/20 border-white/30 backdrop-blur-md"
            )}
            style={{
              left: `${indicatorStyle.left}px`,
              width: `${indicatorStyle.width}px`,
              opacity: indicatorStyle.opacity,
            }}
          />

          {NAV_LINKS.map((link) => {
            const isActive = activeHref === link.href;
            return (
              <a
                key={link.href}
                ref={(el) => (linkRefs.current[link.href] = el)}
                href={link.href}
                onClick={(e) => handleLinkClick(link.href, e)}
                onMouseEnter={() => setHoveredHref(link.href)}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative z-10 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
                  scrolled
                    ? isActive
                      ? "text-primary-700 dark:text-primary-300 font-bold"
                      : "text-neutral-700 dark:text-slate-300 hover:text-neutral-900 dark:hover:text-white"
                    : isActive
                    ? "text-white font-bold"
                    : "text-slate-200 hover:text-white"
                )}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Action Desktop : Bouton Theme Switcher + CTA ROSE */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Toggle Thème (Clair / Sombre) */}
          <button
            onClick={toggleTheme}
            type="button"
            className={cn(
              "p-2.5 rounded-full border transition-all cursor-pointer",
              scrolled
                ? "bg-neutral-100 dark:bg-slate-800 text-neutral-700 dark:text-slate-200 border-neutral-200 dark:border-slate-700 hover:bg-neutral-200 dark:hover:bg-slate-700"
                : "bg-white/10 text-white border-white/20 hover:bg-white/20"
            )}
            title={isDark ? "Passer au mode clair" : "Passer au mode sombre"}
            aria-label="Basculer le thème"
          >
            {isDark ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className={scrolled ? "text-slate-700" : "text-amber-300"} />}
          </button>

          <Button
            variant="glow"
            size="sm"
            onClick={(e) => handleLinkClick("#ou-donner", e)}
            className="bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-600/20 cursor-pointer"
          >
            <MapPin size={15} />
            <span>Trouver un centre</span>
          </Button>
        </div>

        {/* Bouton Toggle Menu Mobile & Theme Switcher sur Mobile */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={toggleTheme}
            type="button"
            className="p-2 rounded-xl bg-neutral-100 dark:bg-slate-800 text-neutral-700 dark:text-slate-200 border border-neutral-200 dark:border-slate-700"
            aria-label="Basculer le thème"
          >
            {isDark ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-slate-700" />}
          </button>

          <button
            type="button"
            className="p-2 text-neutral-700 dark:text-slate-200 rounded-xl hover:bg-neutral-100 dark:hover:bg-slate-800 transition-colors focus-visible:outline-none"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      <div
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          mobileOpen ? "max-h-[420px] opacity-100 border-b border-neutral-200/80 dark:border-slate-800 shadow-lg" : "max-h-0 opacity-0"
        )}
      >
        <div className="bg-white/95 dark:bg-[#0B1528]/95 backdrop-blur-xl px-5 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link, idx) => {
              const isActive = activeHref === link.href;
              const Icon = link.icon;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(link.href, e)}
                  className={cn(
                    "flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200",
                    isActive
                      ? "bg-primary-50 dark:bg-primary-950/50 text-primary-700 dark:text-primary-300 font-bold"
                      : "text-neutral-700 dark:text-slate-300 hover:bg-neutral-100/80 dark:hover:bg-slate-800/80 hover:text-neutral-900 dark:hover:text-white"
                  )}

                  style={{
                    transitionDelay: mobileOpen ? `${idx * 35}ms` : "0ms",
                    transform: mobileOpen ? "translateY(0)" : "translateY(-6px)",
                    opacity: mobileOpen ? 1 : 0,
                  }}
                >
                  <span className="flex items-center gap-2.5">
                    {Icon && <Icon size={17} className={isActive ? "text-primary-600" : "text-neutral-400"} />}
                    {link.label}
                  </span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-primary-600" />}
                </a>
              );
            })}
          </nav>

          <div className="pt-2">
            <Button
              variant="glow"
              size="md"
              fullWidth
              onClick={(e) => handleLinkClick("#ou-donner", e)}
              className="bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-600/20 cursor-pointer"
            >
              <MapPin size={16} />
              <span>Trouver un centre de don</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}