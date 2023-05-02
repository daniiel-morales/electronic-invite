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

  return (
    <Hero title={`Eventos de ${host}:`} img="/vercel.svg">
      <button
        type="button"
        className="btn btn-success mb-4"
        onClick={() => router.push(`/${host}/create`)}
      >
        Crear Evento
      </button>
      <div className="list-group">
        {events &&
          events.map((evt) => (
            <div key={`${evt.slug}`} className="list-group">
              <button
                onClick={() => router.push(`/${host}/${evt.slug}`)}
                className="list-group-item list-group-item-action list-group-item-light"
              >
                <div className="d-flex justify-content-between">
                  <strong>{evt.name}</strong>
                  <div>
                    <span className="badge bg-success me-2">{evt.date}</span>
                    <strong>{'>>'}</strong>
                  </div>
                </div>
              </button>
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
