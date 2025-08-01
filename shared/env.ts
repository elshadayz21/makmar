// Environment configuration for both client and server
export const env = {
  // Strapi URLs
  STRAPI_IP_DEV: typeof __VITE_STRAPI_IP_DEV__ !== 'undefined' 
    ? __VITE_STRAPI_IP_DEV__ 
    : (typeof process !== 'undefined' ? (process.env.VITE_STRAPI_IP_DEV || 'http://localhost:1337') : 'http://localhost:1337'),
  
  STRAPI_IP_PROD: typeof __VITE_STRAPI_IP_PROD__ !== 'undefined' 
    ? __VITE_STRAPI_IP_PROD__ 
    : (typeof process !== 'undefined' ? (process.env.VITE_STRAPI_IP_PROD || 'http://localhost:1337') : 'http://localhost:1337'),
  
  // Node environment
  NODE_ENV: typeof __NODE_ENV__ !== 'undefined' 
    ? __NODE_ENV__ 
    : (typeof process !== 'undefined' ? process.env.NODE_ENV : 'development'),
  
  // Database URL (server-side only)
  DATABASE_URL: typeof __DATABASE_URL__ !== 'undefined' 
    ? __DATABASE_URL__ 
    : (typeof process !== 'undefined' ? process.env.DATABASE_URL : 'Not Defined'),
  
  // Helper function to get the appropriate Strapi URL based on environment
  getStrapiUrl(): string {
    // Since we're accessing production Strapi data, always use production URL
    const url = this.STRAPI_IP_PROD || this.STRAPI_IP_DEV;
    
    // console.log("🔧 Environment Debug:");
    // console.log("  - NODE_ENV:", this.NODE_ENV);
    // console.log("  - STRAPI_IP_DEV:", this.STRAPI_IP_DEV);
    // console.log("  - STRAPI_IP_PROD:", this.STRAPI_IP_PROD);
    // console.log("  - DATABASE_URL:", this.DATABASE_URL);
    // console.log("  - Selected URL:", url);
    
    return url;
  }
};

// Type declarations for the global variables defined in vite.config.ts
declare global {
  const __VITE_STRAPI_IP_DEV__: string;
  const __VITE_STRAPI_IP_PROD__: string;
  const __NODE_ENV__: string;
  const __DATABASE_URL__: string;
} 