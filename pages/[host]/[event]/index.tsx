import { useRouter } from 'next/router'
import Hero from '@/components/Hero'
import { NEXT_URL } from '@/config/constants'

type Guest = {
  name: string
  max: number
  count: number
}

type Hello = {
  guests: Guest[]
}

export default function Hello({ guests }: Hello) {
  const router = useRouter()
  const { host, event } = router.query
  let totalCount: number = 0
  return (
    <Hero title={`${host} tu lista de invitados para ${event}`} img="/next.svg">
      <h2>Confirmados:</h2>
      <ul className="list-group">
        {guests &&
          guests.map((gst) => {
            totalCount += Number(gst.count)
            return (
              <li
                id={`${gst.name}-${gst.count}-${gst.max}`}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {gst.name}
                <div>
                  <span className="badge bg-success">{gst.count}</span>
                  <></>
                  <span className="badge bg-danger">{gst.max - gst.count}</span>
                </div>
              </li>
            )
          })}
      </ul>
      <p className="text-end me-3">
        <>Total: {totalCount}</>
      </p>
      <div className="d-flex justify-content-end mb-4">
        <button
          type="button"
          className="btn btn-warning"
          onClick={() => router.push(`/${host}/${event}/NOMBRE%20INVITADO`)}
        >
          Visualizar Invitacion
        </button>
      </div>

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

export async function getServerSideProps({
  params: { event }
}: {
  params: { event: string }
}) {
  const res = await fetch(`${NEXT_URL}/guests`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ event })
  })
  const { invites: guestsList } = await res.json()

  const guests: Guest[] = guestsList.map(
    (g: { attributes: { name: string; max: number; count: number } }) => {
      return {
        name: g.attributes.name,
        max: g.attributes.max,
        count: g.attributes.count
      }
    }
  )

  return {
    props: {
      guests
    }
  }
}
