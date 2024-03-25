import React from "react"
import { useContext, useEffect } from "react"
import { ImageContext } from "./context"

function LocationImage() {
  const valueFromContext = useContext(ImageContext)

  return (
    // <div className=" bg-contain w-full h-full">
    <img
      src={`/images/${valueFromContext ? valueFromContext : "other"}.jpeg`}
      alt=""
      width={75}
      height={75}
      className="rounded-xl bg-cover w-full h-full"
    />
    // </div>
  )
}

export default LocationImage
