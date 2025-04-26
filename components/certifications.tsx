import Image from "next/image"

const certifications = [
  {
    name: "EPA Certified",
    image: "/images/epa-certified.png",
    description: "Certified by the Environmental Protection Agency",
  },
  {
    name: "MNC SG Home Advisor Approved",
    image: "/images/home-advisor.png",
    description: "Approved by MNC SG Home Advisor",
  },
  {
    name: "Elite Service",
    image: "/images/elite-service.png",
    description: "Recognized for providing elite service",
  },
  {
    name: "Winner",
    image: "/images/winner.png",
    description: "Award-winning service provider",
  },
  {
    name: "Top Rated",
    image: "/images/top-rated.png",
    description: "Consistently rated as a top service provider",
  },
  {
    name: "HVAC Certified",
    image: "/images/hvac-certified.png",
    description: "Certified HVAC professionals",
  },
]

export default function Certifications() {
  return (
    <section className="py-20 bg-texas-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display text-texas-blue">Our Certifications</h2>
          <p className="text-xl max-w-3xl mx-auto text-gray-700">
            We're proud to be recognized by these industry-leading organizations.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {certifications.map((cert) => (
            <div
              key={cert.name}
              className="bg-white rounded-xl p-6 shadow-lg flex flex-col items-center justify-center text-center hover:shadow-xl transition-shadow"
            >
              <div className="relative h-24 w-24 mb-4">
                <Image src={cert.image || "/placeholder.svg"} alt={cert.name} fill style={{ objectFit: "contain" }} />
              </div>
              <h3 className="font-bold text-texas-blue">{cert.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
