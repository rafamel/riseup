#!/usr/bin/env node

import process from 'node:process';

import { bootstrap } from 'commitizen/dist/cli/git-cz.js';

import { paths } from '../paths';

process.on('uncaughtException', (err) => {
  console.error(err.message ? `Error: ${err.message}` : err);
  process.exit(1);
});

bootstrap({
  cliPath: paths.commitizenDir,
  // Force cz-conventional-changelog
  config: JSON.parse(process.env.COMMITIZEN_CONFIG || '{}')
});
