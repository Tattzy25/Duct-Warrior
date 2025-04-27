"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

interface GalleryImage {
  src: string
  alt: string
  category?: string
}

interface ImageGalleryCarouselProps {
  images: GalleryImage[]
  autoplay?: boolean
  interval?: number
}

export default function ImageGalleryCarousel({ images, autoplay = true, interval = 5000 }: ImageGalleryCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }, [images.length])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }, [images.length])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  useEffect(() => {
    if (autoplay && !isHovering) {
      const timer = setTimeout(() => {
        nextSlide()
      }, interval)
      return () => clearTimeout(timer)
    }
  }, [currentIndex, autoplay, interval, isHovering, nextSlide])

  return (
    <div
      className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-xl"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="relative aspect-[16/10] w-full max-w-4xl mx-auto rounded-[30px] overflow-hidden shadow-[8px_8px_16px_#d1d1d1,-8px_-8px_16px_#ffffff]">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {image.src ? (
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt || "Gallery image"}
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover"
                priority={index === 0}
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">No image available</span>
              </div>
            )}
            {image.category && (
              <div className="absolute bottom-4 left-4 bg-gradient-to-r from-[#ff7b1c] to-[#ff9633] text-white px-3 py-1 rounded-full text-sm">
                {image.category}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <div className="absolute bottom-4 right-4 flex space-x-2">
        <button
          onClick={prevSlide}
          className="bg-gradient-to-r from-[#ff7b1c] to-[#ff9633] text-white rounded-full p-2 hover:opacity-90 transition-opacity"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={nextSlide}
          className="bg-gradient-to-r from-[#ff7b1c] to-[#ff9633] text-white rounded-full p-2 hover:opacity-90 transition-opacity"
          aria-label="Next image"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-3 w-3 rounded-full ${index === currentIndex ? "bg-[#ff7b1c]" : "bg-gray-300"}`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
