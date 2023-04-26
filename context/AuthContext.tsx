import { createContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import type { ReactNode } from 'react'

import { NEXT_URL } from '@/config/constants'

interface AuthProvider {
  children: ReactNode
}

interface AuthContext {
  usr: String
  err: String
  register: Function
  login: Function
  logout: Function
}

const defaultValue = {
  usr: '',
  err: '',
  register: () => {},
  login: () => {},
  logout: () => {}
}

export const AuthContext = createContext<AuthContext>(defaultValue)

export default function AuthProvider({ children }: AuthProvider) {
  const router = useRouter()
  const [usr, setUSR] = useState('')
  const [err, setERR] = useState('')

  useEffect(() => {
    checkToken()
  }, [])

  const register = async (
    usr: String,
    email: String,
    pss: String,
    pss2: String
  ) => {
    if (pss2 === pss) {
      const res = await fetch(`${NEXT_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ usr, email, pss })
      })
      const data = await res.json()

      if (res.ok && data?.usr) {
        setUSR(data.usr)
        router.push(`/${data.usr}`)
      } else {
        setERR(data?.message)
      }
    } else {
      setERR('Passwords don`t match')
    }
  }

  const login = async (usr: String, pss: String) => {
    const res = await fetch(`${NEXT_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ usr, pss })
    })
    const data = await res.json()

    if (res.ok && data?.usr) {
      setUSR(data.usr)
      router.push(`/${data.usr}`)
    } else {
      setERR(data?.message)
    }
  }

  const logout = () => {
    router.push('/')
    setUSR('')
  }

  const checkToken = async () => {
    const res = await fetch(`${NEXT_URL}/user`)
    const { usr } = await res.json()

    if (res.ok) {
      setUSR(usr)
      router.push(`/${usr}`)
    }
  }

  return (
    <AuthContext.Provider value={{ usr, err, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
