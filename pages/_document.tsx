import { Html, Head, Main, NextScript } from 'next/document'

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
      </body>
    </Html>
  )
}
