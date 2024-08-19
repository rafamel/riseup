/* eslint-disable react/no-array-index-key */
import type { Metadata, Viewport } from 'next';

import summary from '@/vendor/summary.json';

import { theme } from '@/views';

export const metadata: Metadata = {
  title: `${summary.values.manifest.name} - ${summary.values.manifest.description}`,
  applicationName: summary.values.manifest.name,
  description: summary.values.manifest.description
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {summary.favicons.meta.map((props, i) => (
          <meta key={i} {...props} />
        ))}
        {summary.favicons.link.map((props, i) => (
          <link key={i} {...props} />
        ))}
        {summary.fonts.link.map((props, i) => (
          <link key={i} {...props} />
        ))}
        <noscript>You need to enable JavaScript to run this web.</noscript>
      </head>
      <body style={theme.styles}>{children}</body>
    </html>
  );
}
