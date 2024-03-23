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

const containerStyle = {
  width: "100%",
  height: "100%",
}

const center = {
  lat: -3.745,
  lng: -38.523,
}

const Map: React.FC<MapProps> = ({ places }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_NEXT_PUBLIC_JAVASCRIPT_API!,
  })

  const [map, setMap] = React.useState(null)

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
      <div className="w-full h-80 bg-[#F1F1F1] sticky top-0 shadow-inner">
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            {/* Child components, such as markers, info windows, etc. */}
            <></>
          </GoogleMap>
        ) : (
          <></>
        )}
      </div>
      <Card places={places} />
    </div>
  )
}

export default Map
