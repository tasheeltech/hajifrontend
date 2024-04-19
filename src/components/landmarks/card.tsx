import React from "react"
import { Link } from "react-router-dom"

interface Props {
  sNo: number
  name: string
  map: string
}

function Card({ sNo, name, map }: Props) {
  return (
    <Link to={map} key={sNo} target="_blank">
      <div className="border-b px-6 py-4 flex justify-between">
        <p>
          {sNo}. {name}
        </p>
      </div>
    </Link>
  )
}

export default Card
