import { useState, useContext } from 'react'
import { useRouter } from 'next/router'

import Hero from '@/components/Hero'
import { AuthContext } from '@/context/AuthContext'

export default function Login() {
  const router = useRouter()
  const [usr, setUSR] = useState('')
  const [email, setEMAIL] = useState('')
  const [pss, setPSS] = useState('')
  const [pss2, setPSS2] = useState('')

  const { err, register } = useContext(AuthContext)

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    register(usr, email, pss, pss2)
  }

  return (
    <Hero title="Register">
      {err && (
        <div className="alert alert-danger" role="alert">
          {err}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="inputUSR" className="form-label">
            User Name
          </label>
          <input
            type="text"
            className="form-control"
            id="inputUSR"
            onChange={(e) => setUSR(e.target.value)}
          />
          <label htmlFor="inputEMAIL" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="inputEMAIL"
            onChange={(e) => setEMAIL(e.target.value)}
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
        <div className="mb-3">
          <label htmlFor="inputPSS2" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="inputPSS2"
            onChange={(e) => setPSS2(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
      <button onClick={() => router.push('/login')} className="btn btn-link">
        Login
      </button>
    </Hero>
  )
}
