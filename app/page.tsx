import Hero from "@/components/hero"
import Services from "@/components/services"
import Pricing from "@/components/pricing"
import Certifications from "@/components/certifications"
import Testimonials from "@/components/testimonials"
import MapSection from "@/components/map-section"
import ContactForm from "@/components/contact-form"
import WaitlistBanner from "@/components/waitlist-banner"
import ImageGalleryCarousel from "@/components/image-gallery-carousel"
import WhyUsSection from "@/components/why-us-section"
import TrustIndicators from "@/components/trust-indicators"
import ServiceLocations from "@/components/service-locations"
import Link from "next/link"
import Image from "next/image"
import { blurDataUrls } from "@/lib/image-optimization"

export default function Home() {
  // Featured gallery images for homepage carousel
  const featuredGalleryImages = [
    {
      src: "/images/gallery/custom-1.svg",
      alt: "Professional Duct Cleaning Service",
      category: "Air Duct Cleaning",
    },
    {
      src: "/images/gallery/custom-2.svg",
      alt: "HVAC System Maintenance",
      category: "HVAC Services",
    },
    {
      src: "/images/gallery/custom-3.svg",
      alt: "Dryer Vent Cleaning",
      category: "Dryer Vent Services",
    },
    {
      src: "/images/gallery/custom-4.svg",
      alt: "Chimney Sweeping and Inspection",
      category: "Chimney Services",
    },
    {
      src: "/images/gallery/featured-1.png",
      alt: "Professional Air Duct Cleaning",
      category: "Air Duct Cleaning",
    },
    {
      src: "/images/gallery/featured-2.png",
      alt: "Dryer Vent Cleaning Service",
      category: "Dryer Vent Cleaning",
    },
    {
      src: "/images/gallery/featured-3.png",
      alt: "Chimney Sweeping and Inspection",
      category: "Chimney Services",
    },
    {
      src: "/images/gallery/featured-4.png",
      alt: "HVAC System Maintenance",
      category: "HVAC Services",
    },
  ]

  return (
    <main className="flex min-h-screen flex-col items-center">
      <Hero />
      <WaitlistBanner />
      <WhyUsSection />
      <Services />
      <TrustIndicators />
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display text-texas-blue">Winter HVAC Services</h2>
            <p className="text-xl max-w-3xl mx-auto text-gray-700">
              Keep your home warm, safe, and energy-efficient during the cold Texas winter months.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-texas-cream rounded-xl overflow-hidden shadow-lg transform transition-all hover:scale-105">
              <div className="relative h-64">
                <Image
                  src="/images/winter-hvac-service.png"
                  alt="Winter HVAC Service"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                  style={{ objectFit: "cover" }}
                  placeholder="blur"
                  blurDataURL={blurDataUrls.service}
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-texas-blue mb-2">Heating System Tune-Up</h3>
                <p className="text-gray-700">
                  Ensure your heating system runs efficiently all winter with our comprehensive tune-up service.
                </p>
                <Link
                  href="/services"
                  className="inline-block mt-4 bg-texas-orange text-white py-2 px-4 rounded-lg font-bold hover:bg-texas-blue transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>

            <div className="bg-texas-cream rounded-xl overflow-hidden shadow-lg transform transition-all hover:scale-105">
              <div className="relative h-64">
                <Image
                  src="/images/winter-fireplace.png"
                  alt="Winter Fireplace Service"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                  style={{ objectFit: "cover" }}
                  placeholder="blur"
                  blurDataURL={blurDataUrls.service}
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-texas-blue mb-2">Fireplace & Chimney Safety</h3>
                <p className="text-gray-700">
                  Keep your family safe with our professional chimney cleaning and inspection services.
                </p>
                <Link
                  href="/services"
                  className="inline-block mt-4 bg-texas-orange text-white py-2 px-4 rounded-lg font-bold hover:bg-texas-blue transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>

            <div className="bg-texas-cream rounded-xl overflow-hidden shadow-lg transform transition-all hover:scale-105">
              <div className="relative h-64">
                <Image
                  src="/images/winter-duct-cleaning.png"
                  alt="Winter Duct Cleaning"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                  style={{ objectFit: "cover" }}
                  placeholder="blur"
                  blurDataURL={blurDataUrls.service}
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-texas-blue mb-2">Winter Air Quality</h3>
                <p className="text-gray-700">
                  Improve your indoor air quality during winter months when windows stay closed.
                </p>
                <Link
                  href="/services"
                  className="inline-block mt-4 bg-texas-orange text-white py-2 px-4 rounded-lg font-bold hover:bg-texas-blue transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-8">
            Breathing Easy in Texas, One Duct at a Time.
          </h2>
          <div className="flex justify-center">
            <Link
              href="/contact"
              className="bg-white text-orange-600 hover:bg-orange-100 font-bold py-3 px-8 rounded-full text-xl transition-all transform hover:scale-105"
            >
              Get a Free Estimate
            </Link>
          </div>
        </div>
      </div>

      <Pricing />
      <ServiceLocations />

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="p-6 transform transition-all hover:scale-105">
              <div className="text-5xl font-bold text-texas-orange mb-2">3,500+</div>
              <div className="text-xl text-gray-700">Homes Serviced</div>
            </div>
            <div className="p-6 transform transition-all hover:scale-105">
              <div className="text-5xl font-bold text-texas-orange mb-2">98%</div>
              <div className="text-xl text-gray-700">Customer Satisfaction</div>
            </div>
            <div className="p-6 transform transition-all hover:scale-105">
              <div className="text-5xl font-bold text-texas-orange mb-2">12+</div>
              <div className="text-xl text-gray-700">Years in Business</div>
            </div>
            <div className="p-6 transform transition-all hover:scale-105">
              <div className="text-5xl font-bold text-texas-orange mb-2">100%</div>
              <div className="text-xl text-gray-700">Satisfaction Guarantee</div>
            </div>
          </div>
        </div>
      </section>

      <Certifications />
      <Testimonials />

      {/* Gallery Carousel Section */}
      <section className="w-full bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display text-texas-blue">
              Our Work Speaks for Itself
            </h2>
            <p className="text-xl max-w-3xl mx-auto text-gray-700 mb-8">
              Check out our gallery of before and after transformations
            </p>

            {/* Featured Gallery Carousel */}
            <div className="max-w-5xl mx-auto mb-8">
              <ImageGalleryCarousel images={featuredGalleryImages} />
            </div>

            <Link
              href="/gallery"
              className="bg-texas-orange hover:bg-texas-blue text-white font-bold py-3 px-8 rounded-full text-xl transition-all transform hover:scale-105 inline-block mt-4"
            >
              View Full Gallery
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-texas-cream rounded-xl overflow-hidden shadow-lg">
              <div className="relative h-64 w-full">
                <Image
                  src="/images/gallery/custom-1.svg"
                  alt="Professional Duct Cleaning"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 25vw, 300px"
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-texas-blue">Air Duct Cleaning</h3>
                <p className="text-gray-700 text-sm">Professional Service</p>
              </div>
            </div>
            <div className="bg-texas-cream rounded-xl overflow-hidden shadow-lg">
              <div className="relative h-64 w-full">
                <Image
                  src="/images/gallery/custom-2.svg"
                  alt="HVAC Maintenance"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 25vw, 300px"
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-texas-blue">HVAC Maintenance</h3>
                <p className="text-gray-700 text-sm">System Optimization</p>
              </div>
            </div>
            <div className="bg-texas-cream rounded-xl overflow-hidden shadow-lg">
              <div className="relative h-64 w-full">
                <Image
                  src="/images/gallery/custom-3.svg"
                  alt="Dryer Vent Cleaning"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 25vw, 300px"
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-texas-blue">Dryer Vent Cleaning</h3>
                <p className="text-gray-700 text-sm">Fire Prevention</p>
              </div>
            </div>
            <div className="bg-texas-cream rounded-xl overflow-hidden shadow-lg">
              <div className="relative h-64 w-full">
                <Image
                  src="/images/gallery/custom-4.svg"
                  alt="Chimney Sweeping"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 25vw, 300px"
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-texas-blue">Chimney Sweeping</h3>
                <p className="text-gray-700 text-sm">Safety Inspection</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <MapSection />
      <ContactForm />
    </main>
  )
}
