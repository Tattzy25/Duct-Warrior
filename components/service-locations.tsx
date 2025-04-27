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
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display text-gray-800">Our Battle Stations</h2>
          <p className="text-xl max-w-3xl mx-auto text-gray-700">
            Our warriors are strategically positioned throughout North Texas to respond quickly to your air quality
            needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {locations.map((location) => (
            <div
              key={location.city}
              className="rounded-[30px] py-8 px-6 bg-gray-50 shadow-[8px_8px_16px_#d1d1d1,-8px_-8px_16px_#ffffff]"
            >
              <div className="bg-gradient-to-r from-[#ff7b1c] to-[#ff9633] text-white p-4 rounded-xl mb-4">
                <h3 className="text-xl font-bold">{location.city} Command Center</h3>
              </div>
              <div className="p-2">
                <div className="flex items-start mb-4">
                  <MapPin className="h-5 w-5 text-[#ff7b1c] mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">{location.address}</span>
                </div>
                <div className="flex items-start mb-4">
                  <Phone className="h-5 w-5 text-[#ff7b1c] mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">{location.phone}</span>
                </div>
                <div className="flex items-start mb-6">
                  <Mail className="h-5 w-5 text-[#ff7b1c] mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">{location.email}</span>
                </div>

                <div>
                  <h4 className="font-bold text-gray-800 mb-2">Areas Served:</h4>
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

        <div className="rounded-[50px] py-12 px-8 bg-[#ff7b1c] shadow-[10px_10px_20px_#d95600,-10px_-10px_20px_#ff9633] mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold text-white mb-2">Ready for a Free Estimate?</h3>
              <p className="max-w-xl text-white">
                Our warriors will assess your air quality needs and provide a detailed, no-obligation quote for our
                services.
              </p>
            </div>
            <Link
              href="/contact"
              className="bg-white text-[#ff7b1c] hover:bg-gray-100 font-bold py-3 px-8 rounded-full text-lg transition-colors"
            >
              Get Free Estimate
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
