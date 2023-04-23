import { createContext, useState } from 'react'
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

  const register = async (id: String, usr: String, pss: String) => {
    console.log('REGISTER:')
    console.log({ id, usr, pss })
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

    if (res.ok) {
      setUSR(data?.usr)
    } else {
      setERR(data?.message)
    }
  }

  const logout = () => {
    router.push('/')
    setUSR('')
  }

  return (
    <AuthContext.Provider value={{ usr, err, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
