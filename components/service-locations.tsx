import { MapPin, Phone, Mail } from "lucide-react"
import Link from "next/link"

const locations = [
  {
    city: "McKinney",
    address: "123 Main Street, McKinney, TX 75070",
    phone: "(972) 123-4567",
    email: "mckinney@ductwarriors.com",
    areas: ["Allen", "Fairview", "Melissa", "Princeton"],
  },
  {
    city: "Frisco",
    address: "456 Oak Avenue, Frisco, TX 75034",
    phone: "(972) 234-5678",
    email: "frisco@ductwarriors.com",
    areas: ["Plano", "The Colony", "Little Elm", "Prosper"],
  },
  {
    city: "Dallas",
    address: "789 Elm Street, Dallas, TX 75201",
    phone: "(214) 345-6789",
    email: "dallas@ductwarriors.com",
    areas: ["Richardson", "Garland", "Mesquite", "Irving"],
  },
]

export default function ServiceLocations() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display text-texas-blue">Our Battle Stations</h2>
          <p className="text-xl max-w-3xl mx-auto text-gray-700">
            Our warriors are strategically positioned throughout North Texas to respond quickly to your air quality
            needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {locations.map((location) => (
            <div key={location.city} className="bg-gray-50 rounded-xl shadow-md overflow-hidden">
              <div className="bg-texas-blue text-white p-4">
                <h3 className="text-xl font-bold">{location.city} Command Center</h3>
              </div>
              <div className="p-6">
                <div className="flex items-start mb-4">
                  <MapPin className="h-5 w-5 text-texas-orange mr-2 mt-1 flex-shrink-0" />
                  <span>{location.address}</span>
                </div>
                <div className="flex items-start mb-4">
                  <Phone className="h-5 w-5 text-texas-orange mr-2 mt-1 flex-shrink-0" />
                  <span>{location.phone}</span>
                </div>
                <div className="flex items-start mb-6">
                  <Mail className="h-5 w-5 text-texas-orange mr-2 mt-1 flex-shrink-0" />
                  <span>{location.email}</span>
                </div>

                <div>
                  <h4 className="font-bold text-texas-blue mb-2">Areas Served:</h4>
                  <div className="flex flex-wrap gap-2">
                    {location.areas.map((area) => (
                      <span key={area} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-texas-orange text-white rounded-xl p-8 shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold mb-2">Ready for a Free Estimate?</h3>
              <p className="max-w-xl">
                Our warriors will assess your air quality needs and provide a detailed, no-obligation quote for our
                services.
              </p>
            </div>
            <Link
              href="/contact"
              className="bg-white text-texas-blue hover:bg-gray-100 font-bold py-3 px-8 rounded-full text-lg transition-colors"
            >
              Get Free Estimate
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
