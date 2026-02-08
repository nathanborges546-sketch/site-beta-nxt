import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Check, Loader2 } from "lucide-react"

const budgetOptions = [
  { value: "under-5k", label: "Under $5,000" },
  { value: "5k-10k", label: "$5,000 - $10,000" },
  { value: "10k-25k", label: "$10,000 - $25,000" },
  { value: "25k-50k", label: "$25,000 - $50,000" },
  { value: "50k-plus", label: "$50,000+" },
]

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  description: z.string().min(20, "Please provide more details about your project"),
  budget: z.string().min(1, "Please select a budget range"),
})

type ContactFormData = z.infer<typeof contactSchema>

export function ContactSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    
    try {
      // Simulate form submission - replace with actual Formspree endpoint
      console.log("Form data:", data)
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setIsSubmitted(true)
      reset()
    } catch (error) {
      console.error("Form submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <h2 
            className="text-3xl sm:text-4xl text-foreground mb-4"
            style={{ fontFamily: "'Alegreya', Georgia, serif" }}
          >
            Contact
          </h2>
          <p className="text-muted-foreground mb-12">
            Tell us about your project. We&apos;ll respond if it&apos;s a good fit.
          </p>

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 rounded-2xl bg-muted/50 border border-border"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <Check className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-xl text-foreground">Thanks — we&apos;ve received your request.</h3>
              </div>
              <p className="text-muted-foreground">
                If it&apos;s a good fit, we&apos;ll reply by email.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm text-muted-foreground mb-2">
                  Name
                </label>
                <input
                  {...register("name")}
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground placeholder:text-muted-foreground/50"
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-destructive">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm text-muted-foreground mb-2">
                  Email
                </label>
                <input
                  {...register("email")}
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground placeholder:text-muted-foreground/50"
                  placeholder="you@company.com"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="description" className="block text-sm text-muted-foreground mb-2">
                  Project description
                </label>
                <textarea
                  {...register("description")}
                  id="description"
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground placeholder:text-muted-foreground/50 resize-none"
                  placeholder="Tell us about your project, goals, and timeline..."
                />
                {errors.description && (
                  <p className="mt-2 text-sm text-destructive">{errors.description.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm text-muted-foreground mb-3">
                  Estimated budget
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {budgetOptions.map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center gap-2 p-3 rounded-lg border border-border bg-input cursor-pointer hover:border-foreground/30 transition-colors"
                    >
                      <input
                        {...register("budget")}
                        type="radio"
                        value={option.value}
                        className="w-4 h-4 accent-accent"
                      />
                      <span className="text-sm text-foreground">{option.label}</span>
                    </label>
                  ))}
                </div>
                {errors.budget && (
                  <p className="mt-2 text-sm text-destructive">{errors.budget.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center px-8 py-3 text-sm font-medium text-background bg-foreground rounded-full hover:bg-foreground/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send message"
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
