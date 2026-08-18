export default function Logo({ className = "" }) {
  return (
    <div className={`relative w-10 h-10 flex-shrink-0 ${className}`}>
      <svg viewBox="0 0 40 40" className="w-full h-full" fill="none" aria-hidden="true">
        {/* Contour du cercle en bleu sapphire */}
        <circle
          cx="20"
          cy="20"
          r="17"
          fill="none"
          stroke="#1B4B7A"
          strokeWidth="2.5"
          strokeLinecap="round"
          pathLength="100"
          className="animate-draw-circle motion-reduce:animate-none motion-reduce:opacity-100"
          style={{
            strokeDasharray: 100,
            strokeDashoffset: 100,
            transform: "rotate(-90deg)",
            transformOrigin: "20px 20px",
          }}
        />

        {/* Disque plein BLANC qui apparaît */}
        <circle
          cx="20"
          cy="20"
          r="17"
          fill="#FFFFFF"
          className="animate-fill-circle motion-reduce:animate-none motion-reduce:opacity-100"
          style={{ opacity: 0 }}
        />

        {/* "L" majuscule dominant en BLEU SAPPHIRE */}
        <text
          x="10.5"
          y="27.5"
          fontSize="19"
          fontWeight="800"
          fill="#1B4B7A"
          fontFamily="Inter, sans-serif"
          className="animate-fade-in-l motion-reduce:animate-none motion-reduce:opacity-100"
          style={{ opacity: 0 }}
        >
          L
        </text>

        {/* "s" minuscule en BLEU CLAIR */}
        <text
          x="23"
          y="27.5"
          fontSize="13"
          fontWeight="700"
          fill="#4A90D9"
          fontFamily="Inter, sans-serif"
          className="animate-fade-in-s motion-reduce:animate-none motion-reduce:opacity-100"
          style={{ opacity: 0 }}
        >
          s
        </text>

        {/* Goutte de sang — SEUL élément rouge, l'accent de la marque */}
        <path
          d="M26.2 8.5 C26.2 8.5, 29.6 13.2, 29.6 15.6 A3.2 3.2 0 0 1 22.8 15.6 C22.8 13.2, 26.2 8.5, 26.2 8.5 Z"
          fill="#C62828"
          className="animate-drop-fall motion-reduce:animate-none motion-reduce:opacity-100"
          style={{ opacity: 0, transformOrigin: "26px 15.6px" }}
        />
      </svg>
    </div>
  );
}
