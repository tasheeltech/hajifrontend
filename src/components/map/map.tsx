import React, { useState } from "react"
import Card from "./card"
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api"

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
  const [map, setMap] = useState<any | null>(null)

  const containerStyle = {
    width: "100%",
    height: "350px",
  }

  const center = {
    lat: -3.745,
    lng: -38.523,
  }

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_JAVASCRIPT_API!,
  })

  const onLoad = React.useCallback(function callback(map: any) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center)
    map.fitBounds(bounds)

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null)
  }, [])

  return (
    <div className="">
      {isLoaded ? (
        <div className="w-full border-b sticky top-0">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            <></>
          </GoogleMap>
        </div>
      ) : (
        <img
          className="w-full h-[350px] object-cover border-b sticky top-0 brightness-[0.25]"
          src={"/map/map.png"}
          alt=""
          width={100}
          height={100}
        />
      )}
      <Card places={places} />
    </div>
  )
}

export default Map
