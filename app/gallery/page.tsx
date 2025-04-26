import ImageGalleryCarousel from "@/components/image-gallery-carousel"
import type { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Gallery | Duct Warriors",
  description:
    "View our gallery of before and after transformations for air duct cleaning, dryer vent cleaning, and more.",
}

// Dummy blurDataUrls object (replace with actual implementation if needed)
const blurDataUrls = {
  default:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
}

export default function GalleryPage() {
  // Gallery images data
  const galleryImages = [
    {
      src: "/images/gallery/before-after-1.png",
      alt: "Air Duct Before and After",
      category: "Air Duct Cleaning",
    },
    {
      src: "/images/gallery/before-after-2.png",
      alt: "Dryer Vent Before and After",
      category: "Dryer Vent Cleaning",
    },
    {
      src: "/images/gallery/before-after-3.png",
      alt: "Chimney Before and After",
      category: "Chimney Sweeping",
    },
    {
      src: "/images/gallery/before-after-4.png",
      alt: "HVAC System Before and After",
      category: "HVAC Maintenance",
    },
    {
      src: "/images/gallery/before-after-5.png",
      alt: "Attic Insulation Before and After",
      category: "Attic Insulation",
    },
  ]

  // Featured project images
  const featuredProjects = [
    {
      title: "Commercial Air Duct Cleaning",
      location: "Dallas Office Building",
      images: [
        {
          src: "/images/gallery/commercial-1.png",
          alt: "Commercial Duct Cleaning - Before",
          category: "Before",
        },
        {
          src: "/images/gallery/commercial-2.png",
          alt: "Commercial Duct Cleaning - After",
          category: "After",
        },
      ],
    },
    {
      title: "Residential Full-Home Service",
      location: "Plano Family Home",
      images: [
        {
          src: "/images/gallery/residential-1.png",
          alt: "Residential Full Service - Before",
          category: "Before",
        },
        {
          src: "/images/gallery/residential-2.png",
          alt: "Residential Full Service - After",
          category: "After",
        },
      ],
    },
  ]

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-display text-texas-blue">Our Work Gallery</h1>
          <p className="text-xl max-w-3xl mx-auto text-gray-700">
            See the difference our professional services make with these before and after transformations
          </p>
        </div>

        {/* Main Gallery Carousel */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-texas-blue">Featured Transformations</h2>
          <ImageGalleryCarousel images={galleryImages} />
        </section>

        {/* Featured Projects */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-texas-blue">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.map((project, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg">
                <ImageGalleryCarousel images={project.images} autoplay={false} />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-texas-blue">{project.title}</h3>
                  <p className="text-gray-700">{project.location}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Before & After Grid */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-texas-blue">Before & After Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg">
                <div className="grid grid-cols-2">
                  <div className="relative h-48">
                    <Image
                      src={`/images/before-${index + 1}.png`}
                      alt={`Before cleaning example ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="object-cover"
                      placeholder="blur"
                      blurDataURL={blurDataUrls.default}
                    />
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs py-1 px-2 rounded">BEFORE</div>
                  </div>
                  <div className="relative h-48">
                    <Image
                      src={`/images/after-${index + 1}.png`}
                      alt={`After cleaning example ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="object-cover"
                      placeholder="blur"
                      blurDataURL={blurDataUrls.default}
                    />
                    <div className="absolute top-2 left-2 bg-green-500 text-white text-xs py-1 px-2 rounded">AFTER</div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-texas-blue">Service Example {index + 1}</h3>
                  <p className="text-gray-700 text-sm">Texas Location</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
