import { Preset } from '@riseup/utils';
import { Universal } from '@riseup/universal';
import { Web } from '@riseup/web';

import app from '../app.config.mjs';

export default Preset.combine(
  new Universal({
    tarball: {
      // Package tarball file name
      destination: null,
      // Subdirectory to tarball
      contents: null,
      // Enable monorepo dependencies inclusion in tarball
      monorepo: false
    }
  }),
  new Web({
    assets: {
      // Clean all contents of assets destination folder
      clean: true,
      // Destination folder for assets
      destination: 'public',
      // Array of globs for files to copy to assets folder
      copy: ['static/*'],
      // Google fonts to download -see: https://bit.ly/2TREByt
      fonts: app.fonts,
      // Build favicons and manifest
      favicons: {
        // Path of source image
        logo: app.logo,
        // Favicons options
        options: {
          appName: app.manifest.name,
          appShortName: app.manifest.shortName,
          appDescription: app.manifest.description,
          ...app.manifest
        }
      },
      // Summary json
      summary: {
        // Base url for assets
        url: app.application.url,
        // File path for result
        path: 'src/vendor/summary.json',
        // Serializable content
        values: {
          application: app.application,
          manifest: app.manifest,
          breakpoints: app.breakpoints
        }
      }
    },
    explore: {
      // Sources directory for exploration
      dir: 'build/static/chunks'
    },
    size: {
      // Sources directory for size analysis
      dir: 'build/static',
      // Fail when code assets go over the limit
      limit: '512 kB',
      // RegExp of files to exclude
      exclude: /\.map$/
    }
  })
);
