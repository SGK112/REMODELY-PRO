'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'

interface GalleryProps {
  images: { src: string; alt: string }[]
  interval?: number
}

export default function Gallery({ images, interval = 3500 }: GalleryProps) {
  const [current, setCurrent] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length)
    }, interval)
    return () => clearInterval(timer)
  }, [images.length, interval])

  return (
    <div className="relative w-full max-w-md h-72 flex items-center justify-center overflow-hidden">
      {images.map((img, idx) => (
        <div
          key={img.src}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${current === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover rounded-xl shadow-lg border-4 border-green-500"
            priority={idx === 0}
          />
        </div>
      ))}
    </div>
  )
}
