import Image from "next/image";

const loadingTexts = [
  "Crafting your vogue haven experience...",
  "Unwrapping premium products just for you...",
  "Connecting you with luxury technology...",
  "Loading exclusive deals and offers...",
  "Preparing your personalized shopping journey...",
  "Polishing our premium collection for you...",
  "Sparkling up the perfect products...",
  "Igniting innovation and style...",
  "Assembling excellence, pixel by pixel...",
  "Elevating your shopping experience...",
];

function getRandomText() {
  return loadingTexts[Math.floor(Math.random() * loadingTexts.length)];
}

export default function Loading() {
  const randomText = getRandomText();

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-400/10 blur-[120px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-10 px-6 text-center">
        {/* Loader */}
        <div className="relative">
          {/* Golden halo */}
          <div className="absolute inset-0 -m-8 rounded-full bg-gradient-to-r from-yellow-400/30 via-yellow-300/20 to-yellow-500/30 blur-2xl" />

          <Image
            alt="Loading"
            src="/loader3.gif"
            width={180}
            height={180}
            priority
            className="relative "
          />
        </div>

        {/* Text */}
        <div className="space-y-5 max-w-lg">
          <p className="text-lg sm:text-xl font-medium leading-relaxed bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            {randomText}
          </p>

          {/* Divider */}
          <div className="mx-auto h-px w-40 bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent" />
        </div>

        {/* Subtle progress dots */}
        <div className="flex gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-yellow-400"
              style={{ opacity: 0.25 + i * 0.1 }}
            />
          ))}
        </div>

        {/* Brand */}
        <span className="text-xs tracking-widest uppercase text-muted-foreground/60">
          Vogue Haven Experience
        </span>
      </div>
    </div>
  );
}
