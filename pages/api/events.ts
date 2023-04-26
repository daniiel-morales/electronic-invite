import type { Request, Response } from 'express'

import { API_URL } from '@/config/constants'

export default async (req: Request, res: Response) => {
  if (req.method === 'POST') {
    const usr = req.body
    const data = await fetch(
      `${API_URL}/users?populate=events&fields[0]=username&filter[username][eq]=${usr}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
    const info = await data.json()
    const { events } = info[0]

    return res.status(200).json({ events })
  }
  res.setHeader('Allow', ['POST'])
  return res.status(405).json({ message: 'Method not allowed' })
}
