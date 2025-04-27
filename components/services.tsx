import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const services = [
  {
    id: "air-duct-cleaning",
    title: "Air Duct Cleaning",
    price: "$99",
    description:
      "Remove dust, allergens, and contaminants from your air ducts for cleaner, healthier air in your home.",
    image: "/images/air-duct-cleaning.png",
  },
  {
    id: "attic-insulation",
    title: "Attic Insulation",
    price: "$0.99",
    priceUnit: "per sq ft",
    description: "Improve your home's energy efficiency and comfort with professional attic insulation services.",
    image: "/images/attic-insulation.png",
  },
  {
    id: "chimney-sweeping",
    title: "Chimney Sweeping",
    price: "$99",
    description: "Prevent fire hazards and ensure proper ventilation with our thorough chimney cleaning service.",
    image: "/images/chimney-sweeping.png",
  },
  {
    id: "dryer-vent-services",
    title: "Dryer Vent Services",
    price: "$99",
    description: "Reduce fire risk and improve dryer efficiency with professional dryer vent cleaning.",
    image: "/images/dryer-vent.png",
  },
  {
    id: "fireplace-services",
    title: "Fireplace Services",
    price: "Varies",
    description: "Keep your fireplace safe and functional with our comprehensive maintenance services.",
    image: "/images/fireplace-services.png",
  },
  {
    id: "hvac-maintenance",
    title: "HVAC Maintenance",
    price: "$149",
    description:
      "Comprehensive HVAC system tune-ups to improve efficiency, extend equipment life, and reduce energy bills.",
    image: "/images/hvac-maintenance.png",
  },
]

export default function Services() {
  return (
    <section className="py-20 bg-theme-bg" id="services">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display gradient-text">Our Legendary Services</h2>
          <p className="text-xl max-w-3xl mx-auto text-theme-text">
            Professional services to keep your home's air quality at its best and your HVAC systems running efficiently.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="neumorphic-card service-card h-full flex flex-col overflow-hidden">
              <div className="relative h-64">
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 text-theme-text">{service.title}</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-3xl font-bold text-theme-accent">{service.price}</span>
                  {service.priceUnit && <span className="ml-1 text-sm text-theme-text/70">{service.priceUnit}</span>}
                  <span className="ml-2 text-sm text-theme-text/70">starting at</span>
                </div>
                <p className="text-theme-text/80 mb-6">{service.description}</p>
                <Link
                  href={`/services/${service.id}`}
                  className="mt-auto bg-gradient-to-r from-theme-accent to-theme-accent-end text-theme-text font-bold py-3 px-6 rounded-full hover:opacity-90 transition-all inline-flex items-center"
                >
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/services"
            className="bg-gradient-to-r from-theme-accent to-theme-accent-end text-theme-text font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105 inline-block"
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  )
}
