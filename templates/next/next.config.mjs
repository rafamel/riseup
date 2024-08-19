import process from 'node:process';

import app from './app.config.mjs';

/** @type {import('next').NextConfig} */
const config = {
  // Build directory
  distDir: process.env.NODE_ENV === 'production' ? 'build' : '.next',
  // Clean build directory
  cleanDistDir: true,
  // Public url
  ...(app.application.url === '/' ? {} : { basePath: app.application.url }),
  // Serve w/ gzip compression. See: https://bit.ly/2SaFIca
  compress: true,
  // Fonts build time inline. See: https://bit.ly/35DbDoS
  optimizeFonts: true,
  // Add trailing slash to url. See: https://bit.ly/3qcndkr
  trailingSlash: false,
  // Enable React strict mode. See: https://bit.ly/3iTCJzL
  reactStrictMode: true,
  // Enable ETag generation. See: https://bit.ly/3cS4gxM
  generateEtags: true,
  // Disable x-powered-by header. See: https://bit.ly/3gOQrBk
  poweredByHeader: false,
  // Enable source maps on production. See: https://bit.ly/3iU0Azm
  productionBrowserSourceMaps: true,
  images: {
    // Disable image static imports. See: https://bit.ly/3xyLfIO
    disableStaticImages: false,
    // See: https://bit.ly/3qBZ5Jm
    domains: []
  },
  webpack: (config, _options) => ({ ...config })
};

export default config;
