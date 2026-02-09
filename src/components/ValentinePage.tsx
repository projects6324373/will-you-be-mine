import { useState, useCallback, useRef, useEffect } from "react";
import confetti from "canvas-confetti";
import FloatingHearts from "./FloatingHearts";

const ValentinePage = () => {
  const [accepted, setAccepted] = useState(false);
  const [noPos, setNoPos] = useState<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const dodgeNo = useCallback(() => {
    const maxX = window.innerWidth - 120;
    const maxY = window.innerHeight - 60;
    setNoPos({
      x: Math.random() * maxX,
      y: Math.random() * maxY,
    });
  }, []);

  const handleYes = () => {
    setAccepted(true);
    // Fire confetti bursts
    const duration = 4000;
    const end = Date.now() + duration;
    const colors = ["#ff6b8a", "#ff3366", "#ff85a2", "#ffd1dc", "#ff1744", "#ffc0cb"];

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 80,
        origin: { x: 0, y: 0.7 },
        colors,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 80,
        origin: { x: 1, y: 0.7 },
        colors,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();

    // Big center burst
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.5 },
      colors,
    });
  };

  // Celebration hearts
  const [celebrationHearts, setCelebrationHearts] = useState<
    { id: number; x: number; emoji: string }[]
  >([]);

  useEffect(() => {
    if (!accepted) return;
    const interval = setInterval(() => {
      setCelebrationHearts((prev) => [
        ...prev.slice(-30),
        {
          id: Date.now(),
          x: Math.random() * 100,
          emoji: ["❤️", "💖", "💕", "🎉", "✨", "💗"][Math.floor(Math.random() * 6)],
        },
      ]);
    }, 200);
    return () => clearInterval(interval);
  }, [accepted]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden flex items-center justify-center"
      style={{
        background:
          "linear-gradient(135deg, hsl(340 90% 92%) 0%, hsl(350 85% 88%) 25%, hsl(340 80% 85%) 50%, hsl(330 75% 90%) 75%, hsl(20 80% 92%) 100%)",
      }}
    >
      <FloatingHearts />

      {/* Sparkle overlay */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {Array.from({ length: 12 }).map((_, i) => (
          <span
            key={i}
            className="absolute text-valentine-gold"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${10 + Math.random() * 14}px`,
              animation: `sparkle ${2 + Math.random() * 3}s ease-in-out ${Math.random() * 4}s infinite`,
            }}
          >
            ✦
          </span>
        ))}
      </div>

      {!accepted ? (
        <div className="relative z-10 text-center px-6 max-w-xl mx-auto animate-fade-in">
          <div className="text-5xl mb-6">💖</div>
          <h1
            className="font-romantic text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-8"
            style={{
              color: "hsl(350 80% 40%)",
              textShadow: "0 2px 20px hsl(340 80% 70% / 0.5)",
            }}
          >
            Will You Be My Valentine, Priyanka?
          </h1>
          <p className="text-muted-foreground text-lg mb-10 font-medium">
            I have something very important to ask you... 💕
          </p>

          <div className="flex items-center justify-center gap-6">
            <button
              onClick={handleYes}
              className="px-10 py-4 rounded-full text-xl font-bold text-accent-foreground bg-accent shadow-lg cursor-pointer transition-all duration-300 hover:shadow-xl active:scale-95"
              style={{ animation: "pulse-glow 2s ease-in-out infinite, bounce-soft 2s ease-in-out infinite" }}
            >
              Yes ❤️
            </button>

            <button
              onMouseEnter={dodgeNo}
              onTouchStart={dodgeNo}
              className="px-10 py-4 rounded-full text-xl font-bold text-destructive-foreground bg-destructive shadow-lg cursor-pointer transition-all duration-300"
              style={
                noPos
                  ? {
                      position: "fixed",
                      left: noPos.x,
                      top: noPos.y,
                      transition: "left 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
                      zIndex: 50,
                      animation: "bounce-soft 0.4s ease-in-out",
                    }
                  : {}
              }
            >
              No 💔
            </button>
          </div>
        </div>
      ) : (
        <div className="relative z-10 text-center px-6 max-w-xl mx-auto">
          <div
            className="animate-scale-in"
            style={{ animationDuration: "0.6s" }}
          >
            <div className="text-7xl mb-6">🎉</div>
            <h1
              className="font-romantic text-5xl sm:text-6xl md:text-7xl font-bold mb-6"
              style={{
                color: "hsl(350 80% 40%)",
                textShadow: "0 2px 30px hsl(340 80% 70% / 0.6)",
              }}
            >
              LESSGOOOOOOOO ❤️🎉
            </h1>
            <p
              className="text-2xl sm:text-3xl font-medium mt-4"
              style={{
                color: "hsl(340 60% 35%)",
                animation: "fade-in 1s ease-out 0.5s both",
              }}
            >
              I knew you'd say yes 😉💖
            </p>
            <div className="mt-8 text-4xl" style={{ animation: "bounce-soft 1s ease-in-out infinite" }}>
              💕
            </div>
          </div>

          {/* Celebration floating hearts */}
          {celebrationHearts.map((h) => (
            <span
              key={h.id}
              className="fixed text-3xl pointer-events-none"
              style={{
                left: `${h.x}%`,
                bottom: 0,
                animation: "celebration-heart 3s ease-out forwards",
              }}
            >
              {h.emoji}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default ValentinePage;
