import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Award, Shield, ThumbsUp } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] bg-texas-blue overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/duct-cleaning-team.png"
            alt="Duct Warriors Team"
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 font-display">
            We're the <span className="text-texas-orange">DUCT WARRIORS</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl">Fighting for cleaner air in McKinney, TX homes since 2010</p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-texas-cream">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-4xl font-bold mb-6 text-texas-blue">Our Story</h2>
              <div className="space-y-6 text-lg">
                <div>
                  <p className="font-bold text-texas-blue mb-2">The Origin Story</p>
                  <p>
                    <span className="font-bold text-texas-orange text-xl">DUCT WARRIORS</span> was born from a simple
                    but powerful idea: every family deserves to breathe clean air in their home.
                  </p>
                </div>

                <div>
                  <p className="font-bold text-texas-blue mb-2">The Founder's Mission</p>
                  <p>
                    Mike Johnson, a 15-year HVAC veteran, was fed up with the corner-cutting he witnessed in the
                    industry.
                  </p>
                  <p>
                    In 2010, he grabbed one truck and made a promise: deliver honest, thorough duct cleaning with zero
                    shortcuts.
                  </p>
                </div>

                <div>
                  <p className="font-bold text-texas-blue mb-2">The Growth</p>
                  <p>
                    That commitment to quality quickly earned us a reputation throughout McKinney and surrounding areas.
                  </p>
                  <p>What started as a one-man crusade has grown into a team of certified clean-air warriors.</p>
                </div>

                <div className="bg-texas-cream p-4 rounded-lg border-l-4 border-texas-orange mt-6">
                  <p className="font-bold text-texas-blue text-xl">
                    We're not just cleaning ducts – we're fighting for your family's health, one home at a time.
                  </p>
                </div>
              </div>
              <div className="mt-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center bg-texas-orange hover:bg-texas-blue text-white font-bold py-3 px-6 rounded-full text-lg transition-all transform hover:scale-105"
                >
                  Join Our Mission <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-texas-cream p-3 rounded-full mb-3">
                      <Image src="/images/epa-certified.png" alt="EPA Certified" width={60} height={60} />
                    </div>
                    <p className="font-bold text-texas-blue">EPA Certified</p>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-texas-cream p-3 rounded-full mb-3">
                      <Image src="/images/home-advisor.png" alt="HomeAdvisor Pro" width={60} height={60} />
                    </div>
                    <p className="font-bold text-texas-blue">HomeAdvisor Pro</p>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-texas-cream p-3 rounded-full mb-3">
                      <Image src="/images/elite-service.png" alt="Elite Service" width={60} height={60} />
                    </div>
                    <p className="font-bold text-texas-blue">Elite Service</p>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-texas-cream p-3 rounded-full mb-3">
                      <Image src="/images/winner.png" alt="Award Winner" width={60} height={60} />
                    </div>
                    <p className="font-bold text-texas-blue">Award Winner</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 relative h-[400px] rounded-lg overflow-hidden shadow-2xl">
              <Image src="/duct-cleaning-founder.png" alt="Our Founder" fill style={{ objectFit: "cover" }} />
            </div>
          </div>
        </div>
      </section>

      {/* Mini Testimonials */}
      <div className="container mx-auto px-4">
        <div className="mt-16 bg-texas-blue rounded-xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-6 text-center">What Our Warriors Say</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white bg-opacity-10 p-6 rounded-lg">
              <p className="italic mb-4">
                "The Duct Warriors saved my family from allergies! Their thorough cleaning made an immediate
                difference."
              </p>
              <p className="font-bold text-texas-orange">- Karen M., McKinney TX</p>
            </div>
            <div className="bg-white bg-opacity-10 p-6 rounded-lg">
              <p className="italic mb-4">
                "I couldn't believe how much dust they removed from our system. My kids can finally breathe easier at
                night."
              </p>
              <p className="font-bold text-texas-orange">- James T., Frisco TX</p>
            </div>
            <div className="bg-white bg-opacity-10 p-6 rounded-lg">
              <p className="italic mb-4">
                "Professional, on-time, and incredibly thorough. These guys are the real deal when it comes to air
                quality."
              </p>
              <p className="font-bold text-texas-orange">- Sarah L., Allen TX</p>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-4 text-center text-texas-blue">Our Core Values</h2>
          <p className="text-xl text-center max-w-3xl mx-auto mb-16">
            These aren't just words on a wall – they're the principles that guide every job we take on.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-texas-cream p-8 rounded-lg shadow-lg transform transition-all hover:scale-105">
              <div className="bg-texas-orange p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-texas-blue">Integrity First</h3>
              <p className="text-lg">
                We do what's right, even when no one's watching. No upselling, no unnecessary services – just honest
                work at fair prices.
              </p>
            </div>

            <div className="bg-texas-cream p-8 rounded-lg shadow-lg transform transition-all hover:scale-105">
              <div className="bg-texas-orange p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-texas-blue">Uncompromising Quality</h3>
              <p className="text-lg">
                We never cut corners. Our thorough 22-point cleaning process ensures your system is truly clean, not
                just surface-level.
              </p>
            </div>

            <div className="bg-texas-cream p-8 rounded-lg shadow-lg transform transition-all hover:scale-105">
              <div className="bg-texas-orange p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <ThumbsUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-texas-blue">Customer Obsession</h3>
              <p className="text-lg">
                Your satisfaction drives everything we do. We're not happy until you're breathing easier and completely
                satisfied with our work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-20 bg-texas-blue text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-4 text-center">Meet the Warriors</h2>
          <p className="text-xl text-center max-w-3xl mx-auto mb-16">
            Our team of certified technicians brings decades of combined experience to every job.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Team Member 1 */}
            <div className="bg-white bg-opacity-10 p-6 rounded-lg text-center transform transition-all hover:scale-105">
              <div className="relative h-64 w-64 mx-auto mb-6 rounded-full overflow-hidden">
                <Image src="/duct-cleaning-headshot.png" alt="Mike Johnson" fill style={{ objectFit: "cover" }} />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-texas-orange">Mike Johnson</h3>
              <p className="text-lg mb-4">Founder & Lead Technician</p>
              <p className="text-sm">
                15+ years in HVAC, certified master technician, and passionate advocate for indoor air quality.
              </p>
            </div>

            {/* Team Member 2 */}
            <div className="bg-white bg-opacity-10 p-6 rounded-lg text-center transform transition-all hover:scale-105">
              <div className="relative h-64 w-64 mx-auto mb-6 rounded-full overflow-hidden">
                <Image src="/duct-cleaning-manager.png" alt="Sarah Martinez" fill style={{ objectFit: "cover" }} />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-texas-orange">Sarah Martinez</h3>
              <p className="text-lg mb-4">Operations Manager</p>
              <p className="text-sm">
                Former HVAC business owner with 10+ years experience ensuring every job runs smoothly from start to
                finish.
              </p>
            </div>

            {/* Team Member 3 */}
            <div className="bg-white bg-opacity-10 p-6 rounded-lg text-center transform transition-all hover:scale-105">
              <div className="relative h-64 w-64 mx-auto mb-6 rounded-full overflow-hidden">
                <Image src="/confident-sweep.png" alt="Dave Wilson" fill style={{ objectFit: "cover" }} />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-texas-orange">Dave Wilson</h3>
              <p className="text-lg mb-4">Chimney Specialist</p>
              <p className="text-sm">
                Certified chimney sweep with 8+ years experience and a perfect safety record on over 1,000 jobs.
              </p>
            </div>

            {/* Team Member 4 */}
            <div className="bg-white bg-opacity-10 p-6 rounded-lg text-center transform transition-all hover:scale-105">
              <div className="relative h-64 w-64 mx-auto mb-6 rounded-full overflow-hidden">
                <Image src="/focused-hvac-tech.png" alt="Carlos Rodriguez" fill style={{ objectFit: "cover" }} />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-texas-orange">Carlos Rodriguez</h3>
              <p className="text-lg mb-4">HVAC Technician</p>
              <p className="text-sm">
                EPA-certified with specialized training in energy efficiency and indoor air quality solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-texas-orange text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <div className="text-5xl font-bold mb-2">3,500+</div>
              <p className="text-xl">Homes Serviced</p>
            </div>
            <div className="p-6">
              <div className="text-5xl font-bold mb-2">98%</div>
              <p className="text-xl">Customer Satisfaction</p>
            </div>
            <div className="p-6">
              <div className="text-5xl font-bold mb-2">12+</div>
              <p className="text-xl">Years in Business</p>
            </div>
            <div className="p-6">
              <div className="text-5xl font-bold mb-2">100%</div>
              <p className="text-xl">Satisfaction Guarantee</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-4 text-center text-texas-blue">Our Battle Plan</h2>
          <p className="text-xl text-center max-w-3xl mx-auto mb-16">
            We approach every job with military precision. Here's how we fight for cleaner air in your home:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="relative">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-texas-orange text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">
                1
              </div>
              <div className="bg-texas-cream p-8 pt-10 rounded-lg shadow-lg h-full">
                <h3 className="text-2xl font-bold mb-4 text-texas-blue">Thorough Inspection</h3>
                <p className="text-lg">
                  We start with a comprehensive evaluation of your entire system, identifying problem areas and
                  developing a customized cleaning plan.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-texas-orange text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">
                2
              </div>
              <div className="bg-texas-cream p-8 pt-10 rounded-lg shadow-lg h-full">
                <h3 className="text-2xl font-bold mb-4 text-texas-blue">Advanced Cleaning</h3>
                <p className="text-lg">
                  Using industrial-grade equipment and EPA-approved cleaning agents, we remove all dust, debris, and
                  contaminants from your system.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-texas-orange text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">
                3
              </div>
              <div className="bg-texas-cream p-8 pt-10 rounded-lg shadow-lg h-full">
                <h3 className="text-2xl font-bold mb-4 text-texas-blue">Final Verification</h3>
                <p className="text-lg">
                  We perform a final inspection with before/after documentation to ensure every part of your system
                  meets our rigorous standards.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/services"
              className="inline-flex items-center bg-texas-blue hover:bg-texas-orange text-white font-bold py-3 px-8 rounded-full text-xl transition-all transform hover:scale-105"
            >
              Explore Our Services <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-texas-blue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Breathe Easier?</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Join the thousands of McKinney families who trust DUCT WARRIORS to fight for their indoor air quality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-texas-orange hover:bg-white hover:text-texas-orange text-white font-bold py-3 px-8 rounded-full text-xl transition-all transform hover:scale-105"
            >
              Get a Free Estimate
            </Link>
            <Link
              href="/services"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-texas-blue text-white font-bold py-3 px-8 rounded-full text-xl transition-all transform hover:scale-105"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
