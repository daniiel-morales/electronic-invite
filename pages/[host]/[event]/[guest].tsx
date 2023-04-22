import { useRouter } from 'next/router'
import Hero from '@/components/Hero'

export default function Invite() {
  const router = useRouter()
  const { host, event, guest } = router?.query
  return (
    <Hero
      title={`${host} te invita a ${event}`}
      description="Ha llegado el momento. Yo viaje queria pero fiesta me van hacer."
      img="/thirteen.svg"
    >
      <h2 className="text-center">{guest}</h2>
      <h4 className="text-center">
        nos encantaria compartir este dia tan especial juntos
      </h4>
      <div className="d-flex mt-4 mb-4">
        <button
          type="button"
          className="btn btn-warning flex-fill"
          onClick={() => router.push(`/${host}/${event}/NOMBRE%20INVITADO`)}
        >
          Confirmar Asistencia
        </button>
      </div>
      <button
        type="button"
        className="btn btn-secondary d-flex align-items-start"
        onClick={() => router.back()}
      >
        {'< Back'}
      </button>
    </Hero>
  )
}
