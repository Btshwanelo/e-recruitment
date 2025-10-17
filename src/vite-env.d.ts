/// <reference types="vite/client" />
declare module '*.md';

// Google Maps API types
declare global {
  interface Window {
    google: typeof google;
  }
}
