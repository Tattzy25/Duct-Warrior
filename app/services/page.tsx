import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

const services = [
  {
    id: "air-duct-cleaning",
    title: "Air Duct Cleaning",
    price: "$99",
    description:
      "Our professional air duct cleaning service removes dust, allergens, and contaminants from your HVAC system, improving indoor air quality and helping your family breathe easier. We use state-of-the-art equipment to thoroughly clean every part of your ductwork.",
    image: "/images/air-duct-cleaning.png",
    benefits: [
      "Removes dust, allergens, and contaminants",
      "Improves indoor air quality",
      "Reduces allergy symptoms",
      "Increases HVAC efficiency",
      "Extends the life of your HVAC system",
    ],
  },
  {
    id: "attic-insulation",
    title: "Attic Insulation",
    price: "$0.99",
    priceUnit: "per sq ft",
    description:
      "Proper attic insulation is crucial for energy efficiency and comfort in your home. Our attic insulation service helps regulate your home's temperature, reduce energy costs, and prevent moisture problems. We use high-quality materials and professional installation techniques.",
    image: "/images/attic-insulation.png",
    benefits: [
      "Reduces energy costs",
      "Improves home comfort",
      "Prevents ice dams in winter",
      "Reduces noise from outside",
      "Increases home value",
    ],
  },
  {
    id: "chimney-sweeping",
    title: "Chimney Sweeping",
    price: "$99",
    description:
      "Regular chimney cleaning is essential for preventing dangerous chimney fires and ensuring proper ventilation. Our thorough chimney sweeping service removes creosote buildup, debris, and blockages, keeping your fireplace safe and functional for your family to enjoy.",
    image: "/images/chimney-sweeping.png",
    benefits: [
      "Prevents chimney fires",
      "Ensures proper ventilation",
      "Removes creosote buildup",
      "Identifies potential problems early",
      "Extends chimney lifespan",
    ],
  },
  {
    id: "dryer-vent-services",
    title: "Dryer Vent Services",
    price: "$99",
    description:
      "Clogged dryer vents are a leading cause of house fires. Our dryer vent cleaning service removes lint and debris buildup, improving dryer efficiency and reducing fire risk. We thoroughly clean the entire vent system from the dryer to the exterior vent.",
    image: "/images/dryer-vent.png",
    benefits: [
      "Reduces fire hazards",
      "Improves dryer efficiency",
      "Lowers energy costs",
      "Extends dryer lifespan",
      "Decreases drying times",
    ],
  },
  {
    id: "fireplace-services",
    title: "Fireplace Services",
    price: "Varies",
    description:
      "Keep your fireplace in top condition with our comprehensive fireplace services. From cleaning and maintenance to repairs and inspections, we ensure your fireplace operates safely and efficiently. Our technicians are experienced with all types of fireplaces.",
    image: "/images/fireplace-services.png",
    benefits: [
      "Ensures safe operation",
      "Improves heating efficiency",
      "Prevents smoke problems",
      "Identifies needed repairs",
      "Extends fireplace lifespan",
    ],
  },
  {
    id: "hvac-maintenance",
    title: "HVAC Maintenance",
    price: "$149",
    description:
      "Regular HVAC maintenance is essential for optimal performance and longevity of your heating and cooling systems. Our comprehensive maintenance service includes inspection, cleaning, and tune-up of all HVAC components to ensure efficient operation year-round.",
    image: "/images/hvac-maintenance.png",
    benefits: [
      "Improves system efficiency",
      "Prevents costly breakdowns",
      "Extends equipment lifespan",
      "Maintains manufacturer warranty",
      "Ensures consistent comfort",
    ],
  },
]

export default function ServicesPage() {
  return (
    <div className="bg-texas-cream py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 font-display text-texas-blue">Our Services</h1>
          <p className="text-xl max-w-3xl mx-auto text-gray-700">
            Professional HVAC and home maintenance services to keep your McKinney, TX home comfortable, efficient, and
            safe.
          </p>
        </div>

        <div className="space-y-16">
          {services.map((service) => {
            // Define heroic headlines and subheadlines for each service
            const heroicHeadlines = {
              "air-duct-cleaning": {
                headline: "Clean Air, Healthier Home.",
                subheadline: "Our 22-point duct cleansing attack removes 99.9% of allergens and dust.",
              },
              "attic-insulation": {
                headline: "Comfort Above, Savings Below.",
                subheadline: "Shield your home from extreme temperatures and slash energy bills by up to 30%.",
              },
              "chimney-sweeping": {
                headline: "Fire Safety, Peace of Mind.",
                subheadline: "Eliminate dangerous creosote buildup and prevent the #1 cause of home fires.",
              },
              "dryer-vent-services": {
                headline: "Faster Drying, Fire Prevention.",
                subheadline: "Cut drying time in half while eliminating the hidden fire hazard in your laundry room.",
              },
              "fireplace-services": {
                headline: "Cozy Warmth, Maximum Safety.",
                subheadline: "Restore your fireplace to peak performance with our comprehensive maintenance.",
              },
              "hvac-maintenance": {
                headline: "Efficiency Unleashed, Breakdowns Prevented.",
                subheadline: "Extend your system's life by years while cutting energy costs every month.",
              },
            }

            const headline = heroicHeadlines[service.id]?.headline || service.title
            const subheadline = heroicHeadlines[service.id]?.subheadline || service.description

            return (
              <div key={service.id} className="bg-white rounded-3xl shadow-xl overflow-hidden">
                <div className="relative">
                  <div className="h-64 relative">
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      fill
                      style={{ objectFit: "cover" }}
                      className="transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                    <div className="absolute bottom-0 left-0 p-6 text-white">
                      <h2 className="text-3xl font-bold mb-2">{service.title}</h2>
                      <div className="flex items-baseline">
                        <span className="text-3xl font-bold text-texas-orange">{service.price}</span>
                        {service.priceUnit && <span className="ml-1 text-sm">{service.priceUnit}</span>}
                        <span className="ml-2 text-sm">starting at</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <div className="bg-texas-cream p-6 rounded-xl mb-8">
                    <h3 className="text-2xl font-bold mb-2 text-texas-blue">{headline}</h3>
                    <p className="text-lg text-gray-700">{subheadline}</p>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-xl font-bold mb-4 text-texas-blue">The Warrior Advantage</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {service.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start bg-gray-50 p-3 rounded-lg">
                          <span className="text-texas-orange mr-2 text-xl">✓</span>
                          <span className="font-medium">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href={`/services/${service.id}`}
                      className="inline-flex items-center justify-center bg-texas-orange hover:bg-texas-blue text-white font-bold py-3 px-6 rounded-full transition-colors flex-1"
                    >
                      See Before & After <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center border-2 border-texas-blue text-texas-blue hover:bg-texas-blue hover:text-white font-bold py-3 px-6 rounded-full transition-colors flex-1"
                    >
                      Get a Free Inspection
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-16 bg-white rounded-3xl shadow-xl p-8 lg:p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 text-texas-blue">Service Areas</h2>
            <p className="text-xl text-gray-700">We proudly serve McKinney, TX and surrounding areas including:</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
            {["McKinney", "Frisco", "Plano", "Allen", "Richardson", "Prosper"].map((city) => (
              <div
                key={city}
                className="bg-texas-cream rounded-xl p-4 font-bold text-texas-blue hover:bg-texas-orange hover:text-white transition-colors"
              >
                {city}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
