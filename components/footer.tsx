import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="mb-6">
              <Link href="/" className="inline-block">
                <div className="relative h-12 w-48 bg-white rounded-lg p-2">
                  <Image src="/images/texas.svg" alt="DUCTWARRIORS Logo" fill style={{ objectFit: "contain" }} />
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
                className="bg-white text-gray-800 hover:bg-[#ff7b1c] hover:text-white rounded-full p-2 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-white text-gray-800 hover:bg-[#ff7b1c] hover:text-white rounded-full p-2 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-white text-gray-800 hover:bg-[#ff7b1c] hover:text-white rounded-full p-2 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
            <div className="mt-6 p-4 bg-[#ff7b1c] bg-opacity-20 rounded-lg border border-[#ff7b1c] border-opacity-30 flex items-center">
              <Shield className="h-6 w-6 mr-2 text-[#ff7b1c]" />
              <p className="font-bold text-white text-center">100% Warrior Guarantee</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6">Battle Stations</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/" className="hover:text-[#ff7b1c] transition-colors">
                  Home Base
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#ff7b1c] transition-colors">
                  Our Arsenal
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-[#ff7b1c] transition-colors">
                  Mission Costs
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#ff7b1c] transition-colors">
                  The Warriors
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#ff7b1c] transition-colors">
                  Command Center
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6">Air Defense Missions</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/services/air-duct-cleaning" className="hover:text-[#ff7b1c] transition-colors">
                  Air Duct Cleaning
                </Link>
              </li>
              <li>
                <Link href="/services/attic-insulation" className="hover:text-[#ff7b1c] transition-colors">
                  Attic Insulation
                </Link>
              </li>
              <li>
                <Link href="/services/chimney-sweeping" className="hover:text-[#ff7b1c] transition-colors">
                  Chimney Sweeping
                </Link>
              </li>
              <li>
                <Link href="/services/dryer-vent-services" className="hover:text-[#ff7b1c] transition-colors">
                  Dryer Vent Services
                </Link>
              </li>
              <li>
                <Link href="/services/fireplace-services" className="hover:text-[#ff7b1c] transition-colors">
                  Fireplace Services
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Ready to Fight for Clean Air?</h3>
            <p className="mb-4">Schedule your first strike against dirty air today!</p>
            <form className="space-y-3">
              <div>
                <Input
                  type="text"
                  placeholder="Your Name"
                  className="bg-white/10 border-white/20 placeholder:text-white/50 text-white"
                />
              </div>
              <div>
                <Input
                  type="tel"
                  placeholder="Your Phone"
                  className="bg-white/10 border-white/20 placeholder:text-white/50 text-white"
                />
              </div>
              <div>
                <Textarea
                  placeholder="Battle Plan Details"
                  className="bg-white/10 border-white/20 placeholder:text-white/50 text-white h-20"
                />
              </div>
              <Button type="submit" className="w-full bg-[#ff7b1c] hover:bg-[#ff7b1c]/80 text-white">
                Deploy Warriors
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p>&copy; {currentYear} DUCTWARRIORS. All Rights Reserved.</p>
          <div className="mt-4 flex justify-center space-x-6">
            <Link href="/privacy-policy" className="hover:text-[#ff7b1c] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-[#ff7b1c] transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
