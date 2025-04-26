import type React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import DuctDaddyAI from "@/components/duct-daddy-ai"

export const metadata: Metadata = {
  title: "Frequently Asked Questions | DUCTWARRIORS",
  description: "Find answers to common questions about our air duct cleaning and HVAC services.",
}

export default function FAQPage() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="w-full bg-texas-blue py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Find answers to common questions about our services, pricing, and processes.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-8">
            <FAQItem
              question="How often should I have my air ducts cleaned?"
              answer="The National Air Duct Cleaners Association (NADCA) recommends having your air ducts cleaned every 3-5 years. However, you may need more frequent cleanings if you have pets, allergies, recent home renovations, or visible mold growth in your HVAC system."
            />

            <FAQItem
              question="How long does an air duct cleaning service take?"
              answer="A typical air duct cleaning service takes between 2-4 hours for an average-sized home. Larger homes or systems with extensive contamination may take longer. Our technicians will provide you with a time estimate before beginning the service."
            />

            <FAQItem
              question="Will air duct cleaning reduce my energy bills?"
              answer="Clean air ducts can improve the efficiency of your HVAC system, potentially reducing energy consumption and lowering your utility bills. When ducts are clogged with dust and debris, your system has to work harder to maintain the desired temperature, using more energy in the process."
            />

            <FAQItem
              question="Is air duct cleaning noisy or messy?"
              answer="Our professional equipment creates some noise during the cleaning process, but it's not excessively loud. As for mess, we take great care to protect your home during the cleaning process. We use drop cloths and specialized equipment to ensure that all dust and debris are contained and removed from your home."
            />

            <FAQItem
              question="How can I tell if my air ducts need cleaning?"
              answer="Signs that your air ducts may need cleaning include: visible dust blowing from air vents, excessive dust accumulation in your home, musty or stale odors when the HVAC system runs, increased allergy symptoms, and reduced airflow from vents."
            />

            <FAQItem
              question="Do you offer any guarantees on your services?"
              answer="Yes, we stand behind our work with a 100% satisfaction guarantee. If you're not completely satisfied with our service, we'll return to address any concerns at no additional cost."
            />

            <FAQItem
              question="What's included in your air duct cleaning service?"
              answer="Our comprehensive air duct cleaning service includes cleaning of all supply and return ducts, register and vent cleaning, main trunk line cleaning, and a sanitizing treatment to kill bacteria and prevent mold growth. We also perform a basic inspection of your HVAC system and provide recommendations for improved air quality."
            />

            <FAQItem
              question="How do I schedule an appointment?"
              answer={
                <>
                  You can schedule an appointment by calling us at (123) 456-7890, using our{" "}
                  <Link href="/contact" className="text-texas-orange hover:underline">
                    online contact form
                  </Link>
                  , or chatting with our Duct Daddy AI assistant. We offer flexible scheduling options, including
                  evenings and weekends in some areas.
                </>
              }
            />

            <FAQItem
              question="What forms of payment do you accept?"
              answer="We accept all major credit cards, debit cards, cash, and checks. We also offer financing options for larger projects like whole-home air duct cleaning or attic insulation installation."
            />

            <FAQItem
              question="How can I join the waitlist for services?"
              answer={
                <>
                  You can join our waitlist by filling out the form on our{" "}
                  <Link href="/#waitlist" className="text-texas-orange hover:underline">
                    homepage
                  </Link>
                  , contacting us directly, or asking our Duct Daddy AI assistant to add you to the waitlist. Once on
                  the waitlist, you'll be notified when a spot becomes available for your service.
                </>
              }
            />
          </div>

          <div className="mt-16 bg-texas-cream rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-texas-blue mb-4">Still Have Questions?</h2>
            <p className="text-gray-700 mb-6">
              Our Duct Daddy AI assistant is available 24/7 to answer your questions, help you schedule appointments, or
              add you to our waitlist. You can also contact our customer service team directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="bg-texas-orange hover:bg-texas-blue text-white font-bold py-3 px-6 rounded-full transition-colors text-center"
              >
                Contact Us
              </Link>
              <a
                href="tel:+1234567890"
                className="bg-texas-blue hover:bg-texas-orange text-white font-bold py-3 px-6 rounded-full transition-colors text-center"
              >
                Call (123) 456-7890
              </a>
            </div>
          </div>
        </div>
      </div>

      <DuctDaddyAI />
    </main>
  )
}

function FAQItem({
  question,
  answer,
}: {
  question: string
  answer: string | React.ReactNode
}) {
  return (
    <div className="border-b border-gray-200 pb-6">
      <h3 className="text-xl font-bold text-texas-blue mb-3">{question}</h3>
      <div className="text-gray-700">{answer}</div>
    </div>
  )
}
