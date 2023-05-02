import type { Request, Response } from 'express'
import cookie from 'cookie'

import { API_URL } from '@/config/constants'

const create = async (req: Request, res: Response) => {
  if (req.method === 'POST') {
    if (!req.headers.cookie) {
      return res.status(403).json({ message: 'Unauthorized User' })
    }
    const { usr, name, description, date } = req.body
    const { token } = cookie.parse(req.headers.cookie)

    console.log({ host: usr.id, name, description, date })

    const strapiRes = await fetch(`${API_URL}/events`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: { host: usr.id, name, description, date }
      })
    })
    const data = await strapiRes.json()

    if (strapiRes.ok) {
      return res.status(200).json({ evtName: data.slug })
    }
    return res.status(data.error.status).json({ message: data.error.message })
  }
  res.setHeader('Allow', ['POST'])
  return res.status(405).json({ message: 'Method not allowed' })
}

export default create
