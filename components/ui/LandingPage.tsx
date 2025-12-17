"use client";

import FloatingStars from "../layout/FloatingCircles";
import GradientOverlay from "../layout/GradientOverlay";


export default function LandingPage() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
      {/* Stars */}
      <FloatingStars />

      {/* Gradient + Noise */}
      <GradientOverlay />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <h1 className="text-5xl font-bold">Landing Page</h1>
      </div>
    </div>
  );
}
