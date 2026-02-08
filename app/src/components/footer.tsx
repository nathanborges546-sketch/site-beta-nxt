import { HeaderLogo } from "./animated-logo"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-12 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Left: Logo */}
          <div className="flex items-center gap-3">
            <HeaderLogo size={28} />
          </div>

          {/* Center: Tagline */}
          <p 
            className="text-lg text-muted-foreground"
            style={{ fontFamily: "'Alegreya', Georgia, serif" }}
          >
            Build. Learn. Evolve.
          </p>

          {/* Right: Copyright */}
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} NXT
          </p>
        </div>
      </div>
    </footer>
  )
}
