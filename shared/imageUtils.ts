import { env } from "./env";

// Utility function to get the full URL for Strapi images
export function getStrapiImageUrl(imageUrl: string): string {
  if (!imageUrl) {
    console.log("🔧 Image URL is empty");
    return "";
  }
  
  console.log("🔧 Image URL Processing:", { originalUrl: imageUrl });
  
  try {
    // If the URL is already absolute, return it as is
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      console.log("🔧 Image URL is already absolute:", imageUrl);
      return imageUrl;
    }
    
    // If it's a relative URL, prepend the Strapi base URL
    const baseUrl = env.getStrapiUrl();
    const fullUrl = `${baseUrl}${imageUrl}`;
    console.log("🔧 Image URL processed:", { baseUrl, fullUrl });
    return fullUrl;
  } catch (error) {
    console.error("🔧 Error processing image URL:", error);
    return imageUrl; // Return original URL if processing fails
  }
}

// Utility function to process Strapi image formats
export function processImageFormats(imageData: any, baseUrl?: string): any {
  if (!imageData) return null;
  
  console.log("🔧 Processing image data:", { imageData });
  
  const strapiBaseUrl = baseUrl || env.getStrapiUrl();
  
  // Process the main image URL
  const processedImage: any = {
    id: imageData.id || "",
    name: imageData.name || "",
    alternativeText: imageData.alternativeText || "",
    url: getStrapiImageUrl(imageData.url),
    formats: {}
  };
  
  // Process image formats if they exist
  if (imageData.formats) {
    const formats = ['thumbnail', 'large', 'medium', 'small'];
    
    formats.forEach(format => {
      if (imageData.formats[format]) {
        processedImage.formats[format] = {
          name: imageData.formats[format].name || "",
          url: getStrapiImageUrl(imageData.formats[format].url),
          width: imageData.formats[format].width || 0,
          height: imageData.formats[format].height || 0,
        };
      }
    });
  }
  
  console.log("🔧 Processed image:", processedImage);
  return processedImage;
}

// Utility function to process an array of images
export function processImageArray(images: any[], baseUrl?: string): any[] {
  if (!Array.isArray(images)) return [];
  
  return images.map(image => processImageFormats(image, baseUrl));
} 