"use client"

import Image from "next/image"

export default function Certifications() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display text-texas-blue">Our Trust Badges</h2>
          <p className="text-xl max-w-3xl mx-auto text-gray-700">
            We're proud to be recognized for our commitment to quality and service.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="trust-badge">
            <Image src="/images/epa-certified.png" alt="EPA Certified" width={60} height={60} />
            <p>EPA Certified</p>
          </div>

          <div className="trust-badge">
            <Image src="/images/home-advisor.png" alt="HomeAdvisor Pro" width={60} height={60} />
            <p>HomeAdvisor Pro</p>
          </div>

          <div className="trust-badge">
            <Image src="/images/elite-service.png" alt="Elite Service" width={60} height={60} />
            <p>Elite Service</p>
          </div>

          <div className="trust-badge">
            <Image src="/images/winner.png" alt="Award Winner" width={60} height={60} />
            <p>Award Winner</p>
          </div>
        </div>
      </div>
    </section>
  )
}
