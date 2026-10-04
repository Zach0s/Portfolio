"use client";

import type { SplineEvent } from "@splinetool/react-spline";
import type { Application } from "@splinetool/runtime";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Component, useEffect, useRef, useState, type ReactNode } from "react";

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
  "https://prod.spline.design/FE7ZQfWKhOQm3HL5/scene.splinecode";

/**
 * Each object in the scene that stands for a section lives in a group named
 * `section:<id>`, where <id> is the section's anchor on the page.
 */
function scrollToClickedSection(e: SplineEvent) {
  const name = e.target.name;
  if (!name.startsWith("section:")) return;
  document.getElementById(name.slice("section:".length))?.scrollIntoView({ behavior: "smooth" });
}

/**
 * Night look, as the intensities shown in the Spline editor. Light states
 * don't keep their intensity once exported, so the site fades the lights
 * itself; the day look is whatever the scene loads with.
 */
const NIGHT_INTENSITY: Record<string, number> = {
  "Directional Light": 0.12,
  "Fill Light": 0.15,
  "Lamp Light": 2.4,
  "Monitor Glow": 1.4,
};
// The runtime reads and writes intensities scaled by π compared to the editor.
const RUNTIME_INTENSITY_SCALE = Math.PI;
const LIGHT_FADE_MS = 700;

type SceneLight = { name: string; intensity: number };

/** Fades the scene's lights between the day and night looks; returns a cancel function. */
function fadeLights(lights: SceneLight[], target: (light: SceneLight) => number) {
  const from = lights.map((light) => light.intensity);
  const to = lights.map(target);
  const start = performance.now();
  let frame = 0;

  const step = (now: number) => {
    const t = Math.min((now - start) / LIGHT_FADE_MS, 1);
    const eased = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
    lights.forEach((light, i) => {
      light.intensity = from[i] + (to[i] - from[i]) * eased;
    });
    if (t < 1) frame = requestAnimationFrame(step);
  };
  frame = requestAnimationFrame(step);
  return () => cancelAnimationFrame(frame);
}

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
  const [app, setApp] = useState<Application | null>(null);
  const loaded = app !== null;
  const { resolvedTheme } = useTheme();
  const dayIntensity = useRef(new Map<string, number>());

  // Match the scene's lighting to the site theme, on load and on toggle.
  useEffect(() => {
    if (!app || !resolvedTheme) return;
    const day = dayIntensity.current;
    const night = resolvedTheme === "dark";
    let frame = 0;
    let cancelFade = () => {};

    const apply = () => {
      const lights = app.getAllObjects().filter((o) => o.name in NIGHT_INTENSITY);
      // Right after onLoad the object list can still be empty: try next frame.
      if (lights.length === 0) {
        frame = requestAnimationFrame(apply);
        return;
      }
      // Lights are untouched until their first fade, so this records the day look.
      for (const light of lights) if (!day.has(light.name)) day.set(light.name, light.intensity);
      cancelFade = fadeLights(lights, (light) =>
        night ? NIGHT_INTENSITY[light.name] * RUNTIME_INTENSITY_SCALE : day.get(light.name)!,
      );
    };
    apply();

    return () => {
      cancelAnimationFrame(frame);
      cancelFade();
    };
  }, [app, resolvedTheme]);

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
            <Spline
              scene={SCENE_URL}
              onLoad={(splineApp) => {
                // The export keeps the editor's flat background; let the
                // page's own background and blobs show through instead.
                splineApp.setBackgroundColor("transparent");
                setApp(splineApp);
              }}
              onSplineMouseDown={scrollToClickedSection}
            />
          </SceneBoundary>
        </div>
      )}

      {can3D && (
        <p
          className="pointer-events-none absolute -bottom-2 left-1/2 -translate-x-1/2 text-xs text-muted-foreground transition-opacity duration-700"
          style={{ opacity: loaded ? 1 : 0 }}
        >
          Cliquez sur un objet ✦
        </p>
      )}
    </div>
  );
}
