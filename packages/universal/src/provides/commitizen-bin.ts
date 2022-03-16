#!/usr/bin/env node

import { bootstrap } from 'commitizen/dist/cli/git-cz.js';
import { paths } from '../paths';

process.on('uncaughtException', (err) => {
  // eslint-disable-next-line no-console
  console.error(err.message ? `Error: ${err.message}` : err);
  process.exit(1);
});

bootstrap({
  cliPath: paths.commitizenDir,
  // Force cz-conventional-changelog
  config: JSON.parse(process.env.COMMITIZEN_CONFIG || '{}')
});
