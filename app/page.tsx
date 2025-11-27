"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import Lightning from "@/components/Lightning";

export default function LandingPage() {
  const [secretPhrase, setSecretPhrase] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (secretPhrase.toLowerCase() === "smash karts") {
      router.push("/teams");
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden p-4 sm:p-6 md:p-8">
      <div className="absolute inset-0 bg-black">
        <Lightning hue={270} xOffset={0} speed={0.5} intensity={1.2} size={1} />
      </div>
      
      <Card className="w-full max-w-sm sm:max-w-md lg:max-w-lg p-6 sm:p-8 md:p-10 bg-slate-900/90 backdrop-blur-xl border-purple-500/30 glow-box relative z-10">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="font-orbitron text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent glow-text">
            TEAM ASSIGNER
          </h1>
          <p className="font-orbitron text-purple-300 text-xs sm:text-sm tracking-widest">GAMING EDITION</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div>
            <label htmlFor="secret" className="block text-sm font-medium text-purple-200 mb-2">
              Enter Unlock Phrase
            </label>
            <Input
              id="secret"
              type="password"
              value={secretPhrase}
              onChange={(e) => setSecretPhrase(e.target.value)}
              placeholder="Type the unlock phrase..."
              className={`bg-slate-800/50 border-purple-500/50 text-white placeholder:text-slate-500 focus:border-purple-400 focus:ring-purple-400 transition-all ${
                error ? "border-red-500 animate-shake" : ""
              }`}
            />
            {error && (
              <p className="text-red-400 text-sm mt-2 animate-pulse">
                Access Denied! Try again.
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-4 sm:py-6 text-base sm:text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50"
          >
            ENTER
          </Button>
        </form>
      </Card>
    </div>
  );
}
