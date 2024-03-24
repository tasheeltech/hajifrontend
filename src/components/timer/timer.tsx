import React from "react"
import { useState, useEffect } from "react"

const Timer = () => {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60)
    const remainingSeconds = timeInSeconds % 60

    const formattedMinutes = String(minutes).padStart(2, "0")
    const formattedSeconds = String(remainingSeconds).padStart(2, "0")

    return `${formattedMinutes}:${formattedSeconds}`
  }

  return (
    <div className="text-xl font-semibold">
      <p>{formatTime(seconds)}</p>
    </div>
  )
}

export default Timer
