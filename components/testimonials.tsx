"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "John D.",
    location: "McKinney, TX",
    image: "/images/testimonial-1.png",
    rating: 5,
    text: "DUCTWARRIORS transformed our home! The air quality improved dramatically after they cleaned our ducts. The team was professional, thorough, and left no mess behind. Highly recommend!",
  },
  {
    id: 2,
    name: "Sarah M.",
    location: "Frisco, TX",
    image: "/images/testimonial-2.png",
    rating: 5,
    text: "As someone with allergies, I noticed an immediate difference after DUCTWARRIORS cleaned our air ducts. They were on time, explained everything, and the price was exactly as quoted. Great service!",
  },
  {
    id: 3,
    name: "Robert J.",
    location: "Plano, TX",
    image: "/images/testimonial-3.png",
    rating: 5,
    text: "We had our chimney and dryer vent cleaned by DUCTWARRIORS. They were extremely knowledgeable and took the time to explain the process. Our dryer works so much better now!",
  },
  {
    id: 4,
    name: "Lisa T.",
    location: "Allen, TX",
    image: "/images/testimonial-4.png",
    rating: 5,
    text: "The Elite Tier service is worth every penny! Having monthly maintenance gives us peace of mind, and the team is always professional and friendly. Our HVAC system has never run better.",
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1))
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1))
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display text-gray-800">What Our Customers Say</h2>
          <p className="text-xl max-w-3xl mx-auto text-gray-700">
            Don't just take our word for it - hear from our satisfied customers across Texas.
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="rounded-[30px] py-8 px-6 bg-gray-50 shadow-[8px_8px_16px_#d1d1d1,-8px_-8px_16px_#ffffff]">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/3 mb-6 md:mb-0 flex justify-center">
                <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <Image
                    src={testimonials[currentIndex].image || "/placeholder.svg"}
                    alt={testimonials[currentIndex].name}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </div>
              <div className="md:w-2/3 md:pl-8">
                <div className="flex mb-4">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-700 italic mb-4">"{testimonials[currentIndex].text}"</blockquote>
                <div className="font-bold text-gray-800">{testimonials[currentIndex].name}</div>
                <div className="text-gray-600">{testimonials[currentIndex].location}</div>
              </div>
            </div>
          </div>

          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-gradient-to-r from-[#ff7b1c] to-[#ff9633] text-white rounded-full p-2 shadow-lg hover:opacity-90 transition-opacity"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-gradient-to-r from-[#ff7b1c] to-[#ff9633] text-white rounded-full p-2 shadow-lg hover:opacity-90 transition-opacity"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-3 w-3 rounded-full ${currentIndex === index ? "bg-[#ff7b1c]" : "bg-gray-300"}`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
