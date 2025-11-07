"use client"

import { useState } from "react"

export default function About() {
  const [hoveredMember, setHoveredMember] = useState<number | null>(null)

  const team = [
    {
      name: "Mr. Arvind Yadav",
      role: "Managing Director",
      initials: "AY",
      bio: "Visionary leader with deep logistics expertise and 20+ years in the industry",
    },
    {
      name: "Mr. Ashok Kumar",
      role: "AGM",
      initials: "AK",
      bio: "Operational excellence specialist driving efficiency",
    },
    { name: "Mrs. Anchal", role: "HR & HSE", initials: "AC", bio: "Employee wellbeing and safety champion" },
    { name: "Mr. Akant Yadav", role: "Operation Head", initials: "AYD", bio: "Process optimization expert" },
  ]

  const stats = [
    { label: "Founded", value: "2017", icon: "📅" },
    { label: "Locations", value: "13+", icon: "📍" },
    { label: "Team Members", value: "190+", icon: "👥" },
    { label: "Years of Excellence", value: "7+", icon: "⭐" },
  ]

  const achievements = [
    { title: "ISO Certified", description: "Quality management systems certified" },
    { title: "Industry Leaders", description: "Recognized for logistics innovation" },
    { title: "Customer Satisfaction", description: "98% client retention rate" },
    { title: "24/7 Operations", description: "Round-the-clock service availability" },
  ]

  return (
    <section id="about" className="py-20 px-4 md:px-8 bg-gradient-to-b from-background to-card/30">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">About Ready 2 Go</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mb-8">
            Established in July 2017, Ready 2 Go Logistic Services is a leading warehousing and logistics provider
            specializing in FMCG, E-commerce, and Electronics industries. We deliver excellence through innovation and
            dedicated service.
          </p>
        </div>

        {/* Enhanced Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group p-6 rounded-xl border border-border/50 bg-gradient-to-br from-background/50 to-card/30 hover:border-accent/50 hover:from-background/80 hover:to-accent/5 transition-all duration-300 transform hover:scale-105"
            >
              <p className="text-3xl mb-2 group-hover:scale-125 transition-transform duration-300">{stat.icon}</p>
              <p className="text-4xl font-bold text-accent mb-2">{stat.value}</p>
              <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-xl border border-border/50 bg-gradient-to-br from-background/50 to-card/30 hover:border-accent/30 transition-all duration-300 group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative p-6">
                <div className="w-10 h-10 mb-3 rounded-lg bg-accent/20 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                  <span className="text-lg">✓</span>
                </div>
                <h4 className="font-bold text-foreground mb-1 text-sm">{achievement.title}</h4>
                <p className="text-xs text-muted-foreground">{achievement.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Leadership Team */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-foreground mb-12">Leadership Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredMember(index)}
                onMouseLeave={() => setHoveredMember(null)}
                className="group relative overflow-hidden rounded-xl border border-border/50 bg-gradient-to-br from-background/50 to-card/30 hover:border-accent/50 transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative p-8 flex flex-col items-center text-center">
                  <div className="w-20 h-20 mb-4 rounded-full bg-gradient-accent flex items-center justify-center text-white font-bold text-2xl shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                    {member.initials}
                  </div>
                  <h4 className="font-bold text-foreground mb-1 text-lg">{member.name}</h4>
                  <p className="text-sm font-semibold text-accent mb-3">{member.role}</p>

                  <div
                    className={`text-xs text-muted-foreground transition-all duration-300 ${
                      hoveredMember === index ? "opacity-100 h-auto" : "opacity-0 h-0"
                    }`}
                  >
                    {member.bio}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Core Business */}
        <div className="p-8 rounded-xl border border-border/50 bg-gradient-to-br from-background/50 to-card/30 hover:border-accent/50 transition-colors">
          <h3 className="text-2xl font-bold text-foreground mb-6">Core Competencies</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 rounded-lg hover:bg-accent/5 transition-colors">
              <span className="text-accent font-bold text-xl flex-shrink-0">✓</span>
              <span className="text-muted-foreground">Asset & Inventory Management</span>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg hover:bg-accent/5 transition-colors">
              <span className="text-accent font-bold text-xl flex-shrink-0">✓</span>
              <span className="text-muted-foreground">ERP Solutions Integration</span>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg hover:bg-accent/5 transition-colors">
              <span className="text-accent font-bold text-xl flex-shrink-0">✓</span>
              <span className="text-muted-foreground">Primary & Secondary Transportation</span>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg hover:bg-accent/5 transition-colors">
              <span className="text-accent font-bold text-xl flex-shrink-0">✓</span>
              <span className="text-muted-foreground">Custom Repackaging & Assembly</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
