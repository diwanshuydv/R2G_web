"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, Sparkles } from "@react-three/drei"
import type * as THREE from "three"

function WarehouseScene() {
  const warehouseRef = useRef<THREE.Group>(null)
  const boxesRef = useRef<THREE.Group>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [particleCount, setParticleCount] = useState(30)

  useFrame((state) => {
    if (warehouseRef.current) {
      warehouseRef.current.rotation.y += isHovered ? 0.0002 : 0.0005
      warehouseRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
    if (boxesRef.current) {
      boxesRef.current.rotation.z += 0.001
      boxesRef.current.position.y = Math.cos(state.clock.elapsedTime * 0.5) * 0.15
    }
  })

  return (
    <group ref={warehouseRef} onPointerEnter={() => setIsHovered(true)} onPointerLeave={() => setIsHovered(false)}>
      {/* Main warehouse structure */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[8, 6, 12]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.4} roughness={0.6} />
      </mesh>

      {/* Warehouse roof */}
      <mesh position={[0, 3.2, 0]} castShadow>
        <coneGeometry args={[8.5, 1.5, 4]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.5} roughness={0.7} />
      </mesh>

      {/* Warehouse doors */}
      <mesh position={[0, 0, -6.1]} castShadow>
        <boxGeometry args={[3, 4, 0.3]} />
        <meshStandardMaterial color="#2d2d2d" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Cargo boxes group */}
      <group ref={boxesRef}>
        {/* Left stack */}
        {[0, 1, 2].map((i) => (
          <mesh key={`left-${i}`} position={[-3, -1.5 + i * 2, 4]} castShadow>
            <boxGeometry args={[1.2, 1.8, 1.2]} />
            <meshStandardMaterial
              color={`hsl(264, ${80 - i * 10}%, ${50 + i * 5}%)`}
              metalness={0.3}
              roughness={0.7}
              emissive={`hsl(264, ${60 - i * 10}%, ${30 + i * 3}%)`}
              emissiveIntensity={0.3}
            />
          </mesh>
        ))}

        {/* Center stack */}
        {[0, 1, 2, 3].map((i) => (
          <mesh key={`center-${i}`} position={[0, -1.5 + i * 2, 0]} castShadow>
            <boxGeometry args={[1.5, 1.8, 1.5]} />
            <meshStandardMaterial
              color={`hsl(40, ${60 - i * 5}%, ${55 + i * 3}%)`}
              metalness={0.2}
              roughness={0.8}
              emissive={`hsl(40, ${50 - i * 5}%, ${35 + i * 2}%)`}
              emissiveIntensity={0.25}
            />
          </mesh>
        ))}

        {/* Right stack */}
        {[0, 1, 2].map((i) => (
          <mesh key={`right-${i}`} position={[3, -1.5 + i * 2, 4]} castShadow>
            <boxGeometry args={[1.2, 1.8, 1.2]} />
            <meshStandardMaterial
              color={`hsl(120, ${70 - i * 10}%, ${50 + i * 5}%)`}
              metalness={0.3}
              roughness={0.7}
              emissive={`hsl(120, ${60 - i * 10}%, ${30 + i * 3}%)`}
              emissiveIntensity={0.3}
            />
          </mesh>
        ))}

        {/* Additional small boxes */}
        {[0, 1].map((i) => (
          <mesh key={`front-${i}`} position={[-2 + i * 4, -1.5, -4]} castShadow>
            <boxGeometry args={[0.8, 1.2, 0.8]} />
            <meshStandardMaterial color={`hsl(${270 + i * 30}, 65%, 45%)`} metalness={0.25} roughness={0.75} />
          </mesh>
        ))}
      </group>

      {/* Ground platform */}
      <mesh position={[0, -3, 0]} receiveShadow>
        <boxGeometry args={[14, 0.5, 16]} />
        <meshStandardMaterial color="#0f0f0f" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Perimeter walls */}
      <mesh position={[-7.2, 0, 0]} receiveShadow>
        <boxGeometry args={[0.3, 6, 12]} />
        <meshStandardMaterial color="#151515" metalness={0.3} roughness={0.8} />
      </mesh>
      <mesh position={[7.2, 0, 0]} receiveShadow>
        <boxGeometry args={[0.3, 6, 12]} />
        <meshStandardMaterial color="#151515" metalness={0.3} roughness={0.8} />
      </mesh>

      <pointLight position={[5, 3, 5]} intensity={1.2} color="#60a5fa" castShadow />
      <pointLight position={[-5, 3, -5]} intensity={0.8} color="#ec4899" castShadow />
      <pointLight position={[0, 4, 8]} intensity={0.7} color="#fbbf24" />
      <spotLight position={[0, 2, -7]} intensity={0.9} color="#3b82f6" angle={0.5} penumbra={1} />
    </group>
  )
}

export default function Hero3D() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(false)
  }, [])

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden pt-20 bg-background">
      {/* 3D Canvas */}
      <div className="absolute inset-0 w-full h-full">
        <Canvas camera={{ position: [12, 5, 12], fov: 50 }} shadows gl={{ antialias: true }}>
          <color attach="background" args={["#050505"]} />
          <WarehouseScene />
          <OrbitControls
            autoRotate
            autoRotateSpeed={2}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 2}
            enableZoom={true}
            enablePan={true}
            dampingFactor={0.05}
            autoRotateWithoutInteraction
          />
          <Environment preset="night" intensity={0.8} />
          <ambientLight intensity={0.5} color="#ffffff" />
          <directionalLight position={[10, 10, 5]} intensity={0.8} castShadow color="#f3f4f6" />
          <Sparkles count={50} scale={15} size={3} speed={0.5} />
        </Canvas>
      </div>

      {/* Hero Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-gradient-to-t from-background via-background/20 to-transparent">
        <div className="text-center max-w-3xl px-4 md:px-8">
          <div className="mb-4">
            <span className="inline-block px-4 py-2 rounded-full bg-accent/10 border border-accent/30 text-accent text-sm font-medium mb-6 animate-fade-in">
              End-to-End Logistics Solutions
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight text-balance animate-fade-in">
            Ready 2 Go Logistics
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-8 text-balance animate-fade-in-delayed">
            Warehousing, inventory management, and distribution services for FMCG, E-commerce, and beyond
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delayed-2">
            <button className="px-8 py-3 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-accent/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-accent/30 hover:scale-105 transform">
              Explore Services
            </button>
            <button className="px-8 py-3 border-2 border-accent text-accent font-semibold rounded-lg hover:bg-accent/10 transition-all duration-300 hover:scale-105 transform">
              Schedule Demo
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>

      {/* Interactive hint */}
      <div className="absolute top-24 right-4 md:right-8 z-20 glass-effect px-4 py-2 rounded-lg animate-fade-in">
        <p className="text-sm text-muted-foreground">Drag to rotate • Scroll to zoom</p>
      </div>
    </section>
  )
}
