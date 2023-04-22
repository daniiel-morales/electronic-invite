import Hero from '@/components/Hero'
import { useState } from 'react'

export default function Login() {
  const [id, setID] = useState('')
  const [usr, setUSR] = useState('')
  const [pss, setPSS] = useState('')
  const [pss2, setPSS2] = useState('')

  const handelSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    console.log('REGISTER:')
    console.log({ id, usr, pss })
  }

  return (
    <Hero title="Register">
      <form onSubmit={handelSubmit}>
        <div className="mb-3">
          <label htmlFor="inputID" className="form-label">
            User Name
          </label>
          <input
            type="text"
            className="form-control"
            id="inputID"
            onChange={(e) => setID(e.target.value)}
          />
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
    </Hero>
  )
}
