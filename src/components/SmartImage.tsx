import { useEffect, useRef, useState } from "react";
import placeholder from "@/assets/placeholder.jpg";
import { cn } from "@/lib/utils";

type SmartImageProps = {
  src?: string | null | undefined;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  eager?: boolean;
  fallback?: string;
};

/**
 * Image robuste : évite les images cassées / clignotantes.
 * - remplace automatiquement une source invalide par un visuel BYAWA
 * - fond neutre pendant le chargement (pas de saut de mise en page)
 */
export function SmartImage({
  src,
  alt,
  className,
  width,
  height,
  eager = false,
  fallback = placeholder,
}: SmartImageProps) {
  const initial = src && src.trim().length > 0 ? src : fallback;
  const [current, setCurrent] = useState(initial);
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setCurrent(src && src.trim().length > 0 ? src : fallback);
  }, [src, fallback]);

  // l'image peut déjà être chargée (SSR/cache) avant l'attache du onLoad
  useEffect(() => {
    if (ref.current?.complete) setLoaded(true);
  }, [current]);

  return (
    <img
      ref={ref}
      src={current}
      alt={alt}
      {...(width ? { width } : {})}
      {...(height ? { height } : {})}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      onLoad={() => setLoaded(true)}
      onError={() => {
        if (current !== fallback) setCurrent(fallback);
        setLoaded(true);
      }}
      className={cn(
        "bg-muted transition-opacity duration-300",
        loaded ? "opacity-100" : "opacity-0",
        className,
      )}
    />
  );
}
