import type { Request, Response } from 'express'
import cookie from 'cookie'

import { API_URL } from '@/config/constants'

const create = async (req: Request, res: Response) => {
  if (req.method === 'DELETE') {
    if (!req.headers.cookie) {
      return res.status(403).json({ message: 'Unauthorized User' })
    }
    const { token } = cookie.parse(req.headers.cookie)
    const { events } = req.body

    const strapiGetRes = await fetch(
      `${API_URL}/events?fields[0]=id&filters[slug][$eq]=${events[0]}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    const { data } = await strapiGetRes.json()

    if (strapiGetRes.ok && data[0]?.id) {
      const strapiDeleteRes = await fetch(`${API_URL}/events/${data[0].id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const data2 = await strapiDeleteRes.json()

      if (!strapiDeleteRes.ok) {
        return res
          .status(data2.error.status)
          .json({ message: data2.error.message })
      }
      return res.status(200).json({ message: 'Success' })
    }
    return res.status(data.error.status).json({ message: data.error.message })
  }
  res.setHeader('Allow', ['POST'])
  return res.status(405).json({ message: 'Method not allowed' })
}

export default create
