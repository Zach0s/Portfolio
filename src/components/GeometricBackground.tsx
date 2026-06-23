/**
 * Animated geometric background.
 * Neutral page base (set on <body>); these shapes drift and cycle colors above it.
 * Pure CSS animations for performance — no JS runtime cost after mount.
 */

type Shape = {
  type: "triangle" | "square" | "circle" | "hexagon" | "diamond";
  size: number;
  top: string;
  left: string;
  drift: "driftA" | "driftB" | "driftC" | "driftD";
  hue: "hue1" | "hue2" | "hue3";
  driftDur: number;
  hueDur: number;
  delay: number;
};

const shapes: Shape[] = [
  { type: "triangle", size: 150, top: "8%",  left: "10%", drift: "driftA", hue: "hue1", driftDur: 26, hueDur: 18, delay: 0 },
  { type: "hexagon",  size: 110, top: "18%", left: "78%", drift: "driftB", hue: "hue2", driftDur: 30, hueDur: 22, delay: -4 },
  { type: "circle",   size: 90,  top: "62%", left: "12%", drift: "driftC", hue: "hue3", driftDur: 24, hueDur: 16, delay: -8 },
  { type: "square",   size: 130, top: "70%", left: "82%", drift: "driftD", hue: "hue1", driftDur: 28, hueDur: 20, delay: -2 },
  { type: "diamond",  size: 80,  top: "40%", left: "48%", drift: "driftA", hue: "hue2", driftDur: 32, hueDur: 19, delay: -12 },
  { type: "circle",   size: 60,  top: "30%", left: "30%", drift: "driftB", hue: "hue3", driftDur: 22, hueDur: 15, delay: -6 },
  { type: "triangle", size: 70,  top: "85%", left: "45%", drift: "driftC", hue: "hue2", driftDur: 27, hueDur: 21, delay: -10 },
  { type: "hexagon",  size: 95,  top: "52%", left: "68%", drift: "driftD", hue: "hue1", driftDur: 29, hueDur: 17, delay: -3 },
];

export default function GeometricBackground() {
  return (
    <div className="geo-layer" aria-hidden="true">
      {shapes.map((s, i) => (
        <span
          key={i}
          className={`geo-shape geo-${s.type}`}
          style={{
            width: s.size,
            height: s.size,
            top: s.top,
            left: s.left,
            animationName: `${s.drift}, ${s.hue}`,
            animationDuration: `${s.driftDur}s, ${s.hueDur}s`,
            animationTimingFunction: "ease-in-out, ease-in-out",
            animationIterationCount: "infinite, infinite",
            animationDelay: `${s.delay}s, ${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
