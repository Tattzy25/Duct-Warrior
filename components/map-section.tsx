"use client"

import Image from "next/image"

export default function MapSection() {
  return (
    <section className="py-20 bg-texas-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display text-texas-blue">Our Service Area</h2>
          <p className="text-xl max-w-3xl mx-auto text-gray-700">
            Proudly serving McKinney, TX and surrounding areas including Frisco, Plano, Allen, and more.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="h-[500px] w-full flex flex-col items-center justify-center bg-gray-100 p-6">
            <div className="text-xl font-bold text-texas-blue mb-4">McKinney, TX Service Area</div>
            <div className="text-gray-600 text-center max-w-md mb-8">
              We proudly serve McKinney and surrounding areas including Frisco, Plano, Allen, and Richardson.
            </div>

            {/* Static map image */}
            <div className="relative w-full h-64 rounded-lg overflow-hidden border-2 border-texas-orange">
              <Image
                src="/mckinney-texas-street-map.png"
                alt="McKinney, TX Service Area Map"
                fill
                style={{ objectFit: "cover" }}
              />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="bg-texas-orange text-white px-4 py-2 rounded-full font-bold">DUCTWARRIORS</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-texas-blue mb-4">McKinney Office</h3>
            <p className="text-gray-700">
              123 Main Street
              <br />
              McKinney, TX 75070
            </p>
            <p className="mt-4 text-gray-700">
              <strong>Phone:</strong> (123) 456-7890
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-texas-blue mb-4">Service Hours</h3>
            <ul className="text-gray-700 space-y-2">
              <li className="flex justify-between">
                <span>Monday - Friday:</span>
                <span>8:00 AM - 6:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday:</span>
                <span>9:00 AM - 4:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday:</span>
                <span>Closed</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-texas-blue mb-4">Service Areas</h3>
            <ul className="text-gray-700 space-y-2">
              <li>McKinney</li>
              <li>Frisco</li>
              <li>Plano</li>
              <li>Allen</li>
              <li>Richardson</li>
              <li>And surrounding areas</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
