import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import SEO from '@/components/SEO'
import AuthProvider from '@/context/AuthContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SEO>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </SEO>
  )
}
