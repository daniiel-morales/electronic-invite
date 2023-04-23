import type { Request, Response } from 'express'
import cookie from 'cookie'

export default async (req: Request, res: Response) => {
  if (req.method.includes('POST')) {
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('token', '', {
        secure: process.env.NODE_ENV !== 'development',
        expires: new Date(0),
        sameSite: 'strict',
        httpOnly: true,
        path: '/'
      })
    )
    return res.status(200).json({ message: 'Success' })
  }
  res.setHeader('Allow', ['POST'])
  return res.status(405).json({ message: 'Method not allowed' })
}
