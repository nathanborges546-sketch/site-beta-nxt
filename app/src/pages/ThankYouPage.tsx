import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Header } from "../components/header"
import { Footer } from "../components/footer"

export default function ThankYouPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      <section className="pt-32 pb-24 flex items-center justify-center min-h-[60vh]">
        <div className="max-w-2xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="p-12 rounded-2xl bg-muted/50 border border-border"
          >
            <h1 
              className="text-4xl sm:text-5xl text-foreground mb-6"
              style={{ fontFamily: "'Alegreya', Georgia, serif" }}
            >
              Thank you.
            </h1>
            
            <p className="text-lg text-muted-foreground mb-2">
              We&apos;ve received your information.
            </p>
            
            <p className="text-muted-foreground mb-4">
              If it&apos;s a good fit, we&apos;ll reply by email with the next steps.
            </p>
            
            <p className="text-sm text-muted-foreground mb-10">
              Please check your inbox (and spam folder) for confirmation.
            </p>
            
            <Link
              to="/"
              className="inline-flex items-center justify-center px-8 py-3 text-sm font-medium text-background bg-foreground rounded-full hover:bg-foreground/90 transition-colors duration-200"
            >
              Back to home
            </Link>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </main>
  )
}
