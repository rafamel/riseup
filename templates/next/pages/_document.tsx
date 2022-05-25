import Document, { Html, Head, Main, NextScript } from 'next/document';

import result from '@vendor/result.json';

class AppDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang={result.values.manifest.lang.split('-')[0]}>
        <Head>
          <meta charSet="utf8" />
          {result.favicons.meta.map((props, i) => (
            <meta key={i} {...props} />
          ))}
          {result.favicons.link.map((props, i) => (
            <link key={i} {...props} />
          ))}
          {result.fonts.link.map((props, i) => (
            <link key={i} {...props} />
          ))}
          <noscript>You need to enable JavaScript to run this app.</noscript>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default AppDocument;
