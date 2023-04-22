import { createContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/router'

interface AuthProvider {
  children: ReactNode
}

interface AuthContext {
  usr: String
  register: Function
  login: Function
  logout: Function
}

const defaultValue = {
  usr: '',
  register: () => {},
  login: () => {},
  logout: () => {}
}

export const AuthContext = createContext<AuthContext>(defaultValue)

export default function AuthProvider({ children }: AuthProvider) {
  const router = useRouter()
  const [usr, setUSR] = useState('')

  const register = async (id: String, usr: String, pss: String) => {
    console.log('REGISTER:')
    console.log({ id, usr, pss })
  }

  const login = async (usr: String, pss: String) => {
    console.log('LOGIN:')
    console.log({ usr, pss })
  }

  const logout = () => {
    router.push('/')
    setUSR('')
  }

  return (
    <AuthContext.Provider value={{ usr, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
