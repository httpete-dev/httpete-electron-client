"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, GithubIcon as Bitbucket, Mail } from 'lucide-react'
import Link from "next/link"

const particleAnimation = `
  @keyframes moveParticle {
    0% { transform: translate(0, 0); }
    100% { transform: translate(var(--move-x), var(--move-y)); }
  }

  @keyframes flash {
    0%, 100% { opacity: 0; }
    50% { opacity: 1; }
  }
`

const Particle = ({ x, y }: { x: number; y: number }) => (
  <div
    className="absolute rounded-full bg-blue-500"
    style={{
      left: `${x}%`,
      top: `${y}%`,
      width: '2px',
      height: '2px',
      animation: 'moveParticle 10s infinite linear',
      '--move-x': `${Math.random() * 200 - 100}px`,
      '--move-y': `${Math.random() * 200 - 100}px`,
    }}
  />
)

const Lightning = ({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) => (
  <div
    className="absolute bg-blue-400"
    style={{
      left: `${x1}%`,
      top: `${y1}%`,
      width: `${Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))}px`,
      height: '1px',
      transform: `rotate(${Math.atan2(y2 - y1, x2 - x1)}rad)`,
      transformOrigin: '0 0',
      animation: 'flash 0.2s infinite',
    }}
  />
)

export function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [particles, setParticles] = useState<{ x: number; y: number }[]>([])
  const [lightning, setLightning] = useState<{ x1: number; y1: number; x2: number; y2: number } | null>(null)

  useEffect(() => {
    setParticles(Array.from({ length: 50 }, () => ({ x: Math.random() * 100, y: Math.random() * 100 })))

    const lightningInterval = setInterval(() => {
      if (Math.random() < 0.1) {  // 10% chance of lightning every interval
        setLightning({
          x1: Math.random() * 100,
          y1: Math.random() * 100,
          x2: Math.random() * 100,
          y2: Math.random() * 100,
        })
        setTimeout(() => setLightning(null), 200)  // Lightning lasts for 200ms
      }
    }, 1000)

    return () => clearInterval(lightningInterval)
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setIsLoading(false)
  }

  const handleOAuthLogin = async (provider: string) => {
    setIsLoading(true)
    setIsLoading(false)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white overflow-hidden">
      <style>{particleAnimation}</style>
      {particles.map((particle, index) => (
        <Particle key={index} x={particle.x} y={particle.y} />
      ))}
      {lightning && <Lightning {...lightning} />}
      <Card className="w-full max-w-md bg-gray-800 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Login to HttPete</CardTitle>
          <CardDescription className="text-center text-gray-400">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-white text-black shadow-md hover:shadow-lg transition-shadow"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Log in'}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <Link href="/forgot-password" className="text-sm text-coral-500 hover:underline">
              Forgot password?
            </Link>
          </div>
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-600" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-gray-800 px-2 text-gray-400">Or continue with</span>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOAuthLogin('GitHub')}
                className="bg-gray-700 hover:bg-gray-600 text-white"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOAuthLogin('Bitbucket')}
                className="bg-gray-700 hover:bg-gray-600 text-white"
              >
                <Bitbucket className="h-5 w-5" />
                <span className="sr-only">Bitbucket</span>
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOAuthLogin('Google')}
                className="bg-gray-700 hover:bg-gray-600 text-white"
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">Google</span>
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-400">
            Don't have an account?{" "}
            <Link href="/register" className="text-coral-500 hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
      {isLoading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-white text-2xl">Loading...</div>
        </div>
      )}
    </div>
  )
}