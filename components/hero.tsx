export default function Hero() {
  return (
    <div className="hero-video-container">
      <video className="hero-video" autoPlay muted loop playsInline>
        <source src="/videos/duct-cleaning.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="hero-content">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 font-display">
          Dirty Air Ducts? We've Got You Covered in McKinney, TX!
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl">
          Expert Air Duct Cleaning Services in McKinney, TX, and Surrounding Areas
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="/contact"
            className="bg-texas-orange hover:bg-texas-blue text-white font-bold py-3 px-8 rounded-full text-xl transition-all transform hover:scale-105"
          >
            Get a Free Estimate
          </a>
          <a
            href="/services"
            className="bg-white hover:bg-texas-cream text-texas-blue font-bold py-3 px-8 rounded-full text-xl transition-all transform hover:scale-105"
          >
            Our Services
          </a>
        </div>
      </div>
    </div>
  )
}
