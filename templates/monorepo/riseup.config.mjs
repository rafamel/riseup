import { Preset } from '@riseup/utils';
import { Monorepo } from '@riseup/monorepo';
import { Universal } from '@riseup/universal';

export default Preset.combine(
  new Monorepo({
    distribute: {
      // Push repository and tags upon distribution (publication)
      push: true,
      // Folder to publish -for all packages
      contents: './',
      // Package registry for publication
      registry: null
    }
  }),
  new Universal({
    lintmd: {
      // Glob of markdown files to lint
      include: './README.md',
      // Markdownlint configuration overrides
      overrides: {}
    },
    release: {
      // Conventional commits preset
      preset: 'angular',
      // Generate changelog upon release (version bump)
      changelog: true
    }
  })
);
