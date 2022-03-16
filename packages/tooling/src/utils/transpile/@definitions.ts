export declare namespace Transpile {
  type Loaders = { [extensions: string]: Loader };
  type JSX = { factory?: string; fragment?: string };
  type Platform = 'node' | 'browser' | 'neutral';
  type Loader =
    | 'js'
    | 'jsx'
    | 'ts'
    | 'tsx'
    | 'json'
    | 'text'
    | 'file'
    | 'base64'
    | 'binary';
}
