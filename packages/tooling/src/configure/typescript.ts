import { Serial } from 'type-core';
import { getTypeScriptPath } from '@riseup/utils';
import { paths } from '../paths';

export function configureTypescript(cwd: string): Serial.Object {
  const file = getTypeScriptPath(cwd) || paths.typescript.config;
  return {
    extends: file,
    include: ['./src/**/*'],
    compilerOptions: {
      declaration: true,
      emitDeclarationOnly: true
    }
  };
}
