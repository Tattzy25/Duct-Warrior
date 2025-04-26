import type { Metadata } from "next"
import Link from "next/link"
import { Check } from "lucide-react"

export const metadata: Metadata = {
  title: "Subscription Packages | DUCTWARRIORS",
  description: "Choose from our range of subscription packages for regular air duct maintenance and HVAC services.",
}

export default function SubscriptionsPage() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="w-full bg-texas-blue py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Subscription Packages</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Choose the perfect maintenance plan for your home's air quality needs.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-texas-blue mb-4">Breathe Easier with Regular Maintenance</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Our subscription packages provide regular maintenance to keep your air ducts clean and your HVAC system
              running efficiently all year round.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <SubscriptionCard
              title="Basic"
              price={99}
              features={[
                "Annual Air Duct Inspection",
                "Basic Air Duct Cleaning (once per year)",
                "HVAC Filter Replacement (quarterly)",
                "10% Discount on Additional Services",
                "Priority Scheduling",
              ]}
              recommended={false}
            />

            <SubscriptionCard
              title="Premium"
              price={149}
              features={[
                "Bi-Annual Air Duct Cleaning",
                "Dryer Vent Cleaning (once per year)",
                "HVAC Filter Replacement (bi-monthly)",
                "15% Discount on Additional Services",
                "Priority Scheduling",
                "Emergency Service (within 24 hours)",
              ]}
              recommended={true}
            />

            <SubscriptionCard
              title="Ultimate"
              price={199}
              features={[
                "Quarterly Air Duct Inspection",
                "Bi-Annual Air Duct Cleaning",
                "Annual Dryer Vent Cleaning",
                "Annual Chimney Inspection",
                "HVAC Filter Replacement (monthly)",
                "20% Discount on Additional Services",
                "Same-Day Emergency Service",
                "Annual HVAC System Tune-Up",
              ]}
              recommended={false}
            />
          </div>

          <div className="mt-16 bg-texas-cream rounded-xl p-8 shadow-lg text-center">
            <h2 className="text-2xl font-bold text-texas-blue mb-4">Custom Subscription Plans</h2>
            <p className="text-gray-700 mb-6 max-w-3xl mx-auto">
              Need a customized plan for your specific needs? Contact us to create a tailored subscription package for
              your home or business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-texas-orange hover:bg-texas-blue text-white font-bold py-3 px-6 rounded-full transition-colors"
              >
                Contact for Custom Plan
              </Link>
              <a
                href="tel:+1234567890"
                className="bg-texas-blue hover:bg-texas-orange text-white font-bold py-3 px-6 rounded-full transition-colors"
              >
                Call (123) 456-7890
              </a>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-bold text-texas-blue mb-6 text-center">Frequently Asked Questions</h2>
            <div className="grid gap-6 max-w-4xl mx-auto">
              <FAQItem
                question="How do subscription payments work?"
                answer="Subscription payments are processed monthly. You can pay using any major credit card, and you can cancel your subscription at any time with 30 days' notice."
              />

              <FAQItem
                question="Can I upgrade or downgrade my subscription?"
                answer="Yes, you can upgrade or downgrade your subscription at any time. Changes will take effect at the start of your next billing cycle."
              />

              <FAQItem
                question="Are there any long-term commitments?"
                answer="No, all our subscription plans are month-to-month with no long-term contracts required. We want you to stay because you love our service, not because you're locked in."
              />

              <FAQItem
                question="What if I need a service that's not included in my plan?"
                answer="All subscription members receive discounts on additional services not included in their plan. The discount percentage depends on your subscription level."
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

function SubscriptionCard({
  title,
  price,
  features,
  recommended,
}: {
  title: string
  price: number
  features: string[]
  recommended: boolean
}) {
  return (
    <div
      className={`rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-105 ${
        recommended ? "border-4 border-texas-orange" : "border border-gray-200"
      }`}
    >
      {recommended && <div className="bg-texas-orange text-white text-center py-2 font-bold">MOST POPULAR</div>}
      <div className="bg-white p-8">
        <h3 className="text-2xl font-bold text-texas-blue mb-2">{title}</h3>
        <div className="flex items-end mb-6">
          <span className="text-4xl font-bold text-texas-orange">${price}</span>
          <span className="text-gray-600 ml-1">/month</span>
        </div>
        <ul className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <Link
          href="/contact?plan=subscription"
          className={`block text-center py-3 px-6 rounded-full font-bold transition-colors ${
            recommended
              ? "bg-texas-orange hover:bg-texas-blue text-white"
              : "bg-texas-blue hover:bg-texas-orange text-white"
          }`}
        >
          Subscribe Now
        </Link>
      </div>
    </div>
  )
}

function FAQItem({
  question,
  answer,
}: {
  question: string
  answer: string
}) {
  return (
    <div className="border-b border-gray-200 pb-4">
      <h3 className="text-lg font-bold text-texas-blue mb-2">{question}</h3>
      <p className="text-gray-700">{answer}</p>
    </div>
  )
}
