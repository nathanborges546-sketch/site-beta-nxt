import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

const steps = [
  {
    number: "01",
    title: "Structure",
    description: "Define the architecture. Information hierarchy, user flows, and technical requirements.",
  },
  {
    number: "02",
    title: "Design",
    description: "Visual systems that communicate. Clean interfaces built on solid foundations.",
  },
  {
    number: "03",
    title: "Build",
    description: "Engineering with precision. Clean code, optimized performance, scalable architecture.",
  },
  {
    number: "04",
    title: "Deploy",
    description: "Launch with confidence. Monitoring, analytics, and ongoing support.",
  },
]

function ProcessStep({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
      className="relative"
    >
      <div className="flex items-start gap-6">
        <span 
          className="text-5xl font-medium text-muted-foreground/30"
          style={{ fontFamily: "'Alegreya', Georgia, serif" }}
        >
          {step.number}
        </span>
        <div className="pt-2">
          <h3 
            className="text-2xl text-foreground mb-2"
            style={{ fontFamily: "'Alegreya', Georgia, serif" }}
          >
            {step.title}
          </h3>
          <p className="text-muted-foreground leading-relaxed max-w-sm">
            {step.description}
          </p>
        </div>
      </div>
      
      {/* Connector line */}
      {index < steps.length - 1 && (
        <div className="hidden lg:block absolute left-[3.5rem] top-24 w-px h-16 bg-border" />
      )}
    </motion.div>
  )
}

export function ProcessSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section id="process" className="py-24 lg:py-32 bg-muted/30">
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
            Process
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            A structured approach to building digital systems.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {steps.map((step, index) => (
            <ProcessStep key={step.number} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
