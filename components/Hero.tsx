import Image from 'next/image'
import { ReactNode } from 'react'
import styled from 'styled-components'

type Hero = {
  img?: string
  title: string
  description?: string
  children?: ReactNode
}

const Conta = styled.div`
  width: 18rem;
  margin: 1rem;
`

export default function Hero({ img, title, description, children }: Hero) {
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
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
        </div>
        <div className="container p-5">{children}</div>
      </div>
    </div>
  )
}
