"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import type * as THREE from "three"

function WarehouseBoxes({ serviceIndex }: { serviceIndex: number }) {
  const groupRef = useRef<THREE.Group>(null)
  const boxesRef = useRef<THREE.Mesh[]>([])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002
    }
    boxesRef.current.forEach((box, i) => {
      if (box) {
        box.position.y += Math.sin(state.clock.elapsedTime * 1.5 + i) * 0.015
        box.rotation.x += 0.002 + serviceIndex * 0.0005
        box.rotation.z += 0.001
        box.scale.set(
          1 + Math.sin(state.clock.elapsedTime * 2 + i * 0.5) * 0.05,
          1 + Math.sin(state.clock.elapsedTime * 2 + i * 0.5) * 0.05,
          1 + Math.sin(state.clock.elapsedTime * 2 + i * 0.5) * 0.05,
        )
      }
    })
  })

  return (
    <group ref={groupRef}>
      {[0, 1, 2].map((i) => (
        <mesh
          key={i}
          position={[i * 3 - 3, 0, 0]}
          castShadow
          ref={(el) => {
            if (el) boxesRef.current[i] = el
          }}
        >
          <boxGeometry args={[2, 2.5, 2]} />
          <meshStandardMaterial
            color={`hsl(${264 + i * 30 + serviceIndex * 15}, 70%, 50%)`}
            metalness={0.4}
            roughness={0.6}
            emissive={`hsl(${264 + i * 30 + serviceIndex * 15}, 60%, 30%)`}
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}
    </group>
  )
}

interface ServiceCardProps {
  title: string
  description: string
  icon: string
  index: number
  onClick: () => void
  isActive: boolean
}

function ServiceCard({ title, description, icon, index, onClick, isActive }: ServiceCardProps) {
  return (
    <button
      onClick={onClick}
      className={`p-6 rounded-xl border-2 transition-all duration-300 text-left group ${
        isActive
          ? "border-accent bg-accent/10 shadow-lg shadow-accent/20 scale-105"
          : "border-border hover:border-accent/50 bg-card hover:bg-card/80"
      }`}
    >
      <div
        className={`text-4xl mb-3 transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:scale-105"}`}
      >
        {icon}
      </div>
      <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
      {isActive && (
        <div className="mt-4 inline-block px-3 py-1 bg-accent/20 rounded-full text-xs text-accent font-semibold">
          Service {index + 1} of 6
        </div>
      )}
    </button>
  )
}

export default function Services() {
  const [activeService, setActiveService] = useState(0)

  const services = [
    {
      title: "Warehousing",
      description: "State-of-the-art facilities with asset and inventory management",
      icon: "🏭",
    },
    {
      title: "Inventory Management",
      description: "Advanced ERP solutions for optimal stock management",
      icon: "📊",
    },
    {
      title: "Order Fulfillment",
      description: "Fast and accurate order processing and delivery",
      icon: "📦",
    },
    {
      title: "Forward Logistics",
      description: "Primary & secondary transportation to final destinations",
      icon: "🚚",
    },
    {
      title: "Reverse Logistics",
      description: "Efficient returns and stock management",
      icon: "↩️",
    },
    {
      title: "Last Mile Delivery",
      description: "Direct warehouse to customer delivery service",
      icon: "🎯",
    },
  ]

  return (
    <section id="services" className="py-20 px-4 md:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Comprehensive Logistics Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            From warehousing to last-mile delivery, we provide end-to-end logistics solutions tailored to your business
            needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              {...service}
              index={index}
              isActive={activeService === index}
              onClick={() => setActiveService(index)}
            />
          ))}
        </div>

        {/* 3D Visualization with enhanced interactivity */}
        <div className="relative w-full h-96 rounded-2xl border border-border overflow-hidden bg-gradient-to-br from-slate-950/80 to-black/50 backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent pointer-events-none z-10" />

          <Canvas camera={{ position: [0, 0, 8], fov: 50 }} shadows gl={{ antialias: true }}>
            <color attach="background" args={["#0a0a0a"]} />
            <WarehouseBoxes serviceIndex={activeService} />
            <OrbitControls autoRotate autoRotateSpeed={3} enableZoom={true} enablePan={false} dampingFactor={0.05} />
            <Environment preset="studio" intensity={0.7} />
            <ambientLight intensity={0.6} color="#ffffff" />
            <pointLight position={[10, 10, 10]} intensity={0.8} color="#f3f4f6" castShadow />
            <pointLight position={[-10, 5, 5]} intensity={0.4} color="#60a5fa" />
            <pointLight position={[0, -5, 8]} intensity={0.3} color="#ec4899" />
          </Canvas>

          {/* Service info overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 rounded-b-2xl z-20">
            <h3 className="text-xl font-bold text-white mb-1">{services[activeService].title}</h3>
            <p className="text-sm text-slate-300">{services[activeService].description}</p>
            <div className="mt-4 flex gap-2 text-xs text-slate-400">
              <span>Click a service card above to explore</span>
              <span className="text-accent">→</span>
            </div>
          </div>
        </div>

        {/* Service features list */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Scalable Solutions", description: "Grow your logistics with our flexible infrastructure" },
            { title: "24/7 Support", description: "Round-the-clock assistance for all your logistics needs" },
            { title: "Advanced Technology", description: "Cutting-edge systems for real-time tracking and management" },
          ].map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border border-border/50 bg-card/50 hover:border-accent/30 hover:bg-card/80 transition-all duration-300 group"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{["⚙️", "🛡️", "🔧"][index]}</div>
              <h4 className="font-bold text-foreground mb-2">{feature.title}</h4>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
