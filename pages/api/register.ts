import type { Request, Response } from 'express'
import cookie from 'cookie'

import { API_URL } from '@/config/constants'

const register = async (req: Request, res: Response) => {
  if (req.method.includes('POST')) {
    const { usr, email, pss } = req.body

    const strapiRes = await fetch(`${API_URL}/auth/local/register`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: usr, email: email, password: pss })
    })

    const data = await strapiRes.json()

    if (strapiRes.ok) {
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('token', String(data.jwt), {
          secure: process.env.NODE_ENV !== 'development',
          maxAge: 60 * 60 * 24, // 1 day
          sameSite: 'strict',
          httpOnly: true,
          path: '/'
        })
      )
      return res.status(200).json({ id: data.user.id, usr: data.user.username })
    }
    return res.status(data.error.status).json({ message: data.error.message })
  }
  res.setHeader('Allow', ['POST'])
  return res.status(405).json({ message: 'Method not allowed' })
}

export default register
