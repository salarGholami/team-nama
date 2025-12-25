"use client";

import { motion } from "framer-motion";

const ORBS = [
  { size: 600, x: -20, y: -10, color: "rgba(0,255,200,0.35)" },
  { size: 480, x: 20, y: 70, color: "rgba(0,180,255,0.35)" },
  { size: 520, x: 70, y: 10, color: "rgba(0,140,255,0.35)" },
  { size: 360, x: 10, y: 40, color: "rgba(0,255,180,0.25)" },
  { size: 300, x: 85, y: 65, color: "rgba(0,200,255,0.25)" },
  { size: 260, x: 50, y: 80, color: "rgba(0,255,220,0.2)" },
  { size: 240, x: 5, y: 75, color: "rgba(0,160,255,0.2)" },
  { size: 200, x: 40, y: 20, color: "rgba(0,255,200,0.2)" }
];

export default function NebulaField() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {ORBS.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-[140px] mix-blend-screen"
          style={{
            width: orb.size,
            height: orb.size,
            background: orb.color,
            top: `${orb.y}%`,
            left: `${orb.x}%`
          }}
          animate={{
            x: [0, 120, -80, 0],
            y: [0, -100, 80, 0],
            scale: [1, 1.25, 0.95, 1]
          }}
          transition={{
            duration: 25 + i * 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* subtle film grain */}
      <div className="absolute inset-0 bg-noise opacity-[0.035]" />
    </div>
  );
}
