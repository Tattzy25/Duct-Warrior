import Image from "next/image"
import { Shield, Award, Check, Star } from "lucide-react"

export default function TrustIndicators() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display text-texas-blue">Why Trust Our Warriors</h2>
          <p className="text-xl max-w-3xl mx-auto text-gray-700">
            We're battle-tested, certified, and committed to delivering the highest quality service.
          </p>
        </div>

        {/* Certifications */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center">
            <div className="bg-texas-blue rounded-full p-3 mb-4">
              <Award className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-bold text-texas-blue text-lg mb-2">BBB Accredited</h3>
            <p className="text-gray-600 text-sm">A+ Rating with the Better Business Bureau</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center">
            <div className="bg-texas-blue rounded-full p-3 mb-4">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-bold text-texas-blue text-lg mb-2">Licensed & Insured</h3>
            <p className="text-gray-600 text-sm">Fully licensed and insured for your protection</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center">
            <div className="bg-texas-blue rounded-full p-3 mb-4">
              <Image src="/images/epa-certified.png" alt="EPA Certified" width={32} height={32} className="h-8 w-8" />
            </div>
            <h3 className="font-bold text-texas-blue text-lg mb-2">EPA Approved</h3>
            <p className="text-gray-600 text-sm">Certified by the Environmental Protection Agency</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center">
            <div className="bg-texas-blue rounded-full p-3 mb-4">
              <Check className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-bold text-texas-blue text-lg mb-2">NADCA Certified</h3>
            <p className="text-gray-600 text-sm">National Air Duct Cleaners Association certified</p>
          </div>
        </div>

        {/* Guarantees */}
        <div className="bg-white p-8 rounded-xl shadow-md mb-16">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h3 className="text-2xl font-bold text-texas-blue mb-4">Our Warrior Guarantees</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Shield className="h-5 w-5 text-texas-orange mr-2 mt-1 flex-shrink-0" />
                  <span>
                    <strong className="text-texas-blue">100% Satisfaction Guarantee:</strong> If you're not completely
                    satisfied, we'll re-clean at no additional cost.
                  </span>
                </li>
                <li className="flex items-start">
                  <Shield className="h-5 w-5 text-texas-orange mr-2 mt-1 flex-shrink-0" />
                  <span>
                    <strong className="text-texas-blue">On-Time Guarantee:</strong> If we're late, you receive $25 off
                    your service.
                  </span>
                </li>
                <li className="flex items-start">
                  <Shield className="h-5 w-5 text-texas-orange mr-2 mt-1 flex-shrink-0" />
                  <span>
                    <strong className="text-texas-blue">Clean Workspace Guarantee:</strong> We leave your home cleaner
                    than we found it.
                  </span>
                </li>
                <li className="flex items-start">
                  <Shield className="h-5 w-5 text-texas-orange mr-2 mt-1 flex-shrink-0" />
                  <span>
                    <strong className="text-texas-blue">Price Match Guarantee:</strong> We'll match any written quote
                    from a licensed competitor.
                  </span>
                </li>
              </ul>
            </div>
            <div className="bg-texas-orange text-white p-6 rounded-xl max-w-md">
              <div className="flex items-center mb-4">
                <Star className="h-8 w-8 text-white mr-2 flex-shrink-0" fill="white" />
                <h3 className="text-2xl font-bold">5-Year Warranty</h3>
              </div>
              <p className="mb-4">
                All of our services come with an industry-leading 5-year warranty. If any issues arise from our work,
                we'll fix it at no cost to you.
              </p>
              <p className="text-sm">*Warranty details provided in writing after service completion.</p>
            </div>
          </div>
        </div>

        {/* Featured Reviews */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-texas-blue mb-4">What Our Clients Say</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" />
              ))}
            </div>
            <p className="text-gray-700 mb-4">
              "The Duct Warriors team was professional, thorough, and left our home spotless. Our air quality has
              improved dramatically!"
            </p>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-texas-blue rounded-full flex items-center justify-center text-white font-bold mr-3">
                JD
              </div>
              <div>
                <p className="font-bold text-texas-blue">John D.</p>
                <p className="text-sm text-gray-600">McKinney, TX</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" />
              ))}
            </div>
            <p className="text-gray-700 mb-4">
              "I was amazed at how much dust and debris they removed from our vents. My allergies have improved
              significantly since their service."
            </p>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-texas-blue rounded-full flex items-center justify-center text-white font-bold mr-3">
                SM
              </div>
              <div>
                <p className="font-bold text-texas-blue">Sarah M.</p>
                <p className="text-sm text-gray-600">Frisco, TX</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" />
              ))}
            </div>
            <p className="text-gray-700 mb-4">
              "The team was on time, explained everything clearly, and did an exceptional job cleaning our dryer vent.
              Highly recommend!"
            </p>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-texas-blue rounded-full flex items-center justify-center text-white font-bold mr-3">
                RJ
              </div>
              <div>
                <p className="font-bold text-texas-blue">Robert J.</p>
                <p className="text-sm text-gray-600">Plano, TX</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
