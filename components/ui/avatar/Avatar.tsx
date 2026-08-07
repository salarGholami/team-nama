"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

type AvatarSize = "xs" | "sm" | "md" | "mdPlus" | "lg" | "xl";

interface AvatarProps extends Omit<
  ImageProps,
  "src" | "alt" | "width" | "height"
> {
  src?: string | null;
  alt: string;
  size?: AvatarSize;
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

export default function Avatar({
  src,
  alt,
  size = "xs",
  className = "",
  ...props
}: AvatarProps) {
  const [hasError, setHasError] = useState(false);
  const dimension = SIZE_MAP[size];
  const showImage = Boolean(src) && !hasError;

  return (
    <div
      className={`relative overflow-hidden rounded-full bg-slate-700 ring-1 ring-white/5 ${className}`}
      style={{ width: dimension, height: dimension }}
    >
      {showImage && (
        <Image
          src={src as string}
          alt={alt}
          width={dimension}
          height={dimension}
          className="object-cover w-full h-full"
          onError={() => setHasError(true)}
          sizes={`${dimension}px`}
          unoptimized
          {...props}
        />
      )}
    </div>
  );
}
