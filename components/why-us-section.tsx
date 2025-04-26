import type React from "react"

export default function WhyUsSection() {
  return (
    <section className="why-us py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4 text-center">Why Us</h2>
        <p className="text-lg text-center max-w-3xl mx-auto mb-12">
          We're dedicated to providing top-notch air duct cleaning and ventilation services. Our team of experts uses
          state-of-the-art technology to ensure your home or business is safe, healthy, and energy-efficient.
        </p>

        <div className="flex justify-center items-center my-8">
          <div className="glass-card" style={{ "--r": -15 } as React.CSSProperties}>
            <img src="https://i.imgur.com/Uxjayr5.png" alt="Expertise" />
          </div>
          <div className="glass-card" style={{ "--r": 0 } as React.CSSProperties}>
            <img src="https://i.imgur.com/8ugd7LH.png" alt="Innovation" />
          </div>
          <div className="glass-card" style={{ "--r": 15 } as React.CSSProperties}>
            <img src="https://i.imgur.com/vwOshBn.png" alt="Customer Focus" />
          </div>
        </div>
      </div>
    </section>
  )
}
