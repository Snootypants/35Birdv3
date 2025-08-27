import React, { useEffect, useRef, useState } from 'react'

interface Vector {
  x: number
  y: number
}

interface GameObject {
  position: Vector
  velocity: Vector
  rotation: number
  size: number
}

interface Ship extends GameObject {
  thrust: boolean
}

interface Asteroid extends GameObject {
  points: Vector[]
}

interface Bullet extends GameObject {
  lifetime: number
}

const AsteroidsGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [ship, setShip] = useState<Ship>({
    position: { x: 400, y: 300 },
    velocity: { x: 0, y: 0 },
    rotation: 0,
    size: 15,
    thrust: false,
  })
  const [asteroids, setAsteroids] = useState<Asteroid[]>([])
  const [bullets, setBullets] = useState<Bullet[]>([])
  const keysPressed = useRef<Set<string>>(new Set())

  useEffect(() => {
    const initialAsteroids: Asteroid[] = []
    for (let i = 0; i < 5; i++) {
      const angle = (Math.PI * 2 * i) / 5
      initialAsteroids.push({
        position: {
          x: 400 + Math.cos(angle) * 200,
          y: 300 + Math.sin(angle) * 200,
        },
        velocity: {
          x: (Math.random() - 0.5) * 2,
          y: (Math.random() - 0.5) * 2,
        },
        rotation: 0,
        size: 40,
        points: generateAsteroidShape(),
      })
    }
    setAsteroids(initialAsteroids)
  }, [])

  function generateAsteroidShape(): Vector[] {
    const points: Vector[] = []
    const numPoints = 8 + Math.floor(Math.random() * 4)
    for (let i = 0; i < numPoints; i++) {
      const angle = (Math.PI * 2 * i) / numPoints
      const radius = 0.8 + Math.random() * 0.4
      points.push({
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
      })
    }
    return points
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current.add(e.key)
      if (e.key === ' ') {
        fireBullet()
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current.delete(e.key)
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [ship])

  const fireBullet = () => {
    const newBullet: Bullet = {
      position: { ...ship.position },
      velocity: {
        x: Math.cos(ship.rotation) * 10,
        y: Math.sin(ship.rotation) * 10,
      },
      rotation: ship.rotation,
      size: 3,
      lifetime: 60,
    }
    setBullets(prev => [...prev, newBullet])
  }

  useEffect(() => {
    if (gameOver) return

    const gameLoop = setInterval(() => {
      // Update ship
      setShip(prev => {
        let newShip = { ...prev }
        
        if (keysPressed.current.has('ArrowLeft')) {
          newShip.rotation -= 0.1
        }
        if (keysPressed.current.has('ArrowRight')) {
          newShip.rotation += 0.1
        }
        if (keysPressed.current.has('ArrowUp')) {
          newShip.velocity.x += Math.cos(newShip.rotation) * 0.5
          newShip.velocity.y += Math.sin(newShip.rotation) * 0.5
          newShip.thrust = true
        } else {
          newShip.thrust = false
        }

        newShip.position.x += newShip.velocity.x
        newShip.position.y += newShip.velocity.y
        newShip.velocity.x *= 0.99
        newShip.velocity.y *= 0.99

        // Wrap around screen
        if (newShip.position.x < 0) newShip.position.x = 800
        if (newShip.position.x > 800) newShip.position.x = 0
        if (newShip.position.y < 0) newShip.position.y = 600
        if (newShip.position.y > 600) newShip.position.y = 0

        return newShip
      })

      // Update asteroids
      setAsteroids(prev => prev.map(asteroid => ({
        ...asteroid,
        position: {
          x: (asteroid.position.x + asteroid.velocity.x + 800) % 800,
          y: (asteroid.position.y + asteroid.velocity.y + 600) % 600,
        },
        rotation: asteroid.rotation + 0.02,
      })))

      // Update bullets
      setBullets(prev => prev
        .map(bullet => ({
          ...bullet,
          position: {
            x: (bullet.position.x + bullet.velocity.x + 800) % 800,
            y: (bullet.position.y + bullet.velocity.y + 600) % 600,
          },
          lifetime: bullet.lifetime - 1,
        }))
        .filter(bullet => bullet.lifetime > 0)
      )
    }, 1000 / 60)

    return () => clearInterval(gameLoop)
  }, [gameOver])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, 800, 600)

    // Draw ship
    ctx.save()
    ctx.translate(ship.position.x, ship.position.y)
    ctx.rotate(ship.rotation)
    ctx.strokeStyle = 'white'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(15, 0)
    ctx.lineTo(-10, -10)
    ctx.lineTo(-5, 0)
    ctx.lineTo(-10, 10)
    ctx.closePath()
    ctx.stroke()
    
    if (ship.thrust) {
      ctx.beginPath()
      ctx.moveTo(-5, -5)
      ctx.lineTo(-15, 0)
      ctx.lineTo(-5, 5)
      ctx.stroke()
    }
    ctx.restore()

    // Draw asteroids
    asteroids.forEach(asteroid => {
      ctx.save()
      ctx.translate(asteroid.position.x, asteroid.position.y)
      ctx.rotate(asteroid.rotation)
      ctx.strokeStyle = 'white'
      ctx.lineWidth = 2
      ctx.beginPath()
      asteroid.points.forEach((point, i) => {
        const x = point.x * asteroid.size
        const y = point.y * asteroid.size
        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      })
      ctx.closePath()
      ctx.stroke()
      ctx.restore()
    })

    // Draw bullets
    bullets.forEach(bullet => {
      ctx.fillStyle = 'white'
      ctx.fillRect(
        bullet.position.x - bullet.size / 2,
        bullet.position.y - bullet.size / 2,
        bullet.size,
        bullet.size
      )
    })

    // Draw score
    ctx.fillStyle = 'white'
    ctx.font = '20px monospace'
    ctx.fillText(`Score: ${score}`, 20, 30)

    if (gameOver) {
      ctx.fillStyle = 'white'
      ctx.font = '40px monospace'
      ctx.fillText('GAME OVER', 280, 300)
    }
  }, [ship, asteroids, bullets, score, gameOver])

  return (
    <div className="flex flex-col items-center">
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        className="border border-white bg-black"
      />
      {gameOver && (
        <button
          onClick={() => {
            setGameOver(false)
            setScore(0)
            setShip({
              position: { x: 400, y: 300 },
              velocity: { x: 0, y: 0 },
              rotation: 0,
              size: 15,
              thrust: false,
            })
          }}
          className="mt-4 px-4 py-2 bg-white text-black rounded"
        >
          Restart
        </button>
      )}
    </div>
  )
}

export default AsteroidsGame