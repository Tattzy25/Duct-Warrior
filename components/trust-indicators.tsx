import Image from "next/image"
import { Shield, Award, Check, Star } from "lucide-react"

export default function TrustIndicators() {
  return (
    <section className="py-16 bg-theme-bg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display gradient-text">Why Trust Our Warriors</h2>
          <p className="text-xl max-w-3xl mx-auto text-theme-text">
            We're battle-tested, certified, and committed to delivering the highest quality service.
          </p>
        </div>

        {/* Certifications */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="neumorphic-card flex flex-col items-center text-center p-6">
            <div className="bg-gradient-to-r from-theme-accent to-theme-accent-end rounded-full p-3 mb-4">
              <Award className="h-8 w-8 text-theme-text" />
            </div>
            <h3 className="font-bold text-theme-text text-lg mb-2">BBB Accredited</h3>
            <p className="text-theme-text/70 text-sm">A+ Rating with the Better Business Bureau</p>
          </div>

          <div className="neumorphic-card flex flex-col items-center text-center p-6">
            <div className="bg-gradient-to-r from-theme-accent to-theme-accent-end rounded-full p-3 mb-4">
              <Shield className="h-8 w-8 text-theme-text" />
            </div>
            <h3 className="font-bold text-theme-text text-lg mb-2">Licensed & Insured</h3>
            <p className="text-theme-text/70 text-sm">Fully licensed and insured for your protection</p>
          </div>

          <div className="neumorphic-card flex flex-col items-center text-center p-6">
            <div className="bg-gradient-to-r from-theme-accent to-theme-accent-end rounded-full p-3 mb-4">
              <Image src="/images/epa-certified.png" alt="EPA Certified" width={32} height={32} className="h-8 w-8" />
            </div>
            <h3 className="font-bold text-theme-text text-lg mb-2">EPA Approved</h3>
            <p className="text-theme-text/70 text-sm">Certified by the Environmental Protection Agency</p>
          </div>

          <div className="neumorphic-card flex flex-col items-center text-center p-6">
            <div className="bg-gradient-to-r from-theme-accent to-theme-accent-end rounded-full p-3 mb-4">
              <Check className="h-8 w-8 text-theme-text" />
            </div>
            <h3 className="font-bold text-theme-text text-lg mb-2">NADCA Certified</h3>
            <p className="text-theme-text/70 text-sm">National Air Duct Cleaners Association certified</p>
          </div>
        </div>

        {/* Guarantees */}
        <div className="neumorphic-card p-8 mb-16">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h3 className="text-2xl font-bold text-theme-text mb-4">Our Warrior Guarantees</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Shield className="h-5 w-5 text-theme-accent mr-2 mt-1 flex-shrink-0" />
                  <span className="text-theme-text/80">
                    <strong className="text-theme-text">100% Satisfaction Guarantee:</strong> If you're not completely
                    satisfied, we'll re-clean at no additional cost.
                  </span>
                </li>
                <li className="flex items-start">
                  <Shield className="h-5 w-5 text-theme-accent mr-2 mt-1 flex-shrink-0" />
                  <span className="text-theme-text/80">
                    <strong className="text-theme-text">On-Time Guarantee:</strong> If we're late, you receive $25 off
                    your service.
                  </span>
                </li>
                <li className="flex items-start">
                  <Shield className="h-5 w-5 text-theme-accent mr-2 mt-1 flex-shrink-0" />
                  <span className="text-theme-text/80">
                    <strong className="text-theme-text">Clean Workspace Guarantee:</strong> We leave your home cleaner
                    than we found it.
                  </span>
                </li>
                <li className="flex items-start">
                  <Shield className="h-5 w-5 text-theme-accent mr-2 mt-1 flex-shrink-0" />
                  <span className="text-theme-text/80">
                    <strong className="text-theme-text">Price Match Guarantee:</strong> We'll match any written quote
                    from a licensed competitor.
                  </span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-r from-theme-accent to-theme-accent-end text-theme-text p-6 rounded-xl max-w-md">
              <div className="flex items-center mb-4">
                <Star className="h-8 w-8 text-theme-text mr-2 flex-shrink-0" fill="currentColor" />
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
          <h3 className="text-2xl font-bold text-theme-text mb-4">What Our Clients Say</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="neumorphic-card p-6">
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" />
              ))}
            </div>
            <p className="text-theme-text/80 mb-4">
              "The Duct Warriors team was professional, thorough, and left our home spotless. Our air quality has
              improved dramatically!"
            </p>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-theme-accent to-theme-accent-end rounded-full flex items-center justify-center text-theme-text font-bold mr-3">
                JD
              </div>
              <div>
                <p className="font-bold text-theme-text">John D.</p>
                <p className="text-sm text-theme-text/70">McKinney, TX</p>
              </div>
            </div>
          </div>

          <div className="neumorphic-card p-6">
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" />
              ))}
            </div>
            <p className="text-theme-text/80 mb-4">
              "I was amazed at how much dust and debris they removed from our vents. My allergies have improved
              significantly since their service."
            </p>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-theme-accent to-theme-accent-end rounded-full flex items-center justify-center text-theme-text font-bold mr-3">
                SM
              </div>
              <div>
                <p className="font-bold text-theme-text">Sarah M.</p>
                <p className="text-sm text-theme-text/70">Frisco, TX</p>
              </div>
            </div>
          </div>

          <div className="neumorphic-card p-6">
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" />
              ))}
            </div>
            <p className="text-theme-text/80 mb-4">
              "The team was on time, explained everything clearly, and did an exceptional job cleaning our dryer vent.
              Highly recommend!"
            </p>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-theme-accent to-theme-accent-end rounded-full flex items-center justify-center text-theme-text font-bold mr-3">
                RJ
              </div>
              <div>
                <p className="font-bold text-theme-text">Robert J.</p>
                <p className="text-sm text-theme-text/70">Plano, TX</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
