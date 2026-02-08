import { motion } from "framer-motion"

interface AnimatedLogoProps {
  size?: number
  className?: string
  staticLogo?: boolean
}

// Official NXT logo image path
const LOGO_SRC = "/nxt-logo.png"

/**
 * Parametric motion animation for NXT logo
 * - Rotation: max 1-2 degrees
 * - Translation: max 1-2px
 * - Period: 4-6 seconds
 * - Smooth easing, continuous loop
 * - Almost imperceptible at a glance
 */
export function AnimatedLogo({ size = 48, className = "", staticLogo = false }: AnimatedLogoProps) {
  if (staticLogo) {
    return (
      <img
        src={LOGO_SRC}
        alt="NXT"
        width={size}
        height={size}
        className={`object-contain ${className}`}
        style={{ 
          filter: "var(--logo-filter, none)",
        }}
      />
    )
  }

  return (
    <motion.div
      animate={{
        rotate: [0, 1.5, 0, -1, 0.5, 0],
        x: [0, 1, -0.5, 1.5, 0, -1, 0],
        y: [0, -0.5, 1, 0, -1, 0.5, 0],
      }}
      transition={{
        duration: 5.5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
      }}
      style={{ 
        display: "inline-block",
        width: size,
        height: size,
      }}
    >
      <img
        src={LOGO_SRC}
        alt="NXT"
        width={size}
        height={size}
        className={`object-contain w-full h-full ${className}`}
        style={{ 
          filter: "var(--logo-filter, none)",
        }}
      />
    </motion.div>
  )
}

// Header version - slightly faster, more subtle
export function HeaderLogo({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <motion.div
      animate={{
        rotate: [0, 1, 0.5, -1, 0],
        x: [0, 0.5, -0.5, 0.5, 0],
        y: [0, -0.5, 0.5, -0.5, 0],
      }}
      transition={{
        duration: 4.5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
      }}
      style={{ 
        display: "inline-block",
        width: size,
        height: size,
      }}
    >
      <img
        src={LOGO_SRC}
        alt="NXT"
        width={size}
        height={size}
        className={`object-contain w-full h-full ${className}`}
        style={{ 
          filter: "var(--logo-filter, none)",
        }}
      />
    </motion.div>
  )
}

// Text-only logotype for header
export function Logotype({ className = "" }: { className?: string }) {
  return (
    <span 
      className={`font-semibold text-xl tracking-tight text-foreground ${className}`}
      style={{ fontFamily: "'General Sans', system-ui, sans-serif" }}
    >
      NXT
    </span>
  )
}
