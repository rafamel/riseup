const app = require('./app.config');

module.exports = {
  plugins: [
    'next/dist/compiled/postcss-flexbugs-fixes',
    [
      'next/dist/compiled/postcss-preset-env',
      {
        stage: 3,
        autoprefixer: { flexbox: 'no-2009' },
        features: { 'custom-properties': false }
      }
    ],
    [
      'postcss-custom-media',
      {
        importFrom: [].concat({
          customMedia: Object.entries(app.breakpoints).reduce(
            (acc, [key, value]) => ({
              ...acc,
              [`--breakpoint-${key}`]: `(min-width: ${value}px)`
            }),
            {}
          )
        })
      }
    ]
  ]
};
