
export default function Logo({ className = "" }) {
  return (
    <div className={`relative w-10 h-10 flex-shrink-0 ${className}`}>
      <svg viewBox="0 0 40 40" className="w-full h-full" fill="none" aria-hidden="true">
        {/* Contour du cercle qui se trace */}
        <circle
          cx="20"
          cy="20"
          r="17"
          fill="none"
          stroke="#C62828"
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

        {/* Disque plein qui apparaît une fois le tracé terminé */}
        <circle
          cx="20"
          cy="20"
          r="17"
          fill="#C62828"
          className="animate-fill-circle motion-reduce:animate-none motion-reduce:opacity-100"
          style={{ opacity: 0 }}
        />

        {/* "L" majuscule dominant */}
        <text
          x="10.5"
          y="27.5"
          fontSize="19"
          fontWeight="800"
          fill="#FFFFFF"
          fontFamily="Inter, sans-serif"
          className="animate-fade-in-l motion-reduce:animate-none motion-reduce:opacity-100"
          style={{ opacity: 0 }}
        >
          L
        </text>

        {/* "s" minuscule, collé en bas du L */}
        <text
          x="23"
          y="27.5"
          fontSize="13"
          fontWeight="700"
          fill="#FFCDD2"
          fontFamily="Inter, sans-serif"
          className="animate-fade-in-s motion-reduce:animate-none motion-reduce:opacity-100"
          style={{ opacity: 0 }}
        >
          s
        </text>

        {/* Goutte de sang qui tombe et se pose au-dessus du "s" */}
        <path
          d="M26.2 8.5 C26.2 8.5, 29.6 13.2, 29.6 15.6 A3.2 3.2 0 0 1 22.8 15.6 C22.8 13.2, 26.2 8.5, 26.2 8.5 Z"
          fill="#FFFFFF"
          className="animate-drop-fall motion-reduce:animate-none motion-reduce:opacity-100"
          style={{ opacity: 0, transformOrigin: "26px 15.6px" }}
        />
      </svg>
    </div>
  );
}