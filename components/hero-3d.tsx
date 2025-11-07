"use client"

import { useRef, useState, useEffect, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, Sparkles, useGLTF } from "@react-three/drei"
import type * as THREE from "three"

/*
* NOTE: You will need to provide a 3D model for the warehouse.
* Download or create a model and save it as /public/models/warehouse-scene.gltf
* You can find free models on sites like Sketchfab (make sure to check licenses).
*/
function WarehouseScene() {
  const { scene } = useGLTF("/models/warehouse-scene.gltf")
  const modelRef = useRef<THREE.Group>(null)
  const [isHovered, setIsHovered] = useState(false)

  // Apply animations to the loaded model
  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += isHovered ? 0.0002 : 0.0005
      modelRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })

  // Clone the scene to be able to use it in the canvas
  // We also set castShadow and receiveShadow on all meshes in the model
  const clonedScene = scene.clone()
  clonedScene.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      child.castShadow = true
      child.receiveShadow = true
    }
  })

  return (
    <group ref={modelRef} onPointerEnter={() => setIsHovered(true)} onPointerLeave={() => setIsHovered(false)}>
      {/* Render the loaded model. 
        Adjust scale and position as needed to fit your scene.
      */}
      <primitive object={clonedScene} scale={0.5} position={[0, -3, 0]} />

      {/* Keep the lights from your original scene */}
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
          
          {/* Use Suspense to show a fallback while the model loads */}
          <Suspense fallback={null}>
            <WarehouseScene />
          </Suspense>
          
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

      {/* Hero Content Overlay (No changes here) */}
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

      {/* Scroll indicator (No changes here) */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>

      {/* Interactive hint (No changes here) */}
      <div className="absolute top-24 right-4 md:right-8 z-20 glass-effect px-4 py-2 rounded-lg animate-fade-in">
        <p className="text-sm text-muted-foreground">Drag to rotate • Scroll to zoom</p>
      </div>
    </section>
  )
}
