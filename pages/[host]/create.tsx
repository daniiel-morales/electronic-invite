import { useContext, useState } from 'react'
import { useRouter } from 'next/router'

import Hero from '@/components/Hero'
import { NEXT_URL } from '@/config/constants'
import { AuthContext } from '@/context/AuthContext'

export default function AddEvent() {
  const router = useRouter()
  const [name, setNAME] = useState('')
  const [description, setDESC] = useState('')
  const [date, setDATE] = useState(new Date())
  const [img, setIMG] = useState({})
  const [err, setERR] = useState('')
  const { usr } = useContext(AuthContext)

  const today = new Date()
  const currentMonth =
    today.getMonth() + 1 > 9
      ? `${today.getMonth()}`
      : `0${today.getMonth() + 1}`
  const currentDay =
    today.getDay() > 9 ? `${today.getDay()}` : `0${today.getDay()}`

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    const { host } = router?.query

    // TODO: date is wrong
    const evtMonth =
      date.getMonth() > 9 ? `${date.getMonth()}` : `0${date.getMonth()}`
    const evtDay = date.getDay() > 9 ? `${date.getDay()}` : `0${date.getDay()}`

    // TODO: add img, invites, address and link with an update after
    const res = await fetch(`${NEXT_URL}/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        usr,
        name,
        description,
        date: `${date.getFullYear()}-${evtMonth}-${evtDay}`
      })
    })

    if (res.ok) {
      router.push(`/${host}`)
    } else {
      const data = await res.json()
      setERR(data?.message)
    }
  }

  return (
    <Hero title="Nuevo Evento">
      {err && (
        <div className="alert alert-danger" role="alert">
          {err}
        </div>
      )}

      <form className="row g-3" onSubmit={handleSubmit}>
        <label className="form-label" htmlFor="inputIMG">
          Invitacion
        </label>
        <input
          type="file"
          className="form-control"
          id="inputIMG"
          accept="image/*"
          onChange={(e) => setIMG(e?.target?.files ? e.target.files[0] : {})}
        />

        <div className="col-md-6 mb-3">
          <label htmlFor="inputNAME" className="form-label">
            Nombre
          </label>
          <input
            type="text"
            className="form-control"
            id="inputNAME"
            onChange={(e) => setNAME(e.target.value)}
            required
          />
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="inputDATE" className="form-label">
            Fecha
          </label>
          <input
            type="date"
            className="form-control"
            id="inputDATE"
            min={`${today.getFullYear()}-${currentMonth}-${currentDay}`}
            onChange={(e) => setDATE(new Date(e.target.value))}
            required
          />
        </div>

        <label htmlFor="inputDESC" className="form-label">
          Descripcion
        </label>
        <textarea
          className="form-control"
          id="inputDESC"
          onChange={(e) => setDESC(e.target.value)}
          rows={3}
        />

        <div className="d-flex justify-content-end mb-4">
          <button type="submit" className="btn btn-primary">
            Create
          </button>
        </div>
      </form>

      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => router.back()}
      >
        {'< Back'}
      </button>
    </Hero>
  )
}
