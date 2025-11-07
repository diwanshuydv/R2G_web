"use client"

import { useState } from "react"
import { MapPin, Phone, Mail } from "lucide-react"

export default function Locations() {
  const [selectedLocation, setSelectedLocation] = useState(0)

  const locations = [
    {
      region: "Headquarters - North",
      city: "Gurgaon",
      address: "Baslambi, Near Shiv Mandir, Baslambi, Gurgaon, Haryana 122503",
      phone: "+91 9582322276",
      email: "management@readytogologistic.com",
      isHeadquarters: true,
      coordinates: { x: 65, y: 35 }, // Added coordinates for map visualization
    },
    {
      region: "Zonal Office - North",
      city: "Gurgaon",
      address: "Katria Complex Ground Floor, Doltabad, Gurgaon 122001",
      phone: "+91 9582322276",
      email: "management@readytogologistic.com",
      coordinates: { x: 65, y: 38 },
    },
    {
      region: "Pan-India Presence",
      city: "Multiple Locations",
      address: "13+ Warehouse locations across India with 2 main branches",
      phone: "Contact for details",
      email: "management@readytogologistic.com",
      coordinates: { x: 50, y: 50 },
    },
  ]

  return (
    <section id="locations" className="py-20 px-4 md:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Our Locations</h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Strategically positioned across India to serve your logistics needs efficiently.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Location Cards */}
          <div className="lg:col-span-1 space-y-4">
            {locations.map((location, index) => (
              <button
                key={index}
                onClick={() => setSelectedLocation(index)}
                className={`w-full p-6 rounded-xl border-2 transition-all text-left group ${
                  selectedLocation === index
                    ? "border-accent bg-accent/10 shadow-lg shadow-accent/20"
                    : "border-border hover:border-accent/50 bg-card/50"
                }`}
              >
                {location.isHeadquarters && (
                  <span className="inline-block px-3 py-1 bg-accent/20 text-accent text-xs font-bold rounded-full mb-3">
                    HEADQUARTERS
                  </span>
                )}
                <h3 className="text-lg font-bold text-foreground mb-1">{location.region}</h3>
                <p className="text-sm font-semibold text-accent">{location.city}</p>
              </button>
            ))}
          </div>

          {/* Map Visualization with Interactive Markers */}
          <div className="lg:col-span-2 relative rounded-xl border border-border bg-gradient-to-br from-slate-950 to-slate-900 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent" />

            {/* India map outline (simplified) */}
            <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path
                d="M 35 20 L 75 25 L 80 50 L 70 75 L 40 80 L 20 70 L 15 40 Z"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            </svg>

            {/* Location Markers */}
            {locations.map((location, index) => (
              <div
                key={index}
                className="absolute transition-all duration-300 cursor-pointer group"
                style={{
                  left: `${location.coordinates.x}%`,
                  top: `${location.coordinates.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
                onClick={() => setSelectedLocation(index)}
              >
                <div
                  className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                    selectedLocation === index
                      ? "bg-accent shadow-lg shadow-accent/50"
                      : "bg-accent/60 hover:bg-accent/80"
                  }`}
                >
                  <div className="absolute inset-0 rounded-full bg-accent/20 animate-pulse" />
                  <MapPin className="w-6 h-6 text-white relative z-10" />
                </div>
              </div>
            ))}

            {/* Info Box */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent rounded-b-xl z-20">
              <h4 className="text-lg font-bold text-white mb-2">{locations[selectedLocation].region}</h4>
              <p className="text-sm text-slate-300 mb-3">{locations[selectedLocation].city}</p>
              <div className="space-y-2 text-xs text-slate-400">
                <p>📍 {locations[selectedLocation].address}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {locations.map((location, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl border-2 transition-all ${
                location.isHeadquarters
                  ? "border-accent bg-accent/5"
                  : "border-border hover:border-accent/50 bg-card/50 hover:bg-card/80"
              }`}
            >
              {location.isHeadquarters && (
                <span className="inline-block px-3 py-1 bg-accent/20 text-accent text-xs font-bold rounded-full mb-4">
                  HEADQUARTERS
                </span>
              )}
              <h3 className="text-lg font-bold text-foreground mb-2">{location.region}</h3>
              <p className="text-sm font-semibold text-accent mb-4">{location.city}</p>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <MapPin className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">{location.address}</p>
                </div>
                <div className="flex gap-3">
                  <Phone className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  <a href={`tel:${location.phone}`} className="text-sm text-accent hover:underline">
                    {location.phone}
                  </a>
                </div>
                <div className="flex gap-3">
                  <Mail className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  <a href={`mailto:${location.email}`} className="text-sm text-accent hover:underline">
                    {location.email}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
