import Link from "next/link"
import { Check } from "lucide-react"

const tiers = [
  {
    name: "Basic Tier",
    price: "$99",
    frequency: "/month",
    description: "Essential maintenance for your home",
    features: [
      "Monthly air duct cleaning",
      "Filter replacement",
      "Basic inspection",
      "Email support",
      "Scheduled appointments",
    ],
    cta: "Get Started",
    mostPopular: false,
  },
  {
    name: "Premium Tier",
    price: "$299",
    frequency: "/month",
    description: "Complete care for your HVAC system",
    features: [
      "Monthly air duct cleaning",
      "Filter replacement",
      "HVAC tune-up",
      "Priority scheduling",
      "Phone & email support",
      "Quarterly dryer vent cleaning",
      "Annual chimney inspection",
    ],
    cta: "Get Premium",
    mostPopular: true,
  },
  {
    name: "Elite Tier",
    price: "$599",
    frequency: "/month",
    description: "The ultimate in home air quality",
    features: [
      "Monthly air duct cleaning",
      "Filter replacement",
      "HVAC tune-up",
      "Priority scheduling",
      "24/7 emergency support",
      "Monthly dryer vent cleaning",
      "Quarterly chimney cleaning",
      "Annual attic insulation inspection",
      "Exclusive member discounts",
    ],
    cta: "Go Elite",
    mostPopular: false,
  },
]

export default function Pricing() {
  return (
    <section className="py-20 bg-theme-bg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display gradient-text">Pricing Plans</h2>
          <p className="text-xl max-w-3xl mx-auto text-theme-text">
            Choose the perfect plan to keep your home's air quality at its best year-round.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`neumorphic-card overflow-hidden ${tier.mostPopular ? "ring-2 ring-theme-accent" : ""}`}
            >
              <div className="p-8 bg-theme-bg/50">
                <h3 className="text-2xl font-bold text-theme-text">{tier.name}</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-5xl font-extrabold text-theme-accent">{tier.price}</span>
                  <span className="ml-1 text-xl text-theme-text/70">{tier.frequency}</span>
                </div>
                <p className="mt-5 text-theme-text/80">{tier.description}</p>
              </div>
              <div className="p-8">
                <ul className="space-y-4">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <div className="flex-shrink-0">
                        <Check className="h-6 w-6 text-theme-accent" />
                      </div>
                      <p className="ml-3 text-theme-text/80">{feature}</p>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Link
                    href="/contact"
                    className={`w-full block text-center rounded-full py-3 px-6 font-bold text-theme-text bg-gradient-to-r from-theme-accent to-theme-accent-end hover:opacity-90 transition-all`}
                  >
                    {tier.cta}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
