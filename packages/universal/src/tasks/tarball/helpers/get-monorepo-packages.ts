import { exec, run, Context } from 'kpo';
import { ensure, Schema } from 'ensurism';

export interface PackageInformation {
  name: string;
  version: string;
  private: boolean;
  location: string;
}

const PACKAGE_INFORMATION_SCHEMA: Schema = {
  type: 'array',
  items: {
    type: 'object',
    required: ['name', 'version', 'private', 'location'],
    properties: {
      name: { type: 'string' },
      version: { type: 'string' },
      private: { type: 'boolean' },
      location: { type: 'string' }
    }
  }
};

export async function getMonorepoPackages(
  context: Context
): Promise<PackageInformation[]> {
  const output = await new Promise<string>((resolve, reject) => {
    run(
      { ...context, args: [] },
      exec(
        'lerna',
        ['list', '--all', '--json', '--loglevel', 'silent'],
        { stdio: ['ignore', 'pipe', 'ignore'] },
        (p) => p.then((x) => resolve(x.stdout)).catch(reject)
      )
    ).catch(reject);
  });

  const first = output.indexOf('[');
  const last = output.lastIndexOf(']');
  const str = output.slice(first, last + 1);
  const arr = JSON.parse(str);

  ensure(arr, PACKAGE_INFORMATION_SCHEMA, { assert: true });
  return arr as PackageInformation[];
}
