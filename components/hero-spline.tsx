'use client'

import { SplineScene } from "@/components/ui/spline-scene";
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
import { Button } from "@/components/ui/button"

export default function HeroSpline() {
  return (
    <section className="w-full pt-20 pb-10 px-4 md:px-8 bg-background overflow-hidden">
      <Card className="w-full min-h-[85vh] bg-black/[0.96] relative overflow-hidden border-border/50">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />
        
        <div className="flex flex-col lg:flex-row h-full min-h-[85vh]">
          {/* Left content */}
          <div className="flex-1 p-8 md:p-16 relative z-10 flex flex-col justify-center text-left">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 rounded-full bg-accent/10 border border-accent/30 text-accent text-sm font-medium animate-fade-in">
                End-to-End Logistics Solutions
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 mb-6 leading-tight">
              Ready 2 Go Logistics
            </h1>
            
            <p className="mt-4 text-neutral-300 max-w-xl text-lg md:text-xl mb-8 leading-relaxed">
              Warehousing, inventory management, and distribution services for FMCG, E-commerce, and beyond. Bring your supply chain to life.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/20"
              >
                Explore Services
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-neutral-700 text-neutral-300 hover:bg-neutral-800 hover:text-white"
              >
                Schedule Demo
              </Button>
            </div>
          </div>

          {/* Right content - Spline Scene */}
          <div className="flex-1 relative min-h-[400px] lg:min-h-auto">
            <SplineScene 
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
            {/* Overlay gradient to blend scene at bottom on mobile */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/[0.96] to-transparent lg:hidden pointer-events-none" />
          </div>
        </div>
      </Card>
    </section>
  )
}
