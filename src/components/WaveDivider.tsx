const fadeOut = "linear-gradient(to bottom, black 55%, transparent)";

/** Haikei layered waves, tinted with the theme gradient and faded into the next section. */
export default function WaveDivider({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" style={{ maskImage: fadeOut, WebkitMaskImage: fadeOut }} className={className}>
      <div className="haikei haikei-waves h-16 sm:h-24 w-full opacity-[0.14] dark:opacity-20" />
    </div>
  );
}
