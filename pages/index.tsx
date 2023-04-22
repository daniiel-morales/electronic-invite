import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()
  return (
    <main>
      <button onClick={() => router.push('/login')} className="btn btn-link">
        Login
      </button>
      <button onClick={() => router.push('/register')} className="btn btn-link">
        Register
      </button>
    </main>
  )
}
