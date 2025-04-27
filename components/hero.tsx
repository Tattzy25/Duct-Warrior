export default function Hero() {
  return (
    <div className="hero-video-container">
      <video className="hero-video" autoPlay muted loop playsInline>
        <source src="/videos/duct-cleaning.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="hero-content">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 font-display">
          Breathe Like a Champion — McKinney's #1 <span className="text-texas-orange">Duct Cleaning Warriors</span>.
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl">
          Since 2010, we've helped 3,500+ families <span className="font-bold">fight back against dirty air</span>. Now
          it's your turn.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a href="#waitlist" className="btn-primary text-xl flex items-center justify-center">
            Join the Clean Air Movement
          </a>
          <a href="#battle-plan" className="btn-secondary text-xl flex items-center justify-center">
            See Our Battle Plan
          </a>
        </div>
      </div>
    </div>
  )
}
