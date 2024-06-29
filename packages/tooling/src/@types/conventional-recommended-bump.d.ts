declare module 'conventional-recommended-bump' {
  /** See: https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-recommended-bump#options */
  export interface Options {
    ignoreReverted?: boolean;
    preset?: string;
    config?: any;
    whatBump?: any[];
    tagPrefix?: string;
    lernaPackage?: string;
  }

  export interface Recommendation {
    reason: string;
    releaseType: string;
  }

  export default function bump(
    options: Options,
    fn: (err: Error, recommendation: Recommendation) => void
  ): void;
}
