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

const faqs = [
  {
    question: "What is included in the monthly air duct cleaning?",
    answer:
      "Our monthly air duct cleaning includes a thorough cleaning of your main supply and return ducts, vent covers, and registers. We use professional-grade equipment to remove dust, allergens, and contaminants from your HVAC system.",
  },
  {
    question: "Can I upgrade or downgrade my plan?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Changes will take effect at the start of your next billing cycle. There are no penalties for changing your plan.",
  },
  {
    question: "Is there a contract or commitment?",
    answer:
      "Our service plans are month-to-month with no long-term contracts. You can cancel at any time with 30 days' notice.",
  },
  {
    question: "Do you offer discounts for annual payments?",
    answer: "Yes, we offer a 10% discount when you pay annually for any of our service plans. Contact us for details.",
  },
  {
    question: "What areas do you service?",
    answer:
      "We currently service McKinney, Frisco, Plano, Allen, Richardson, and Prosper in Texas. If you're outside these areas, please contact us to check availability.",
  },
  {
    question: "How do I schedule my first service?",
    answer:
      "After signing up for a plan, our customer service team will contact you within 24 hours to schedule your first service appointment at a time that's convenient for you.",
  },
]

export default function PricingPage() {
  return (
    <div className="bg-texas-cream py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 font-display text-texas-blue">Tiered Warfare</h1>
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

        <div className="mt-20 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-texas-blue mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-700">
              Have questions about our service plans? Find answers to common questions below.
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-texas-blue mb-3">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-xl mb-6">Still have questions?</p>
            <Link
              href="/contact"
              className="bg-texas-orange hover:bg-texas-blue text-white font-bold py-3 px-8 rounded-full text-xl transition-colors inline-block"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
