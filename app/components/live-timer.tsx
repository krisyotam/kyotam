"use client"

import { useState, useEffect } from "react"

const BIRTH_DATE = new Date("2004-08-05T18:31:00.000Z")

export function LiveTimer() {
  const [timeAlive, setTimeAlive] = useState("")

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date()
      const diff = now.getTime() - BIRTH_DATE.getTime()

      const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25))
      const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)
      const milliseconds = diff % 1000

      setTimeAlive(`${years}y ${days}d ${hours}h ${minutes}m ${seconds}s ${milliseconds}ms`)
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-gray-100 p-4 rounded-lg mb-8">
      <h2 className="font-mono text-[13px] mb-2">Time alive</h2>
      <p className="font-mono text-[14px] tabular-nums">{timeAlive}</p>
    </div>
  )
}

