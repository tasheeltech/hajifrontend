import React from "react"
import { useContext, useEffect } from "react"
import { ImageContext } from "./context"

function LocationImage() {
  const valueFromContext = useContext(ImageContext)

  return (
    <div>
      <img
        src={`/images/${valueFromContext ? valueFromContext : "other"}.jpeg`}
        alt=""
        width={75}
        height={75}
        className="aspect-square rounded-xl"
      />
    </div>
  )
}

export default LocationImage
