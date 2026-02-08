import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { AnimatedLogo } from "../animated-logo"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 grid-texture">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="space-y-8"
          >
            <h1 
              className="text-4xl sm:text-5xl lg:text-6xl text-foreground leading-tight"
              style={{ fontFamily: "'Alegreya', Georgia, serif" }}
            >
              Digital systems built with engineering precision.
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              NXT designs and develops websites, digital products, and software interfaces 
              for companies that need systems that scale, not templates that break.
            </p>
            
            <div>
              <Link
                to="/onboarding"
                className="inline-flex items-center justify-center px-8 py-3 text-sm font-medium text-background bg-foreground rounded-full hover:bg-foreground/90 transition-colors duration-200"
              >
                Start a project
              </Link>
            </div>
          </motion.div>

          {/* Right: Animated Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              <AnimatedLogo size={280} className="text-foreground" />
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  )
}
