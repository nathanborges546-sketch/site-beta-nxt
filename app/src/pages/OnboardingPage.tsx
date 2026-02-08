import { useState, useEffect } from "react"
import { useSearchParams, Link } from "react-router-dom"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { motion } from "framer-motion"
import { Check, Loader2, ArrowLeft } from "lucide-react"
import { Header } from "../components/header"
import { Footer } from "../components/footer"
import { CityCountryAutocomplete } from "../components/city-country-autocomplete"

const onboardingSchema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  contactPerson: z.string().min(2, "Contact person is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(8, "Phone number is required"),
  location: z.string().min(2, "City/Country is required"),
  websiteType: z.enum(["institutional", "landing"]),
  primaryGoal: z.enum(["contacts", "book-calls", "sell", "present"]),
  pages: z.array(z.string()).min(1, "Select at least one page/section"),
  navigationStyle: z.enum(["anchors", "simple", "minimal"]),
  copyReadiness: z.enum(["ready", "partial", "none"]),
  assetLinks: z.string().optional(),
  brandAssets: z.array(z.string()),
  tone: z.enum(["professional", "friendly", "technical", "minimal"]),
  elements: z.array(z.string()),
  constraints: z.string().min(10, "Please specify what you don't want"),
  references: z.string().optional(),
  confirmed: z.boolean().refine((val) => val === true, {
    message: "You must confirm to proceed",
  }),
})

type OnboardingFormData = z.infer<typeof onboardingSchema>

const pageOptions = [
  { value: "home", label: "Home / Hero" },
  { value: "about", label: "About" },
  { value: "services", label: "Services" },
  { value: "portfolio", label: "Portfolio / Work" },
  { value: "team", label: "Team" },
  { value: "testimonials", label: "Testimonials" },
  { value: "blog", label: "Blog" },
  { value: "contact", label: "Contact" },
  { value: "faq", label: "FAQ" },
]

const brandAssetOptions = [
  { value: "logo", label: "Logo (vector)" },
  { value: "colors", label: "Brand colors" },
  { value: "typography", label: "Typography guidelines" },
  { value: "images", label: "Professional images" },
  { value: "icons", label: "Icon set" },
]

const elementOptions = [
  { value: "contact-form", label: "Contact form" },
  { value: "newsletter", label: "Newsletter signup" },
  { value: "social-links", label: "Social media links" },
  { value: "analytics", label: "Analytics (Google/Plausible)" },
  { value: "chat", label: "Live chat" },
  { value: "multilingual", label: "Multilingual support" },
  { value: "cms", label: "CMS integration" },
  { value: "seo", label: "SEO optimization" },
]

