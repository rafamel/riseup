const withPWA = require('next-pwa');
const app = require('./app.config');

// See: https://nextjs.org/docs/api-reference/next.config.js
module.exports = withPWA({
  // Build directory
  distDir: 'build',
  // Clean build directory
  cleanDistDir: true,
  // Public url
  basePath: app.application.url === '/' ? '' : app.application.url,
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
  pwa: {
    // Automatically register Service Worker
    register: true,
    // Destination folder for Service Worker
    dest: 'public',
    // Service Worker scope
    scope: app.application.url,
    // Disable plugin
    disable: process.env.NODE_ENV === 'development' ? true : !app.enablePwa
  },
  images: {
    // Disable image static imports. See: https://bit.ly/3xyLfIO
    disableStaticImages: false,
    // See: https://bit.ly/3qBZ5Jm
    domains: []
  },
  webpack: (config, _options) => ({ ...config })
});
