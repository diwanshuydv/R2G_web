"use client"

import { useState } from "react"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      text: "Ready 2 Go has been instrumental in streamlining our supply chain. Their professionalism and efficiency are unmatched.",
      author: "Client Representative",
      company: "Univision Foods",
      rating: 5,
      industry: "FMCG",
    },
    {
      text: "The inventory management system they provided has reduced our operational costs significantly. Highly recommended!",
      author: "Operations Manager",
      company: "Premium E-commerce",
      rating: 5,
      industry: "E-commerce",
    },
    {
      text: "Exceptional last-mile delivery service with real-time tracking. Our customers are extremely satisfied.",
      author: "Supply Chain Head",
      company: "Electronics Distributor",
      rating: 5,
      industry: "Electronics",
    },
    {
      text: "Outstanding warehousing solutions with seamless integration into our existing systems. Best service provider in the industry.",
      author: "Logistics Director",
      company: "Distribution Hub",
      rating: 5,
      industry: "Logistics",
    },
  ]

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="testimonials" className="py-20 px-4 md:px-8 bg-card/30">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">What Our Clients Say</h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Trusted by leading brands in FMCG, E-commerce, and Electronics industries.
          </p>
        </div>

        <div className="relative mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`p-8 rounded-xl border transition-all duration-300 transform ${
                  index === currentIndex
                    ? "border-accent bg-background/80 scale-105 shadow-lg shadow-accent/20 md:col-span-2"
                    : "border-border bg-background/50 opacity-60 hidden md:block"
                }`}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>

                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-accent/20 text-accent text-xs font-semibold rounded-full">
                    {testimonial.industry}
                  </span>
                </div>

                <p className="text-muted-foreground mb-6 italic text-lg">"{testimonial.text}"</p>

                <div className="border-t border-border pt-4">
                  <p className="font-bold text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-accent">{testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={prevTestimonial}
              className="p-3 rounded-full border border-border hover:border-accent/50 bg-card/50 hover:bg-accent/10 transition-all duration-300 transform hover:scale-110"
            >
              <ChevronLeft className="w-5 h-5 text-muted-foreground hover:text-accent" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? "bg-accent w-8" : "bg-muted-foreground hover:bg-accent/50"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="p-3 rounded-full border border-border hover:border-accent/50 bg-card/50 hover:bg-accent/10 transition-all duration-300 transform hover:scale-110"
            >
              <ChevronRight className="w-5 h-5 text-muted-foreground hover:text-accent" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border border-border bg-background/50 hover:border-accent/50 transition-all duration-300 hover:bg-background group cursor-pointer"
              onClick={() => setCurrentIndex(index)}
            >
              <div className="flex gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3 group-hover:text-foreground transition-colors">
                "{testimonial.text}"
              </p>
              <div>
                <p className="font-semibold text-foreground text-sm">{testimonial.company}</p>
                <p className="text-xs text-accent">{testimonial.industry}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
