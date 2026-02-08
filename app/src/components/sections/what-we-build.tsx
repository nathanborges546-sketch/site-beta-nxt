import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Globe, Layers, Monitor } from "lucide-react"

const services = [
  {
    icon: Globe,
    title: "Institutional Websites",
    description: "Clean, structured web presence designed for clarity and conversion. Built with modern standards and optimized performance.",
  },
  {
    icon: Layers,
    title: "Digital Products",
    description: "End-to-end product design and development. From concept to deployment, we build systems that users trust.",
  },
  {
    icon: Monitor,
    title: "Software Interfaces",
    description: "Complex dashboards and internal tools engineered for efficiency. Intuitive UX meets robust functionality.",
  },
]

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const Icon = service.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="group p-8 rounded-2xl border border-border bg-card hover:border-foreground/20 transition-colors duration-300"
    >
      <div className="mb-6">
        <Icon className="w-8 h-8 text-foreground" strokeWidth={1.5} />
      </div>
      <h3 
        className="text-xl text-card-foreground mb-3"
        style={{ fontFamily: "'Alegreya', Georgia, serif" }}
      >
        {service.title}
      </h3>
      <p className="text-muted-foreground leading-relaxed text-sm">
        {service.description}
      </p>
    </motion.div>
  )
}

export function WhatWeBuildSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section id="work" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-16"
        >
          <h2 
            className="text-3xl sm:text-4xl text-foreground mb-4"
            style={{ fontFamily: "'Alegreya', Georgia, serif" }}
          >
            What We Build
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            Technical solutions for companies that value precision over polish.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
