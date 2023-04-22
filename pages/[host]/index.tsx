import { useRouter } from 'next/router'
import Hero from '@/components/Hero'

type Event = {
  name: string
  date: string
}

export default function Host() {
  const router = useRouter()
  const { host } = router.query
  const events: Event[] = [
    {
      name: 'Mis 15s',
      date: '12-Oct-2023'
    }
  ]
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
