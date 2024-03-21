import React, { useState } from "react"
import Card from "./card"

interface Place {
  formattedAddress: string
  location: {
    latitude: number
    longitude: number
  }
  rating: number
  regularOpeningHours?: {
    openNow: boolean
  }
  displayName: {
    text: string
    languageCode: string
  }
}

interface MapProps {
  places: Place[]
}

const Map: React.FC<MapProps> = ({ places }) => {
  return (
    <div className="">
      <img
        className="w-full h-[320px] object-cover sticky top-0 shadow-inner"
        src={"/map/map.png"}
        alt=""
        width={100}
        height={100}
      />
      <Card places={places} />
    </div>
  )
}

export default Map
