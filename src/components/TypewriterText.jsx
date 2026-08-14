import React, { useEffect, useState } from "react";
import useReducedMotion from "../hooks/useReducedMotion";

export default function TypewriterText({
  text,
  as: Tag = "span",
  speed = 45,
  startDelay = 250,
  className = "",
}) {
  const reduced = useReducedMotion();
  const [count, setCount] = useState(reduced ? text.length : 0);
  const done = count >= text.length;

  useEffect(() => {
    if (reduced) return;
    let intervalId;
    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        setCount((c) => {
          const next = c + 1;
          if (next >= text.length) {
            clearInterval(intervalId);
            return text.length;
          }
          return next;
        });
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [text, speed, startDelay, reduced]);

  const renderLines = (value) =>
    value.split("\n").map((line, i, arr) => (
      <React.Fragment key={i}>
        {line}
        {i < arr.length - 1 && <br />}
      </React.Fragment>
    ));

  return (
    <Tag className={`relative inline-block ${className}`}>
      {/* Réserve la place finale du texte : invisible mais dans le flux */}
      <span className="invisible" aria-hidden="true">
        {renderLines(text)}
      </span>

      {/* Texte animé, superposé par-dessus */}
      <span className="absolute inset-0" aria-hidden="true">
        {renderLines(text.slice(0, count))}
        {!done && (
          <span
            className="inline-block w-[3px] h-[0.8em] bg-current ml-1 align-middle animate-caret-blink motion-reduce:hidden"
          />
        )}
      </span>

      <span className="sr-only">{text.replace(/\n/g, " ")}</span>
    </Tag>
  );
}