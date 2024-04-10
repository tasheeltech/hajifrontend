import React, { useEffect, useState } from "react"
import { BiCurrentLocation } from "react-icons/bi"

import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api"
import { useLoaderData } from "react-router-dom"
import { DefaultLoader } from "../loaders/defaultLoader"
import { useUserState } from "../helper/userStateHelper"
import "../components/location/location.css"

const containerStyle = {
  width: "100%",
  height: "100%",
}

const Location: React.FC = () => {
  const loadedData = useLoaderData() as DefaultLoader
  const { location, setLocation } = useUserState(loadedData)

  // const [center, setCenter] = useState({ lat: 21.4225, lng: 39.8262 })
  const [center, setCenter] = useState(
    location ? location : { lat: 21.4225, lng: 39.8262 }
  )

  // const [points, setPoints] = useState<any>([])

  // eslint-disable-next-line no-use-before-define
  const [map, setMap] = React.useState(null)
  //   const [selectedPlace, setSelectedPlace] = useState<Place | undefined>()

  // useEffect(() => {
  //   // Check if geolocation is supported by the browser
  //   // console.log(places)

  //   // setPoints([])

  //   if (navigator.geolocation) {
  //     // Get the current position
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         const { latitude, longitude } = position.coords
  //         if (center.lat !== latitude || center.lng !== longitude) {
  //           // setTimeout(() => {
  //           const loc = { lat: latitude, lng: longitude }
  //           setCenter(loc)
  //           // }, 50000)
  //         }
  //       },
  //       (error) => {
  //         console.error("Error getting geolocation:", error)
  //       }
  //     )
  //   } else {
  //     console.error("Geolocation is not supported by this browser.")
  //   }
  // }, [])

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_JAVASCRIPT_API!,
  })

  const onLoad = React.useCallback(
    function callback(map: any) {
      // This is just an example of getting and using the map instance!!! don't just blindly copy!
      const bounds = new window.google.maps.LatLngBounds(center)
      map.fitBounds(bounds)

      setMap(map)
    },
    [center]
  )

  const onUnmount = React.useCallback(
    function callback() {
      if (map) {
        setMap(null)
      }
    },
    [map]
  )

  return (
    <div className="flex flex-col">
      <div className="w-full grow h-[100vh] bg-[#F1F1F1] shadow-inner">
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={12}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{
              disableDefaultUI: true,
            }}
            onClick={(e) => {
              console.log("latitide = ", e.latLng!.lat())
              console.log("longitude = ", e.latLng!.lng())
              const lat = e.latLng!.lat()
              const lng = e.latLng!.lng()
              setCenter({ lat, lng })
            }}
          >
            <MarkerF position={center} />
          </GoogleMap>
        ) : (
          <></>
        )}
      </div>
      <button
        className="w-full flex items-center justify-center gap-1 absolute bottom-0 left-0 text-lg bg-[#c3ffeb] p-3 font-semibold active:bg-[#4a7b6b] active:text-white"
        onClick={() => {
          setLocation(center)
          console.log(location)
          alert("Your location has been updated")
        }}
      >
        <BiCurrentLocation size={20} />
        Set Location
      </button>
    </div>
  )
}

export default Location
