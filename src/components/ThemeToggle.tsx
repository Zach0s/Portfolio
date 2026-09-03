"use client";

import { useTheme } from "next-themes";

/**
 * Light/dark switch.
 *
 * Which icon shows is decided in CSS from the `.dark` class next-themes puts on
 * <html>, not from a render-time read of the theme. The server doesn't know the
 * visitor's theme, so reading it during render would either mismatch on
 * hydration or force a blank placeholder until mount — this way the real button
 * is painted on the first pass.
 */
export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Changer de thème"
      className="card w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-110 cursor-pointer"
      style={{ color: "var(--fg)" }}
    >
      {/* Sun — offers the way back to light, so it belongs to the dark theme. */}
      <svg className="hidden dark:block" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
      <svg className="block dark:hidden" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </button>
  );
}
