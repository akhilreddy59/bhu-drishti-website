"use client";

import { useEffect, useRef, useState } from "react";

export function CountUp({ value }: { value: number | null }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(value === null ? null : 0);

  useEffect(() => {
    if (value === null || !ref.current) { setCount(null); return; }
    const element = ref.current;
    let frame = 0;
    let startedAt = 0;
    let active = false;
    const duration = 850;
    const animate = (time: number) => {
      if (!startedAt) startedAt = time;
      const progress = Math.min(1, (time - startedAt) / duration);
      setCount(Math.round(value * progress));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !active) {
        active = true;
        frame = requestAnimationFrame(animate);
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    observer.observe(element);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [value]);

  return <span ref={ref} aria-label={value === null ? "Public count unavailable" : String(value)}>{count === null ? "—" : count.toLocaleString()}</span>;
}