export default function OnboardingPage() {
  const [searchParams] = useSearchParams()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      companyName: "",
      pages: [],
      brandAssets: [],
      elements: [],
    },
  })

  useEffect(() => {
    const company = searchParams.get("company")
    if (company) {
      setValue("companyName", company)
    }
  }, [searchParams, setValue])

  const onSubmit = async (data: OnboardingFormData) => {
    setIsSubmitting(true)
    
    try {
      console.log("Onboarding data:", data)
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setIsSubmitted(true)
    } catch (error) {
      console.error("Form submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const watchedPages = watch("pages") || []
  const watchedBrandAssets = watch("brandAssets") || []
  const watchedElements = watch("elements") || []

  const toggleArrayValue = (field: "pages" | "brandAssets" | "elements", value: string) => {
    const current = watch(field) || []
    if (current.includes(value)) {
      setValue(field, current.filter((v) => v !== value))
    } else {
      setValue(field, [...current, value])
    }
  }

  if (isSubmitted) {
    return (
      <main className="min-h-screen">
        <Header />
        <section className="pt-32 pb-24">
          <div className="max-w-2xl mx-auto px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-12 rounded-2xl bg-muted/50 border border-border"
            >
              <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 text-accent" />
              </div>
              <h1 
                className="text-3xl text-foreground mb-4"
                style={{ fontFamily: "'Alegreya', Georgia, serif" }}
              >
                Thank you.
              </h1>
              <p className="text-muted-foreground mb-2">
                We&apos;ve received your information.
              </p>
              <p className="text-muted-foreground mb-8">
                If it&apos;s a good fit, we&apos;ll reply by email with the next steps.
              </p>
              <p className="text-sm text-muted-foreground mb-8">
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

  return (
    <main className="min-h-screen">
      <Header />
      <section className="pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 
              className="text-3xl sm:text-4xl text-foreground mb-4"
              style={{ fontFamily: "'Alegreya', Georgia, serif" }}
            >
              Project Onboarding
            </h1>
            <p className="text-muted-foreground mb-12">
              Help us understand your project. The more details you provide, the better we can prepare.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-16">
              {/* Section A: Project Basics */}
              <div className="space-y-6">
                <h2 className="text-xl text-foreground font-medium pb-2 border-b border-border">
                  A. Project Basics
                </h2>
                
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">
                      Company name *
                    </label>
                    <input
                      {...register("companyName")}
                      type="text"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground"
                      placeholder="Acme Inc."
                    />
                    {errors.companyName && (
                      <p className="mt-2 text-sm text-destructive">{errors.companyName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">
                      Contact person *
                    </label>
                    <input
                      {...register("contactPerson")}
                      type="text"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground"
                      placeholder="John Doe"
                    />
                    {errors.contactPerson && (
                      <p className="mt-2 text-sm text-destructive">{errors.contactPerson.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">
                      Email *
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground"
                      placeholder="john@company.com"
                    />
                    {errors.email && (
                      <p className="mt-2 text-sm text-destructive">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">
                      WhatsApp / Phone *
                    </label>
                    <input
                      {...register("phone")}
                      type="tel"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground"
                      placeholder="+1 234 567 890"
                    />
                    {errors.phone && (
                      <p className="mt-2 text-sm text-destructive">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-muted-foreground mb-2">
                    City / Country *
                  </label>
                  <Controller
                    name="location"
                    control={control}
                    render={({ field }) => (
                      <CityCountryAutocomplete
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Start typing a city..."
                        required
                        error={errors.location?.message}
                      />
                    )}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-muted-foreground mb-3">
                      Website type *
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-3 p-3 rounded-lg border border-border bg-input cursor-pointer hover:border-foreground/30 transition-colors">
                        <input
                          {...register("websiteType")}
                          type="radio"
                          value="institutional"
                          className="w-4 h-4 accent-accent"
                        />
                        <span className="text-sm text-foreground">Institutional</span>
                      </label>
                      <label className="flex items-center gap-3 p-3 rounded-lg border border-border bg-input cursor-pointer hover:border-foreground/30 transition-colors">
                        <input
                          {...register("websiteType")}
                          type="radio"
                          value="landing"
                          className="w-4 h-4 accent-accent"
                        />
                        <span className="text-sm text-foreground">Landing page</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-muted-foreground mb-3">
                      Primary goal *
                    </label>
                    <div className="space-y-2">
                      {[
                        { value: "contacts", label: "Collect contacts" },
                        { value: "book-calls", label: "Book calls" },
                        { value: "sell", label: "Sell products" },
                        { value: "present", label: "Present company" },
                      ].map((option) => (
                        <label
                          key={option.value}
                          className="flex items-center gap-3 p-3 rounded-lg border border-border bg-input cursor-pointer hover:border-foreground/30 transition-colors"
                        >
                          <input
                            {...register("primaryGoal")}
                            type="radio"
                            value={option.value}
                            className="w-4 h-4 accent-accent"
                          />
                          <span className="text-sm text-foreground">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Section B: Structure */}
              <div className="space-y-6">
                <h2 className="text-xl text-foreground font-medium pb-2 border-b border-border">
                  B. Structure
                </h2>

                <div>
                  <label className="block text-sm text-muted-foreground mb-3">
                    Pages / sections needed *
                  </label>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {pageOptions.map((option) => (
                      <label
                        key={option.value}
                        className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                          watchedPages.includes(option.value)
                            ? "border-accent bg-accent/5"
                            : "border-border bg-input hover:border-foreground/30"
                        }`}
                        onClick={() => toggleArrayValue("pages", option.value)}
                      >
                        <input
                          type="checkbox"
                          checked={watchedPages.includes(option.value)}
                          onChange={() => {}}
                          className="w-4 h-4 accent-accent"
                        />
                        <span className="text-sm text-foreground">{option.label}</span>
                      </label>
                    ))}
                  </div>
                  {errors.pages && (
                    <p className="mt-2 text-sm text-destructive">{errors.pages.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-muted-foreground mb-3">
                    Navigation style *
                  </label>
                  <div className="space-y-2">
                    {[
                      { value: "anchors", label: "No menu (anchors only)" },
                      { value: "simple", label: "Simple top menu" },
                      { value: "minimal", label: "Minimal (only CTA)" },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className="flex items-center gap-3 p-3 rounded-lg border border-border bg-input cursor-pointer hover:border-foreground/30 transition-colors"
                      >
                        <input
                          {...register("navigationStyle")}
                          type="radio"
                          value={option.value}
                          className="w-4 h-4 accent-accent"
                        />
                        <span className="text-sm text-foreground">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Section C: Content & Assets */}
              <div className="space-y-6">
                <h2 className="text-xl text-foreground font-medium pb-2 border-b border-border">
                  C. Content & Assets
                </h2>

                <div>
                  <label className="block text-sm text-muted-foreground mb-3">
                    Copy readiness *
                  </label>
                  <div className="space-y-2">
                    {[
                      { value: "ready", label: "All copy is ready" },
                      { value: "partial", label: "Partially ready" },
                      { value: "none", label: "Need help with copy" },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className="flex items-center gap-3 p-3 rounded-lg border border-border bg-input cursor-pointer hover:border-foreground/30 transition-colors"
                      >
                        <input
                          {...register("copyReadiness")}
                          type="radio"
                          value={option.value}
                          className="w-4 h-4 accent-accent"
                        />
                        <span className="text-sm text-foreground">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-muted-foreground mb-2">
                    Asset links (Drive, Dropbox, etc.)
                  </label>
                  <input
                    {...register("assetLinks")}
                    type="url"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground"
                    placeholder="https://drive.google.com/..."
                  />
                </div>

                <div>
                  <label className="block text-sm text-muted-foreground mb-3">
                    Brand assets available
                  </label>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {brandAssetOptions.map((option) => (
                      <label
                        key={option.value}
                        className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                          watchedBrandAssets.includes(option.value)
                            ? "border-accent bg-accent/5"
                            : "border-border bg-input hover:border-foreground/30"
                        }`}
                        onClick={() => toggleArrayValue("brandAssets", option.value)}
                      >
                        <input
                          type="checkbox"
                          checked={watchedBrandAssets.includes(option.value)}
                          onChange={() => {}}
                          className="w-4 h-4 accent-accent"
                        />
                        <span className="text-sm text-foreground">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-muted-foreground mb-3">
                    Preferred tone *
                  </label>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      { value: "professional", label: "Professional" },
                      { value: "friendly", label: "Friendly" },
                      { value: "technical", label: "Technical" },
                      { value: "minimal", label: "Minimal" },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className="flex items-center gap-3 p-3 rounded-lg border border-border bg-input cursor-pointer hover:border-foreground/30 transition-colors"
                      >
                        <input
                          {...register("tone")}
                          type="radio"
                          value={option.value}
                          className="w-4 h-4 accent-accent"
                        />
                        <span className="text-sm text-foreground">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Section D: Required Elements */}
              <div className="space-y-6">
                <h2 className="text-xl text-foreground font-medium pb-2 border-b border-border">
                  D. Required Elements
                </h2>

                <div>
                  <label className="block text-sm text-muted-foreground mb-3">
                    Select all that apply
                  </label>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {elementOptions.map((option) => (
                      <label
                        key={option.value}
                        className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                          watchedElements.includes(option.value)
                            ? "border-accent bg-accent/5"
                            : "border-border bg-input hover:border-foreground/30"
                        }`}
                        onClick={() => toggleArrayValue("elements", option.value)}
                      >
                        <input
                          type="checkbox"
                          checked={watchedElements.includes(option.value)}
                          onChange={() => {}}
                          className="w-4 h-4 accent-accent"
                        />
                        <span className="text-sm text-foreground">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Section E: Constraints */}
              <div className="space-y-6">
                <h2 className="text-xl text-foreground font-medium pb-2 border-b border-border">
                  E. Constraints
                </h2>

                <div>
                  <label className="block text-sm text-muted-foreground mb-2">
                    What you DO NOT want on the site *
                  </label>
                  <textarea
                    {...register("constraints")}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground resize-none"
                    placeholder="e.g., No animations, no popups, no dark mode, etc."
                  />
                  {errors.constraints && (
                    <p className="mt-2 text-sm text-destructive">{errors.constraints.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-muted-foreground mb-2">
                    Reference websites (optional)
                  </label>
                  <textarea
                    {...register("references")}
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground resize-none"
                    placeholder="Links to websites you like and why..."
                  />
                </div>
              </div>

              {/* Section F: Confirmation */}
              <div className="space-y-6">
                <h2 className="text-xl text-foreground font-medium pb-2 border-b border-border">
                  F. Confirmation
                </h2>

                <label className="flex items-start gap-3 p-4 rounded-lg border border-border bg-input cursor-pointer hover:border-foreground/30 transition-colors">
                  <input
                    {...register("confirmed")}
                    type="checkbox"
                    className="w-5 h-5 accent-accent mt-0.5"
                  />
                  <span className="text-sm text-foreground leading-relaxed">
                    I confirm these choices define the website structure. Structural changes after approval may be quoted separately.
                  </span>
                </label>
                {errors.confirmed && (
                  <p className="text-sm text-destructive">{errors.confirmed.message}</p>
                )}
              </div>

              {/* Submit button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-sm font-medium text-background bg-foreground rounded-full hover:bg-foreground/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit project details"
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
