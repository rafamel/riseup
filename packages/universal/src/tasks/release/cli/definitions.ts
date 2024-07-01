export interface CLIReleaseOptions {
  bump: string | null;
  preid: string | null;
  push: boolean;
  verify: boolean;
  interactive: boolean;
  conventional: ConventionalOptions | null;
}

export interface ConventionalOptions {
  preset: string;
  changelog: boolean;
}

export const bumps = [
  'major',
  'minor',
  'patch',
  'premajor',
  'preminor',
  'prepatch',
  'prerelease'
];
