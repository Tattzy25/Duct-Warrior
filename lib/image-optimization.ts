// Image optimization utility functions
export const getResponsiveImageSizes = (defaultSize = "100vw") => {
  return {
    sizes: {
      sm: "100vw",
      md: "50vw",
      lg: "33vw",
      xl: "25vw",
      default: defaultSize,
    },
  }
}

export const getImageProps = (src: string, alt: string, priority = false) => {
  return {
    src,
    alt,
    priority,
    loading: priority ? "eager" : "lazy",
    quality: 85,
    ...getResponsiveImageSizes(),
  }
}

// Placeholder blur data URLs for faster loading
export const blurDataUrls = {
  default:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
  testimonial:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkmMnwHwAEEAIV5Xq1fgAAAABJRU5ErkJggg==",
  service:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M/wHwAEBgIApD5fRAAAAABJRU5ErkJggg==",
}
