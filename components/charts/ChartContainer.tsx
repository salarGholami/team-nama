// components/charts/ChartContainer.tsx
"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  height?: number;
  children: React.ReactNode;
};

export default function ChartContainer({ height = 280, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (width > 0 && height > 0) setReady(true);
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} dir="rtl" className="w-full min-w-0" style={{ height }}>
      {ready ? children : null}
    </div>
  );
}
