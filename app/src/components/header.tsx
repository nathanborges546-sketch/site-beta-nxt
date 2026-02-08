import { Link } from "react-router-dom"
import { ThemeToggle } from "./theme-toggle"
import { Logotype, HeaderLogo } from "./animated-logo"

const navItems = [
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
]

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Navigation */}
          <nav className="flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right: Logo and Theme Toggle */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2">
              <HeaderLogo size={24} />
              <Logotype />
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
