import path from "node:path";

import { Universal } from '@riseup/universal';

import pkg from '../packages/package.json' with { type: 'json' };

export default new Universal({
  coverage: {
    // Paths for coverage info files to merge -can be glob patterns.
    files: pkg.workspaces.map(workspace => {
      return path.join(workspace, '/**/coverage/lcov.info')
    }),
    // Path for the merged output file.
    destination: './coverage/lcov.info',
    // Don't error when no input files exist.
    passWithoutFiles: false
  },
  distribute: {
    // Push to remote
    push: true,
    // Package registry
    registry: null,
    // Subdirectory to publish for all packages
    contents: null
  }
});
