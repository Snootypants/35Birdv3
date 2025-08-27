'use client'

import dynamic from 'next/dynamic'

const AsteroidsGame = dynamic(
  () => import('@35bird/games-asteroids').then(mod => mod.default),
  { 
    ssr: false,
    loading: () => <div className="flex items-center justify-center h-screen">Loading game...</div>
  }
)

export default function AsteroidsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">Asteroids</h1>
      <div className="border rounded-lg overflow-hidden">
        <AsteroidsGame />
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">How to Play</h2>
        <ul className="space-y-2 text-muted-foreground">
          <li>Use arrow keys to move</li>
          <li>Space bar to shoot</li>
          <li>Avoid asteroids and destroy them</li>
        </ul>
      </div>
    </div>
  )
}