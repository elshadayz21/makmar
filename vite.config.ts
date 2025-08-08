import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
// import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { config } from "dotenv";

// Load environment variables from .env file
config();

export default defineConfig({
  plugins: [
    react(),
    // runtimeErrorOverlay(),
    // ...(process.env.NODE_ENV !== "production" &&
    // process.env.REPL_ID !== undefined
    //   ? [
    //       await import("@replit/vite-plugin-cartographer").then((m) =>
    //         m.cartographer(),
    //       ),
    //     ]
    //   : []),
  ],
  define: {
    // Make environment variables available to the client
    __VITE_STRAPI_IP_DEV__: JSON.stringify(process.env.VITE_STRAPI_IP_DEV),
    __VITE_STRAPI_IP_PROD__: JSON.stringify(process.env.VITE_STRAPI_IP_PROD || "https://makmar-strapi.onrender.com"),
    __NODE_ENV__: JSON.stringify(process.env.NODE_ENV || "development"),
    __DATABASE_URL__: JSON.stringify(process.env.DATABASE_URL || "Not Defined"),
  },
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
      // outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
  },
  
  server: {
    host: true, // 👈 allows LAN access (good)
    fs: {
      strict: true,
      deny: ['**/.*'],
    },
    proxy: {
      '/api': {
        target: process.env.VITE_STRAPI_IP_DEV || '',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
