"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { Component, useEffect, useState, type ReactNode } from "react";

// The Spline runtime is ~1 MB of JS + WASM, so it is never part of the first
// load: it is fetched only on wide screens, without reduced motion or
// data-saver, once the browser is idle.
const Spline = dynamic(() => import("@splinetool/react-spline"), { ssr: false });

/**
 * Swap in your own scene: in Spline, Export → Code → React, copy the
 * `.splinecode` URL and set NEXT_PUBLIC_SPLINE_SCENE (Vercel env vars), or
 * replace the default below.
 */
const SCENE_URL =
  process.env.NEXT_PUBLIC_SPLINE_SCENE ??
  "https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode";

/** If the scene can't be fetched or parsed, drop it and keep the static blobs. */
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function useCanRender3D() {
  const [can, setCan] = useState(false);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 768px)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData =
      (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData ===
      true;
    if (!wide || calm || saveData) return;

    const start = () => setCan(true);
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(start, { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(start, 1200);
    return () => clearTimeout(id);
  }, []);

  return can;
}

export default function HeroVisual() {
  const can3D = useCanRender3D();
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[320px] md:max-w-[480px]">
      {/* Haikei blobs: the static backdrop, and the whole visual when 3D is off. */}
      <div className="haikei haikei-blob-2 blob-spin-rev absolute inset-[4%] opacity-25" aria-hidden="true" />
      <div className="haikei haikei-blob blob-spin absolute inset-[10%] opacity-60" aria-hidden="true" />

      {/* Portrait — shown on phones, where the 3D scene never loads. */}
      <div className="absolute inset-0 flex items-center justify-center md:hidden">
        <div className="rounded-full p-[3px] shadow-xl bg-[linear-gradient(135deg,var(--accent),var(--accent2))]">
          <div className="relative size-44 overflow-hidden rounded-full">
            <Image
              src="/profile.jpg"
              alt="Zacharie Rodde"
              fill
              priority
              sizes="176px"
              style={{ objectFit: "cover", objectPosition: "center top" }}
            />
          </div>
        </div>
      </div>

      {can3D && (
        <div
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: loaded ? 1 : 0 }}
          // Let the page keep scrolling when the wheel passes over the scene.
          onWheelCapture={(e) => e.stopPropagation()}
        >
          <SceneBoundary>
            <Spline scene={SCENE_URL} onLoad={() => setLoaded(true)} />
          </SceneBoundary>
        </div>
      )}

      {can3D && (
        <p
          className="pointer-events-none absolute -bottom-2 left-1/2 -translate-x-1/2 text-xs text-muted-foreground transition-opacity duration-700"
          style={{ opacity: loaded ? 1 : 0 }}
        >
          Survolez la scène ✦
        </p>
      )}
    </div>
  );
}
