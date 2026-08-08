import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Only on devices with a real mouse — never on phones/tablets.
    if (window.matchMedia('(pointer: coarse)').matches) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    if (!dot) return;

    let hovering = false;

    // Write straight to the DOM — a React state update per mousemove would
    // re-render on every pixel of movement.
    const updatePosition = (e: MouseEvent) => {
      dot.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0) scale(${hovering ? 3 : 1})`;
    };

    const updateHoverState = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const next = Boolean(target.closest('button') || target.closest('a'));
      if (next !== hovering) {
        hovering = next;
        dot.classList.toggle('bg-primary', next);
        dot.classList.toggle('opacity-50', next);
        dot.classList.toggle('bg-white', !next);
        dot.classList.toggle('opacity-100', !next);
      }
    };

    window.addEventListener('mousemove', updatePosition, { passive: true });
    window.addEventListener('mouseover', updateHoverState, { passive: true });

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', updateHoverState);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={dotRef}
      className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[100] transition-transform duration-100 ease-out mix-blend-difference bg-white opacity-100"
    />
  );
}
