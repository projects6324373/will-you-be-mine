import { useState } from "react";
import FloatingHearts from "./FloatingHearts";

interface GatekeeperProps {
  onAccessGranted: () => void;
}

const Gatekeeper = ({ onAccessGranted }: GatekeeperProps) => {
  const [name, setName] = useState("");
  const [denied, setDenied] = useState(false);
  const [shaking, setShaking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().toLowerCase() === "priyanka") {
      onAccessGranted();
    } else {
      setDenied(true);
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
    }
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden flex items-center justify-center px-6"
      style={{
        background:
          "linear-gradient(135deg, hsl(340 90% 92%) 0%, hsl(350 85% 88%) 25%, hsl(340 80% 85%) 50%, hsl(330 75% 90%) 75%, hsl(20 80% 92%) 100%)",
      }}
    >
      <FloatingHearts />

      <div className="relative z-10 text-center w-full max-w-md mx-auto animate-fade-in">
        <div className="text-5xl mb-4">💌</div>
        <h1
          className="font-romantic text-3xl sm:text-4xl md:text-5xl font-bold mb-3"
          style={{
            color: "hsl(350 80% 40%)",
            textShadow: "0 2px 20px hsl(340 80% 70% / 0.5)",
          }}
        >
          Someone Special?
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg mb-8 font-medium">
          This page is reserved for someone very special 💕
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div
            className={`transition-transform ${shaking ? "animate-[shake_0.5s_ease-in-out]" : ""}`}
          >
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (denied) setDenied(false);
              }}
              placeholder="Enter your name..."
              maxLength={50}
              className="w-full px-6 py-4 text-lg text-center rounded-full border-2 border-primary/30 bg-card/80 backdrop-blur-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/50 font-medium"
              style={{ color: "hsl(350 80% 30%)" }}
            />
          </div>

          <button
            type="submit"
            className="w-full px-8 py-4 rounded-full text-lg font-bold text-primary-foreground bg-primary shadow-lg cursor-pointer transition-all duration-300 hover:shadow-xl active:scale-95"
            style={{ animation: "pulse-glow 2s ease-in-out infinite" }}
          >
            Let me in 💖
          </button>
        </form>

        {denied && (
          <div
            className="mt-6 p-4 rounded-2xl bg-destructive/10 border border-destructive/20 animate-fade-in"
          >
            <p className="text-destructive font-semibold text-base">
              Access denied! 🚫
            </p>
            <p className="text-destructive/80 text-sm mt-1">
              Sorry, this is only for Priyanka 💔
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gatekeeper;
