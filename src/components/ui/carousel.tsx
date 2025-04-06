"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

interface CarouselProps {
    images: string[]
    alt: string
}

export function ImageCarousel({ images, alt }: CarouselProps) {
    const [currentIndex, setCurrentIndex] = React.useState(0)

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0
        const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1
        setCurrentIndex(newIndex)
    }

    const goToNext = () => {
        const isLastSlide = currentIndex === images.length - 1
        const newIndex = isLastSlide ? 0 : currentIndex + 1
        setCurrentIndex(newIndex)
    }

    const goToSlide = (slideIndex: number) => {
        setCurrentIndex(slideIndex)
    }

    return (
        <div className="relative h-80 w-full overflow-hidden rounded-md bg-gray-200">
            <div className="absolute left-0 top-0 h-full w-full">
                <Image
                    src={images[currentIndex]}
                    alt={`${alt} - slide ${currentIndex + 1}`}
                    width={400}
                    height={225}
                    className="h-full w-full object-cover"
                />
            </div>

            {/* Navigation arrows */}
            <button
                onClick={goToPrevious}
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/70 p-1 text-gray-800 shadow-md transition-all hover:bg-white"
                aria-label="Previous image"
            >
                <ChevronLeft size={20} />
            </button>

            <button
                onClick={goToNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/70 p-1 text-gray-800 shadow-md transition-all hover:bg-white"
                aria-label="Next image"
            >
                <ChevronRight size={20} />
            </button>

            {/* Dots indicator */}
            <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 space-x-1">
                {images.map((_, slideIndex) => (
                    <button
                        key={slideIndex}
                        onClick={() => goToSlide(slideIndex)}
                        className={`h-2 w-2 rounded-full ${
                            currentIndex === slideIndex ? "bg-white" : "bg-white/50"
                        }`}
                        aria-label={`Go to slide ${slideIndex + 1}`}
                    />
                ))}
            </div>
        </div>
    )
}