import { Check } from "lucide-react"
import Link from "next/link"

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
    <section className="py-20 bg-white" id="pricing">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display text-texas-blue">Tiered Warfare</h2>
          <p className="text-xl max-w-3xl mx-auto text-gray-700">
            Choose the perfect plan to keep your home's air quality at its best year-round.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`pricing-card bg-white rounded-3xl shadow-xl overflow-hidden ${
                tier.mostPopular ? "premium ring-2 ring-texas-orange" : ""
              }`}
            >
              <div className="p-8 bg-texas-cream">
                <h3 className="text-2xl font-bold text-texas-blue">{tier.name}</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-5xl font-extrabold text-texas-blue">{tier.price}</span>
                  <span className="ml-1 text-xl text-gray-600">{tier.frequency}</span>
                </div>
                <p className="mt-5 text-gray-600">{tier.description}</p>
              </div>
              <div className="p-8">
                <ul className="space-y-4">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <div className="flex-shrink-0">
                        <Check className="h-6 w-6 text-texas-orange" />
                      </div>
                      <p className="ml-3 text-gray-700">{feature}</p>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Link
                    href="/contact"
                    className={`w-full block text-center rounded-full py-3 px-6 font-bold text-white ${
                      tier.mostPopular ? "bg-texas-orange hover:bg-texas-blue" : "bg-texas-blue hover:bg-texas-orange"
                    } transition-colors`}
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
