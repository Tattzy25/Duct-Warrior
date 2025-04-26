"use client"

import { useState, useRef } from "react"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"

interface ServiceVideoProps {
  src: string
  poster?: string
  title: string
  description?: string
}

export default function ServiceVideo({ src, poster, title, description }: ServiceVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <div className="relative rounded-xl overflow-hidden shadow-lg bg-texas-cream">
      <div className="relative aspect-video">
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover"
          onEnded={() => setIsPlaying(false)}
        />

        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 transition-opacity duration-300 hover:bg-opacity-20">
          <button
            onClick={togglePlay}
            className="bg-texas-orange hover:bg-texas-blue text-white rounded-full p-4 transition-transform transform hover:scale-110"
            aria-label={isPlaying ? "Pause video" : "Play video"}
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>
        </div>

        <div className="absolute bottom-4 right-4">
          <button
            onClick={toggleMute}
            className="bg-texas-blue bg-opacity-70 hover:bg-opacity-100 text-white rounded-full p-2 transition-all"
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-xl font-bold text-texas-blue">{title}</h3>
        {description && <p className="text-gray-700 mt-2">{description}</p>}
      </div>
    </div>
  )
}
