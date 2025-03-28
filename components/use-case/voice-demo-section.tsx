"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"

interface VoiceDemoProps {
  title: string
  description: string
  durationInSeconds?: number
}

export default function VoiceDemoContainer({ title, description, durationInSeconds = 30 }: VoiceDemoProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const animationRef = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null)

   //TODO : change this to real value
  const generateWaveformData = (length: number, minHeight: number, maxHeight: number) => {
    return Array.from({ length }, () => minHeight + Math.random() * (maxHeight - minHeight))
  }


  const agentWaveformData = useRef(generateWaveformData(100, 5, 25))
  const customerWaveformData = useRef(generateWaveformData(100, 5, 25))

  // Conversation segments to highlight who is speaking when
  const conversationSegments = [
    { speaker: "agent", startPercent: 0, endPercent: 15 },
    { speaker: "customer", startPercent: 15, endPercent: 20 },
    { speaker: "agent", startPercent: 20, endPercent: 35 },
    { speaker: "customer", startPercent: 35, endPercent: 45 },
    { speaker: "agent", startPercent: 45, endPercent: 60 },
    { speaker: "customer", startPercent: 60, endPercent: 70 },
    { speaker: "agent", startPercent: 70, endPercent: 85 },
    { speaker: "customer", startPercent: 85, endPercent: 100 },
  ]

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = Math.floor(timeInSeconds % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const togglePlayPause = () => {
    if (isPlaying) {
      pauseAnimation()
    } else {
      startAnimation()
    }
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const startAnimation = () => {
    startTimeRef.current = Date.now() - currentTime * 1000

    const animate = () => {
      if (!startTimeRef.current) return

      const elapsed = (Date.now() - startTimeRef.current) / 1000
      const newProgress = (elapsed / durationInSeconds) * 100

      if (newProgress >= 100) {
        setProgress(100)
        setCurrentTime(durationInSeconds)
        setIsPlaying(false)
        return
      }

      setProgress(newProgress)
      setCurrentTime(elapsed)
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)
  }

  const pauseAnimation = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }
  }

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const progressBar = e.currentTarget
    const rect = progressBar.getBoundingClientRect()
    const clickPosition = e.clientX - rect.left
    const newProgress = (clickPosition / rect.width) * 100

    setProgress(newProgress)
    setCurrentTime((newProgress / 100) * durationInSeconds)

    if (isPlaying) {
      pauseAnimation()
      startTimeRef.current = Date.now() - (newProgress / 100) * durationInSeconds * 1000
      animationRef.current = requestAnimationFrame(startAnimation)
    } else {
      startTimeRef.current = Date.now() - (newProgress / 100) * durationInSeconds * 1000
    }
  }


  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  // Determine which speaker is active based on current progress
  const getActiveSpeaker = () => {
    const segment = conversationSegments.find((seg) => progress >= seg.startPercent && progress <= seg.endPercent)
    return segment?.speaker || "none"
  }

  const activeSpeaker = getActiveSpeaker()

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 border border-gray-100 animate-fade-in-delay w-full h-full">
      <div className="mb-6 relative">
       
        <div className="h-28 md:h-32 relative mb-2">
        
         <div
            className={`absolute top-0 left-0 right-0 h-1/2 flex items-center justify-center ${
              activeSpeaker === "agent" ? "opacity-100" : "opacity-40"
            } transition-opacity duration-300`}
          >
            <div className="w-full h-full flex items-center">
              {agentWaveformData.current.map((height, index) => (
                <div
                  key={`agent-${index}`}
                  className={`mx-[1px] rounded-full ${
                    activeSpeaker === "agent" ? "bg-purple-500" : "bg-purple-300"
                  } transition-all duration-300`}
                  style={{
                    height: `${activeSpeaker === "agent" ? height : height * 0.6}px`,
                    width: "2px",
                    transform: `scaleY(${progress > ((index / agentWaveformData.current.length) * 100) ? 1 : 0.3})`,
                    opacity: progress > (index / agentWaveformData.current.length) * 100 ? 1 : 0.3,
                  }}
                />
              ))}
            </div>
          </div> 

      
          <div className="absolute top-1/2 left-0 right-0 flex items-center justify-between px-2 transform -translate-y-1/2">
            <div className="h-px bg-gray-200 flex-grow"></div>
            <div className="px-3 text-xs text-gray-500 bg-white">
              {activeSpeaker === "customer"
                ? "Customer speaking"
                : activeSpeaker === "agent"
                  ? "Agent speaking"
                  : "Conversation"}
            </div>
            <div className="h-px bg-gray-200 flex-grow"></div>
          </div>

          <div
           className={`absolute bottom-0 left-0 right-0 h-1/2 flex items-center justify-center ${
              activeSpeaker === "customer" ? "opacity-100" : "opacity-40"
            } transition-opacity duration-300`}
          >
            <div className="w-full h-full flex items-center">
              {customerWaveformData.current.map((height, index) => (
                <div
                  key={`customer-${index}`}
                  className={`mx-[1px] rounded-full ${
                    activeSpeaker === "customer" ? "bg-blue-500" : "bg-blue-300"
                  } transition-all duration-300`}
                  style={{
                    height: `${activeSpeaker === "customer" ? height : height * 0.6}px`,
                    width: "2px",
                    transform: `scaleY(${progress > ((index / customerWaveformData.current.length) * 100) ? 1 : 0.3})`,
                    opacity: progress > (index / customerWaveformData.current.length) * 100 ? 1 : 0.3,
                  }}
                />
              ))}
            </div>
          </div>

          
        </div>

      
        <div className="h-2 bg-gray-200 rounded-full cursor-pointer relative" onClick={handleProgressBarClick}>
          <div className="h-full bg-black rounded-full" style={{ width: `${progress}%` }} />
        </div>

    
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(durationInSeconds)}</span>
        </div>
      </div>

    
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={togglePlayPause}
            className="w-10 h-10 md:w-12 md:h-12 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-1" />}
          </button>

          <div className="text-sm">
            <div className="font-medium">{activeSpeaker === "agent" ? "AI Agent" : "Customer"}</div>
            <div className="text-gray-500 text-xs">
              {activeSpeaker === "agent"
                ? progress == 0 ? "Tap on play button to play demo" : "Speaking now"
                : activeSpeaker === "customer"
                  ? "Responding"
                  : "Conversation paused"}
            </div>
          </div>
        </div>

        <button
          onClick={toggleMute}
          className="p-2 text-gray-500 hover:text-black transition-colors"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </div>
    </div>
  )
}

