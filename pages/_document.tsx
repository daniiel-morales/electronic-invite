import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body
        className="bg-image"
        style={{ backgroundImage: `url(/bg.jpg)`, height: '100vh' }}
      >
        <Main />
        <NextScript />
        <Script src="@/styles/utils/bootstrap.bundle.min.js" />
      </body>
    </Html>
  )
}
