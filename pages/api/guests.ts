import type { Request, Response } from 'express'

import { API_URL } from '@/config/constants'

export default async (req: Request, res: Response) => {
  if (req.method === 'POST') {
    const { event } = req.body
    const data = await fetch(
      `${API_URL}/events?filter[name][eq]=${event}&populate=invites&fields[0]=id`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
    const info = await data.json()
    const { attributes } = info.data[0]

    return res.status(200).json({ invites: attributes.invites.data })
  }
  res.setHeader('Allow', ['POST'])
  return res.status(405).json({ message: 'Method not allowed' })
}
