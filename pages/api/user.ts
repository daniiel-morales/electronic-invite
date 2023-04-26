import type { Request, Response } from 'express'
import cookie from 'cookie'

import { API_URL } from '@/config/constants'

export default async (req: Request, res: Response) => {
  if (req.method.includes('GET')) {
    if (!req.headers.cookie) {
      return res.status(403).json({ message: 'Unauthorized User' })
    }
    const { token } = cookie.parse(req.headers.cookie)

    const strapiRes = await fetch(`${API_URL}/users/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const data = await strapiRes.json()

    if (strapiRes.ok) {
      return res.status(200).json({ usr: data.username })
    }
    return res.status(data.error.status).json({ message: data.error.message })
  }
  res.setHeader('Allow', ['GET'])
  return res.status(405).json({ message: 'Method not allowed' })
}
