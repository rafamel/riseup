const pkg = require('./package.json');

module.exports = {
  // Source image for favicons
  logo: 'static/favicon.svg',
  // Enable Progressive Web App capabilities
  enablePwa: true,
  // Enable Google Fonts
  fonts: { Rubik: true, Quicksand: true },
  // Application breakpoints
  breakpoints: { xs: 0, sm: 576, md: 768, lg: 992, xl: 1200 },
  application: {
    // Public url
    url: '/',
    // Application version
    version: pkg.version,
    // Application id
    id: 'id.riseup.template'
  },
  manifest: {
    // Primary language
    lang: 'en-US',
    // Application name
    name: 'React Template Application',
    // Application short name
    shortName: 'React Template',
    // Application description
    description: 'Riseup React template',
    // Display mode: display mode: "fullscreen", "standalone", "minimal-ui" or "browser"
    display: 'standalone',
    // Orientation: "any", "natural", "portrait" or "landscape"
    orientation: 'any',
    // URLs to be considered within an app
    scope: '/',
    // Start URL when launching from a device
    start_url: '.',
    // Used in Android's task switcher
    theme_color: '#ffffff',
    // Background for splash
    background: '#ffffff',
    // Apple status bar:  "black-translucent", "default", "black"
    appleStatusBarStyle: 'default'
  }
};
