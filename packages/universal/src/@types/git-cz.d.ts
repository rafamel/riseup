declare module 'commitizen/dist/cli/git-cz.js' {
  interface Environment {
    cliPath?: string;
    config?: {
      path?: string;
    };
  }
  export function bootstrap(environment?: Environment, argv?: string[]): void;
}
