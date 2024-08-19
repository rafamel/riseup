import app from './app.config.mjs';

/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    './config/postcss.plugin.cjs': {
      content: Object.entries(app.breakpoints)
        .map(([key, value]) => {
          return `@custom-media --breakpoint-${key} (min-width: ${value}px);`;
        })
        .join('\n')
    },
    'postcss-custom-media': {}
  }
};

export default config;
