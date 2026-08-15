import { useEffect, useState, useRef } from "react";
import { MapPin, Menu, X, Heart, Activity, Calendar, HelpCircle, ShieldCheck } from "lucide-react";
import Logo from "../ui/Logo";
import { Button } from "../ui/Button";
import { cn } from "../../lib/utils";

const NAV_LINKS = [
  { href: "#pourquoi", label: "Pourquoi donner", icon: Heart },
  { href: "#reserves", label: "Réserves", icon: Activity },
  { href: "#deroulement", label: "Déroulement", icon: Calendar },
  { href: "#eligibilite", label: "Suis-je éligible ?", icon: ShieldCheck },
  { href: "#ou-donner", label: "Où donner", icon: MapPin },
  { href: "#faq", label: "FAQ", icon: HelpCircle },
];

export default function Navbar() {
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
      
      // Etat "compact" au scroll
      setScrolled(currentScrollY > 20);

      // Masquage intelligent (Slide UP en descendant, Slide DOWN en remontant)
      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY.current + 5) {
          setVisible(false);
        } else if (currentScrollY < lastScrollY.current - 5) {
          setVisible(true);
        }
      } else {
        setVisible(true);
      }
      
      lastScrollY.current = currentScrollY;

      // Détection exacte de la section active selon l'ordre du DOM
      const sectionIds = ["pourquoi", "reserves", "deroulement", "eligibilite", "ou-donner", "faq"];
      const scrollPosition = currentScrollY + 140;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const top = el.offsetTop;
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

  // 2. Calcul et animation du soulignement glissant (Sliding Pill Indicator)
  const targetHref = hoveredHref || activeHref;

  useEffect(() => {
    const activeEl = linkRefs.current[targetHref];
    const containerEl = navContainerRef.current;

    if (activeEl && containerEl) {
      const activeRect = activeEl.getBoundingClientRect();
      const containerRect = containerEl.getBoundingClientRect();

      setIndicatorStyle({
        left: activeRect.left - containerRect.left,
        width: activeRect.width,
        opacity: 1,
      });
    } else {
      setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [targetHref]);

  // Recalcul au redimensionnement de l'écran
  useEffect(() => {
    const handleResize = () => {
      const activeEl = linkRefs.current[targetHref];
      const containerEl = navContainerRef.current;
      if (activeEl && containerEl) {
        const activeRect = activeEl.getBoundingClientRect();
        const containerRect = containerEl.getBoundingClientRect();
        setIndicatorStyle({
          left: activeRect.left - containerRect.left,
          width: activeRect.width,
          opacity: 1,
        });
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [targetHref]);

  // Navigation fluide
  const handleLinkClick = (href, e) => {
    e.preventDefault();
    setActiveHref(href);
    setMobileOpen(false);

    const target = document.querySelector(href);
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
        visible ? "translate-y-0" : "-translate-y-full",
        scrolled
          ? "bg-white/85 backdrop-blur-xl border-b border-neutral-200/70 shadow-sm py-2.5"
          : "bg-white/60 backdrop-blur-md border-b border-transparent py-4"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Branding & Logo */}
        <a
          href="#"
          className="flex items-center gap-2.5 group transition-opacity duration-200 hover:opacity-90"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <Logo className="transition-transform duration-300 group-hover:scale-105" />
          <span className="text-xl sm:text-2xl font-extrabold tracking-tight">
            <span className="text-neutral-900">Life</span>
            <span className="text-primary-600">Save</span>
          </span>
        </a>

        {/* Navigation Desktop */}
        <nav
          ref={navContainerRef}
          onMouseLeave={() => setHoveredHref(null)}
          className="hidden lg:flex items-center gap-1 relative px-1 py-1 rounded-full bg-neutral-100/60 border border-neutral-200/50 backdrop-blur-sm"
        >
          <div
            className="absolute top-1 bottom-1 bg-white rounded-full shadow-sm border border-neutral-200/60 transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] pointer-events-none"
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
                  isActive
                    ? "text-primary-700 font-bold"
                    : "text-neutral-600 hover:text-neutral-900"
                )}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Bouton CTA "Trouver un centre" */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            variant="glow"
            size="sm"
            onClick={(e) => handleLinkClick("#ou-donner", e)}
            className="bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-600/20"
          >
            <MapPin size={15} />
            <span>Trouver un centre</span>
          </Button>
        </div>

        {/* Bouton Toggle Menu Mobile */}
        <button
          type="button"
          className="lg:hidden p-2 text-neutral-700 rounded-xl hover:bg-neutral-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Menu Mobile */}
      <div
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          mobileOpen ? "max-h-[420px] opacity-100 border-b border-neutral-200/80 shadow-lg" : "max-h-0 opacity-0"
        )}
      >
        <div className="bg-white/95 backdrop-blur-xl px-5 pt-3 pb-6 space-y-3">
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
                      ? "bg-primary-50 text-primary-700 font-bold"
                      : "text-neutral-700 hover:bg-neutral-100/80 hover:text-neutral-900"
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
              className="bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-600/20"
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