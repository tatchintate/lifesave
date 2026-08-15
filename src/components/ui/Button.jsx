// components/ui/Button.jsx
import React, { useRef } from "react";
import { cn } from "../../lib/utils";

const baseStyles = "relative inline-flex items-center justify-center gap-2.5 rounded-full font-semibold transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-95 active:duration-100 overflow-hidden group";

const variantStyles = {
  primary: "bg-primary-600 text-white shadow-md shadow-primary-900/10 hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-600/25 hover:-translate-y-0.5",
  glow: "bg-rose-600 text-white shadow-sm shadow-rose-500/15 hover:bg-rose-700 hover:shadow-md hover:shadow-rose-500/25 hover:-translate-y-0.5 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgba(255,255,255,0.35)_0%,transparent_60%)] before:opacity-0 group-hover:before:opacity-100 before:transition-opacity before:duration-300",

  secondary: "bg-secondary-600 text-white shadow-md shadow-secondary-900/10 hover:bg-secondary-700 hover:shadow-lg hover:shadow-secondary-600/25 hover:-translate-y-0.5",
  outline: "bg-transparent text-neutral-800 border border-neutral-300/80 shadow-sm hover:border-primary-600 hover:text-primary-700 hover:bg-primary-50/50 hover:-translate-y-0.5 hover:shadow-md",
  ghost: "bg-transparent text-neutral-700 hover:bg-neutral-100/80 hover:text-neutral-900 hover:-translate-y-0.5",
  glass: "bg-white/70 backdrop-blur-md text-neutral-900 border border-white/80 shadow-sm hover:bg-white/90 hover:shadow-md hover:-translate-y-0.5",
};

const sizeStyles = {
  sm: "px-4 py-2 text-xs md:text-sm font-medium",
  md: "px-5 py-2.5 text-sm font-semibold",
  lg: "px-7 py-3.5 text-base font-semibold",
  xl: "px-8 py-4 text-lg font-bold",
  icon: "p-2.5 text-sm rounded-full",
};


// Composant Button interactif avec gestion du pointeur pour l'effet Glow Magnétique
const Button = React.forwardRef(({
  className,
  variant,
  size,
  fullWidth,
  children,
  onMouseMove,
  ...props
}, ref) => {
  const btnRef = useRef(null);

  const handleMouseMove = (e) => {
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      btnRef.current.style.setProperty("--mouse-x", `${x}px`);
      btnRef.current.style.setProperty("--mouse-y", `${y}px`);
    }
    if (onMouseMove) onMouseMove(e);
  };

  return (
    <button
      ref={(node) => {
        btnRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      }}
      onMouseMove={handleMouseMove}
      className={cn(
        baseStyles,
        variantStyles[variant] || variantStyles.primary,
        sizeStyles[size] || sizeStyles.md,
        fullWidth && "w-full justify-center",
        className
      )}
      {...props}
    >
      {/* Reflet lumineux au survol */}
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
});

Button.displayName = "Button";

export { Button };