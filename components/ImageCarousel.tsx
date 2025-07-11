'use client'

import { useState } from 'react'
import Image from 'next/image'

interface ImageCarouselProps {
  images: string[]
  alt?: string
}

export default function ImageCarousel({ images, alt = 'Image' }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (images.length === 0) {
    return <div className="w-full h-96 bg-gray-200 flex items-center justify-center">Pas d'image</div>
  }

  const prev = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length)
  }

  const next = () => {
    setCurrentIndex((currentIndex + 1) % images.length)
  }

  return (
    <div className="relative w-full max-w-4xl mx-auto h-[400px] select-none">
      <Image
        src={images[currentIndex]}
        alt={`${alt} ${currentIndex + 1}`}
        fill
        className="object-contain rounded-lg"
        sizes="(max-width: 768px) 100vw, 800px"
        priority
      />

      {/* Boutons flèches */}
      <button
        onClick={prev}
        aria-label="Image précédente"
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-40 text-white rounded-full p-2 hover:bg-opacity-70 transition"
      >
        ‹
      </button>
      <button
        onClick={next}
        aria-label="Image suivante"
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-40 text-white rounded-full p-2 hover:bg-opacity-70 transition"
      >
        ›
      </button>

      {/* Pagination */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, i) => (
          <span
            key={i}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              i === currentIndex ? 'bg-blue-600' : 'bg-gray-400'
            }`}
            onClick={() => setCurrentIndex(i)}
          />
        ))}
      </div>
    </div>
  )
}
