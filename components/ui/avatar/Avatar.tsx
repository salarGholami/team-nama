"use client";

import Image, { type ImageProps } from "next/image";
import { useState, useMemo } from "react";

type AvatarSize = "xs" | "sm" | "md" | "mdPlus" | "lg" | "xl";

interface AvatarProps extends Omit<
  ImageProps,
  "src" | "alt" | "width" | "height"
> {
  src?: string | null;
  alt: string;
  size?: AvatarSize;
  fallbackSrc?: string;
  className?: string;
}

const SIZE_MAP: Record<AvatarSize, number> = {
  xs: 24,
  sm: 32,
  md: 40,
  mdPlus: 44,
  lg: 56,
  xl: 72,
};

const DEFAULT_FALLBACK = "/images/avatar/images.png"; // ✅ مطمئن شو وجود دارد

export default function Avatar({
  src,
  alt,
  size = "xs",
  fallbackSrc = DEFAULT_FALLBACK,
  className = "",
  ...props
}: AvatarProps) {
  const [hasError, setHasError] = useState(false);

  const dimension = SIZE_MAP[size];

  const imageSrc = useMemo(() => {
    if (!src || hasError) return fallbackSrc;
    return src;
  }, [src, hasError, fallbackSrc]);

  return (
    <div
      className={`relative overflow-hidden rounded-full bg-muted ring-1 ring-transparent transition ${className}`}
      style={{ width: dimension, height: dimension }}
    >
      <Image
        src={imageSrc}
        alt={alt}
        width={dimension}
        height={dimension}
        className="object-cover"
        onError={() => setHasError(true)}
        sizes={`${dimension}px`}
        priority={dimension >= 56}
        unoptimized={true} // ✅ رفع مشکل SVG خارجی
        {...props}
      />
    </div>
  );
}
