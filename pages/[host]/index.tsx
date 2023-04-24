import { useRouter } from 'next/router'

import Hero from '@/components/Hero'
import { NEXT_URL } from '@/config/constants'

type Event = {
  name: string
  date: string
}

export default function Host({ events }: { events: Event[] }) {
  const router = useRouter()
  const { host } = router.query

  return (
    <Hero title={`Eventos de ${host}:`} img="/vercel.svg">
      <div className="list-group">
        {events &&
          events.map((evt) => (
            <div className="list-group">
              <button
                onClick={() => router.push(`/${host}/${evt.name}`)}
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

export async function getServerSideProps() {
  const res = await fetch(`${NEXT_URL}/events`)
  const { events: eventsList } = await res.json()

  const events: Event[] = eventsList.map((e: Event) => {
    return { name: e.name, date: e.date }
  })

  return {
    props: {
      events
    }
  }
}
