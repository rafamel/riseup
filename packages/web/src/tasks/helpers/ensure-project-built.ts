import fs from 'node:fs';

export function ensureProjectBuilt(dir: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    fs.access(dir, fs.constants.F_OK, (err) => {
      return err
        ? reject(
            new Error(
              `Project must be built before size checks. ` +
                `Directory doesn't exist: ${dir}`
            )
          )
        : resolve();
    });
  });
}
