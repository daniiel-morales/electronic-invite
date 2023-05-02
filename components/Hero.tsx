import Image from 'next/image'
import { ReactNode, useContext } from 'react'

import { AuthContext } from '@/context/AuthContext'

type Hero = {
  img?: string
  title: string
  description?: string
  children?: ReactNode
}

export default function Hero({ img, title, description, children }: Hero) {
  const { usr, logout } = useContext(AuthContext)
  return (
    <div className="container p-4">
      <div className="card">
        {img && (
          <Image
            src={img}
            className="card-img-top"
            alt="..."
            width={1}
            height={250}
          />
        )}
        {usr?.username && (
          <div className="d-flex justify-content-end">
            <button onClick={() => logout()} className="btn btn-link">
              Logout
            </button>
          </div>
        )}
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
        </div>
        <div className="container p-5">{children}</div>
      </div>
    </div>
  )
}
