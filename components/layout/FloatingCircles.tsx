"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Star = {
  id: number;
  top: number;
  left: number;
  delay: number;
  duration: number;
};

export default function FloatingStars() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const generated: Star[] = Array.from({ length: 120 }).map((_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      delay: i * 0.025, // ترتیب ورود
      duration: Math.random() * 2 + 1.5,
    }));

    setStars(generated);
  }, []);

  if (!stars.length) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-[var(--circle-color)]"
          style={{
            width: "2px",
            height: "2px",
            top: `${star.top}%`,
            left: `${star.left}%`,
            filter: "drop-shadow(0 0 6px rgba(255,255,255,0.6))",
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.2, 1, 0.3],
            scale: [1, 1.6, 1],
          }}
          transition={{
            delay: star.delay,
            duration: star.duration,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
