import Hero from "@/components/hero"
import Services from "@/components/services"
import Pricing from "@/components/pricing"
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
      <section className="py-16 bg-theme-bg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display gradient-text">Winter HVAC Services</h2>
            <p className="text-xl max-w-3xl mx-auto text-theme-text">
              Keep your home warm, safe, and energy-efficient during the cold Texas winter months.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="neumorphic-card overflow-hidden transform transition-all hover:scale-105">
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
                <h3 className="text-2xl font-bold text-theme-text mb-2">Heating System Tune-Up</h3>
                <p className="text-theme-text/80">
                  Ensure your heating system runs efficiently all winter with our comprehensive tune-up service.
                </p>
                <Link
                  href="/services"
                  className="inline-block mt-4 bg-gradient-to-r from-theme-accent to-theme-accent-end text-theme-text py-2 px-4 rounded-lg font-bold hover:opacity-90 transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>

            <div className="neumorphic-card overflow-hidden transform transition-all hover:scale-105">
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
                <h3 className="text-2xl font-bold text-theme-text mb-2">Fireplace & Chimney Safety</h3>
                <p className="text-theme-text/80">
                  Keep your family safe with our professional chimney cleaning and inspection services.
                </p>
                <Link
                  href="/services"
                  className="inline-block mt-4 bg-gradient-to-r from-theme-accent to-theme-accent-end text-theme-text py-2 px-4 rounded-lg font-bold hover:opacity-90 transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>

            <div className="neumorphic-card overflow-hidden transform transition-all hover:scale-105">
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
                <h3 className="text-2xl font-bold text-theme-text mb-2">Winter Air Quality</h3>
                <p className="text-theme-text/80">
                  Improve your indoor air quality during winter months when windows stay closed.
                </p>
                <Link
                  href="/services"
                  className="inline-block mt-4 bg-gradient-to-r from-theme-accent to-theme-accent-end text-theme-text py-2 px-4 rounded-lg font-bold hover:opacity-90 transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full py-16 bg-texas-orange">
        <div className="container mx-auto px-4">
          <div className="rounded-[50px] py-12 px-8 bg-[#ff7b1c] shadow-[10px_10px_20px_#d95600,-10px_-10px_20px_#ff9633] mx-auto max-w-4xl">
            <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-8">
              Breathing Easy in Texas, One Duct at a Time.
            </h2>
            <div className="flex justify-center">
              <Link
                href="/contact"
                className="bg-gradient-to-r from-theme-accent to-theme-accent-end text-theme-text hover:opacity-90 font-bold py-3 px-8 rounded-full text-xl transition-all transform hover:scale-105"
              >
                Get a Free Estimate
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Pricing />
      <ServiceLocations />

      {/* Stats Section */}
      <section className="py-16 bg-theme-bg">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="neumorphic-card p-6 transform transition-all hover:scale-105">
              <div className="text-5xl font-bold text-theme-accent mb-2">3,500+</div>
              <div className="text-xl text-theme-text">Homes Serviced</div>
            </div>
            <div className="neumorphic-card p-6 transform transition-all hover:scale-105">
              <div className="text-5xl font-bold text-theme-accent mb-2">98%</div>
              <div className="text-xl text-theme-text">Customer Satisfaction</div>
            </div>
            <div className="neumorphic-card p-6 transform transition-all hover:scale-105">
              <div className="text-5xl font-bold text-theme-accent mb-2">12+</div>
              <div className="text-xl text-theme-text">Years in Business</div>
            </div>
            <div className="neumorphic-card p-6 transform transition-all hover:scale-105">
              <div className="text-5xl font-bold text-theme-accent mb-2">100%</div>
              <div className="text-xl text-theme-text">Satisfaction Guarantee</div>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />

      {/* Gallery Carousel Section */}
      <section className="w-full bg-theme-bg py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display gradient-text">
              Our Work Speaks for Itself
            </h2>
            <p className="text-xl max-w-3xl mx-auto text-theme-text mb-8">
              Check out our gallery of before and after transformations
            </p>

            {/* Featured Gallery Carousel */}
            <div className="max-w-5xl mx-auto mb-8">
              <ImageGalleryCarousel images={featuredGalleryImages} />
            </div>

            <Link
              href="/gallery"
              className="bg-gradient-to-r from-theme-accent to-theme-accent-end text-theme-text hover:opacity-90 font-bold py-3 px-8 rounded-full text-xl transition-all transform hover:scale-105 inline-block mt-4"
            >
              View Full Gallery
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="neumorphic-card overflow-hidden">
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
                <h3 className="font-bold text-theme-text">Air Duct Cleaning</h3>
                <p className="text-theme-text/70 text-sm">Professional Service</p>
              </div>
            </div>
            <div className="neumorphic-card overflow-hidden">
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
                <h3 className="font-bold text-theme-text">HVAC Maintenance</h3>
                <p className="text-theme-text/70 text-sm">System Optimization</p>
              </div>
            </div>
            <div className="neumorphic-card overflow-hidden">
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
                <h3 className="font-bold text-theme-text">Dryer Vent Cleaning</h3>
                <p className="text-theme-text/70 text-sm">Fire Prevention</p>
              </div>
            </div>
            <div className="neumorphic-card overflow-hidden">
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
                <h3 className="font-bold text-theme-text">Chimney Sweeping</h3>
                <p className="text-theme-text/70 text-sm">Safety Inspection</p>
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
