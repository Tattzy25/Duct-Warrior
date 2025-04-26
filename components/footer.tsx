import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram } from "lucide-react"
import WeatherCard from "./weather-card"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-texas-blue text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="mb-6">
              <Link href="/" className="inline-block">
                <div className="relative h-12 w-48 bg-white rounded-lg p-2">
                  <Image src="/images/logo.png" alt="DUCTWARRIORS Logo" fill style={{ objectFit: "contain" }} />
                </div>
              </Link>
            </div>
            <p className="mb-6">
              Breathing Easy in Texas, One Duct at a Time. Professional air duct cleaning and HVAC services in McKinney,
              TX and surrounding areas.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-white text-texas-blue hover:bg-texas-orange hover:text-white rounded-full p-2 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-white text-texas-blue hover:bg-texas-orange hover:text-white rounded-full p-2 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-white text-texas-blue hover:bg-texas-orange hover:text-white rounded-full p-2 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/" className="hover:text-texas-orange transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-texas-orange transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-texas-orange transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-texas-orange transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-texas-orange transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6">Services</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/services/air-duct-cleaning" className="hover:text-texas-orange transition-colors">
                  Air Duct Cleaning
                </Link>
              </li>
              <li>
                <Link href="/services/attic-insulation" className="hover:text-texas-orange transition-colors">
                  Attic Insulation
                </Link>
              </li>
              <li>
                <Link href="/services/chimney-sweeping" className="hover:text-texas-orange transition-colors">
                  Chimney Sweeping
                </Link>
              </li>
              <li>
                <Link href="/services/dryer-vent-services" className="hover:text-texas-orange transition-colors">
                  Dryer Vent Services
                </Link>
              </li>
              <li>
                <Link href="/services/fireplace-services" className="hover:text-texas-orange transition-colors">
                  Fireplace Services
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-3 text-texas-orange flex-shrink-0" />
                <span>(123) 456-7890</span>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-3 text-texas-orange flex-shrink-0" />
                <span>info@ductwarriors.com</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-texas-orange flex-shrink-0" />
                <span>123 Main Street, McKinney, TX 75070</span>
              </li>
              <li className="flex items-start">
                <Clock className="h-5 w-5 mr-3 text-texas-orange flex-shrink-0" />
                <div>
                  <p>Mon-Fri: 8:00 AM - 6:00 PM</p>
                  <p>Sat: 9:00 AM - 4:00 PM</p>
                  <p>Sun: Closed</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Weather Card */}
        <div className="mt-12 pt-8">
          <h3 className="text-xl font-bold mb-6 text-center">Current Weather</h3>
          <WeatherCard />
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p>&copy; {currentYear} DUCTWARRIORS. All Rights Reserved.</p>
          <div className="mt-4 flex justify-center space-x-6">
            <Link href="/privacy-policy" className="hover:text-texas-orange transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-texas-orange transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
