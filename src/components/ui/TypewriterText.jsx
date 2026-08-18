import { useState, useEffect, useRef } from "react";

export default function TypewriterText({ text, className = "", speed = 40, delay = 200 }) {
  const [displayedText, setDisplayedText] = useState("");
  const [isStarted, setIsStarted] = useState(false);
  const intervalRef = useRef(null);
  const startTimerRef = useRef(null);

  // (Re)initialise lorsque le texte change
  useEffect(() => {
    setDisplayedText("");
    setIsStarted(false);
    if (startTimerRef.current) clearTimeout(startTimerRef.current);
    startTimerRef.current = setTimeout(() => setIsStarted(true), delay);
    return () => {
      if (startTimerRef.current) clearTimeout(startTimerRef.current);
    };
  }, [text, delay]);

  // Lance l'intervalle d'écriture une fois démarré
  useEffect(() => {
    if (!isStarted) return;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayedText((prev) => {
        const next = text.slice(0, prev.length + 1);
        if (next.length === text.length) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
        }
        return next;
      });
    }, speed);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [isStarted, text, speed]);

  return (
    <span className={className}>
      {displayedText}
      {displayedText.length < text.length && (
        <span className="inline-block w-1.5 h-6 ml-1 bg-primary-600 animate-pulse align-middle" />
      )}
    </span>
  );
}
