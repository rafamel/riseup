// eslint-disable-next-line antfu/no-import-node-modules-by-path
import tookitPkg from '../node_modules/es-toolkit/package.json';
import pkg from '../package.json';
import staticsRoot from '@/example/statics/root.json';
import { statics } from '@/example/statics';

export async function main(): Promise<any> {
  return {
    tookitPkg,
    pkg,
    staticsRoot,
    statics: statics(),
    dynamicsRoot: (await import('@/example/dynamics/root.json')).default,
    dynamics: await (await import('@/example/dynamics')).dynamics()
  };
}
