"use client";

export default function GradientOverlay() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-70">
      <div
        className="absolute inset-0"
        style={{ background: "var(--gradient-overlay)" }}
      />
    </div>
  );
}
