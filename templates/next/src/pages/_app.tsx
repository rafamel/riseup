import Head from 'next/head';
import type { AppProps } from 'next/app';

import reportWebVitals from '../utils/report-web-vitals';
import result from '../vendor/result.json';
import '../styles/globals.scss';

// Measure performance by passing a function
// to log results (ex. `reportWebVitals(console.log)`)
// See: https://bit.ly/3vC0YFn
if (typeof window !== 'undefined') reportWebVitals();

const title = `${result.values.manifest.name} - ${result.values.manifest.description}`;

function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default App;
