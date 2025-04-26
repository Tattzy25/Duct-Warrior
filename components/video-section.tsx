import ServiceVideo from "./service-video"

export default function VideoSection() {
  const videos = [
    {
      src: "/videos/duct-cleaning.mp4",
      poster: "/images/video-thumbnail-duct.png",
      title: "Professional Air Duct Cleaning",
      description: "See our thorough air duct cleaning process in action.",
    },
    {
      src: "/videos/dryer-vent.mp4",
      poster: "/images/video-thumbnail-dryer.png",
      title: "Dryer Vent Cleaning",
      description: "Watch how we clean dryer vents to prevent fire hazards.",
    },
    {
      src: "/videos/chimney-sweep.mp4",
      poster: "/images/video-thumbnail-chimney.png",
      title: "Chimney Sweeping",
      description: "Our professional chimney cleaning service demonstrated.",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display text-texas-blue">
            See Our Services in Action
          </h2>
          <p className="text-xl max-w-3xl mx-auto text-gray-700">
            Watch our professional technicians deliver legendary service quality
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <ServiceVideo
              key={index}
              src={video.src}
              poster={video.poster}
              title={video.title}
              description={video.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
