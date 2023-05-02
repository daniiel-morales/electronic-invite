import type { Request, Response } from 'express'

import { API_URL } from '@/config/constants'

const guests = async (req: Request, res: Response) => {
  if (req.method === 'POST') {
    const { event } = req.body
    const strapiRes = await fetch(
      `${API_URL}/events?filters[slug][$eq]=${event}&populate=invites&fields[0]=invites`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
    const info = await strapiRes.json()
    const { attributes } = info.data[0] ?? {}

    if (strapiRes.ok) {
      return res.status(200).json({ invites: attributes?.invites?.data ?? [] })
    }
    return res.status(304)
  }
  res.setHeader('Allow', ['POST'])
  return res.status(405).json({ message: 'Method not allowed' })
}

export default guests
