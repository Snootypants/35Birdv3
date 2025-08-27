'use client';
import Image from 'next/image';
import SplashBackground from './SplashBackground';

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <SplashBackground />
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <h1 className="text-6xl font-bold mb-4">
          Builds, games, and experiments
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Design. Code. Done.
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="/projects"
            className="px-6 py-3 bg-foreground text-background rounded-lg hover:opacity-90"
          >
            See recent builds
          </a>
          <a
            href="/games/asteroids"
            className="px-6 py-3 border rounded-lg hover:bg-[rgb(var(--bg)/0.1)]"
          >
            Play a demo
          </a>
        </div>
      </div>
    </section>
  );
}