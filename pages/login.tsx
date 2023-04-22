import { useState } from 'react'
import { useRouter } from 'next/router'

import Hero from '@/components/Hero'

export default function Login() {
  const router = useRouter()
  const [usr, setUSR] = useState('')
  const [pss, setPSS] = useState('')

  const handelSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    console.log('LOGIN:')
    console.log({ usr, pss })
  }

  return (
    <Hero title="Login">
      <form onSubmit={handelSubmit}>
        <div className="mb-3">
          <label htmlFor="inputUSR" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="inputUSR"
            onChange={(e) => setUSR(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="inputPSS" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="inputPSS"
            onChange={(e) => setPSS(e.target.value)}
          />
        </div>
        <button
          onClick={() => router.push('/register')}
          className="btn btn-link"
        >
          Register
        </button>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </Hero>
  )
}
