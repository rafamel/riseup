import 'react';

declare module 'react' {
  interface CSSProperties extends React.CSSProperties {
    [key: string]: any;
  }
}
