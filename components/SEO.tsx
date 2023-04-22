import { ReactNode } from 'react'
import Head from 'next/head'
import Script from 'next/script'

type SEO = {
  title?: string
  description?: string
  icon?: string
  children: ReactNode
}

export default function SEO({
  title,
  description,
  icon = '/favicon.ico',
  children
}: SEO) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={icon} />
        <Script src="@/styles/utils/bootstrap.bundle.min.js" />
      </Head>
      {children}
    </>
  )
}
