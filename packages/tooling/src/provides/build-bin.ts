#!/usr/bin/env node

import { Builder } from '../utils';

Builder.deserialize(process.env.BUILDER_SETTINGS || '{}', null)
  .build()
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error(err.message ? `Error: ${err.message}` : err);
    process.exit(1);
  });
