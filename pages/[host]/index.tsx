import { useState } from 'react'
import { useRouter } from 'next/router'
import type { Request } from 'express'

import Hero from '@/components/Hero'
import { NEXT_URL } from '@/config/constants'

type Event = {
  slug: string
  name: string
  date: string
}

export default function Host({ events }: { events: Event[] }) {
  const router = useRouter()
  const { host } = router.query
  const [err, setERR] = useState('')
  const [selectedEvents, setEvents] = useState<string[]>([])

  const handleCheck = (evt: string) => {
    const currentEvents: string[] = []
    if (selectedEvents.indexOf(evt) > -1) {
      // The event name is in the list so we want to remove it
      selectedEvents.splice(currentEvents.indexOf(evt), 1)
    } else {
      // The event name is not in the list so we want to add it
      currentEvents.push(evt)
    }
    setEvents(currentEvents)
  }

  const handleDelete = async () => {
    if (selectedEvents.length > 0) {
      const res = await fetch(`${NEXT_URL}/remove`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          events: selectedEvents
        })
      })

      if (!res.ok) {
        const data = await res.json()
        setERR(data?.message)
      }
    }
  }

  return (
    <Hero title={`Eventos de ${host}:`} img="/vercel.svg">
      {err && (
        <div className="alert alert-danger" role="alert">
          {err}
        </div>
      )}

      <div className="d-flex justify-content-end">
        <button
          type="button"
          className={`btn ${
            selectedEvents.length === 0 ? 'btn-success' : 'btn-secondary'
          } mb-4 me-2 px-3`}
          onClick={() => router.push(`/${host}/create`)}
          disabled={selectedEvents.length > 0}
        >
          <strong>+</strong>
        </button>
        <button
          type="button"
          className={`btn ${
            selectedEvents.length > 0 ? 'btn-danger' : 'btn-secondary'
          } mb-4 px-3`}
          onClick={() => handleDelete()}
          disabled={selectedEvents.length === 0}
        >
          <strong>-</strong>
        </button>
      </div>

      <div className="list-group">
        {events &&
          events.map((evt) => (
            <div key={`${evt.slug}`} className="list-group">
              <div className="d-flex justify-content-between list-group-item list-group-item-action list-group-item-light">
                <div
                  className="form-check py-1"
                  onClick={(e) => handleCheck(e.target?.id)}
                >
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`${evt.slug}`}
                  />
                  <label className="form-check-label" htmlFor={`${evt.slug}`}>
                    <strong>{evt.name}</strong>
                  </label>
                </div>

                <div
                  className="py-1 btn btn-link link-secondary link-offset-2 link-underline link-underline-opacity-0"
                  onClick={() => router.push(`/${host}/${evt.slug}`)}
                >
                  <span className="badge bg-primary me-2">{evt.date}</span>
                  <strong>{'>'}</strong>
                </div>
              </div>
            </div>
          ))}
      </div>
    </Hero>
  )
}

export async function getServerSideProps({
  req,
  params: { host }
}: {
  req: Request
  params: { host: string }
}) {
  if (!req.headers.cookie) {
    return {
      props: {}
    }
  }
  const res = await fetch(`${NEXT_URL}/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ usr: host })
  })
  const { events: eventsList } = await res.json()

  const events: Event[] =
    eventsList?.map((e: Event) => {
      return { slug: e.slug, name: e.name, date: e.date }
    }) ?? []

  return {
    props: {
      events
    }
  }
}
