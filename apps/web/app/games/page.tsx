export default function GamesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">Games</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <a
          href="/games/asteroids"
          className="border rounded-lg p-6 hover:bg-secondary transition-colors"
        >
          <h2 className="text-xl font-semibold mb-2">Asteroids</h2>
          <p className="text-muted-foreground">
            Classic asteroids game built with React and Canvas
          </p>
        </a>
      </div>
    </div>
  )
}