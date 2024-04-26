import React, { useCallback, useRef, useState } from "react"
import { BiCurrentLocation } from "react-icons/bi"

import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api"
import { useLoaderData } from "react-router-dom"
import { DefaultLoader } from "../loaders/defaultLoader"
import { useUserState } from "../helper/userStateHelper"
import "../components/location/location.css"
import { t } from "i18next"

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

  const refMap = useRef<google.maps.Map | null>(null)

  const handleBoundsChanged = () => {
    if (refMap.current) {
      const mapCenter = refMap.current.getCenter()
      console.log(mapCenter)
      setCenter({
        lat: mapCenter!.lat(),
        lng: mapCenter!.lng(),
      })
      console.log(center)
    }
  }

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_JAVASCRIPT_API!,
  })

  const onLoad = React.useCallback(function callback(map: any) {
    const bounds = new window.google.maps.LatLngBounds(center)
    map.fitBounds(bounds)

    refMap.current = map

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback() {
    if (map) {
      setMap(null)
    }
  }, [])

  return (
    <div className="flex flex-col items-stretch h-full relative">
      <div className="bg-[#F1F1F1] shadow-inner h-full ">
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            // center={center}
            zoom={12}
            onLoad={onLoad}
            onUnmount={onUnmount}
            onBoundsChanged={handleBoundsChanged}
            options={{
              disableDefaultUI: true,
            }}
            // onClick={(e) => {
            //   console.log("latitide = ", e.latLng!.lat())
            //   console.log("longitude = ", e.latLng!.lng())
            //   const lat = e.latLng!.lat()
            //   const lng = e.latLng!.lng()
            //   setCenter({ lat, lng })
            // }}
          >
            <MarkerF position={center} />
          </GoogleMap>
        ) : (
          <></>
        )}
      </div>
      <button
        className=" flex items-center justify-center rounded-full px-4 gap-1 border-2 border-[#a3a3a3] absolute bottom-4 right-4 text-sm bg-white p-3 font-semibold active:bg-[#4a7b6b] active:text-white"
        onClick={() => {
          setLocation(center)
          // console.log(location)
          alert("Your location has been updated")
        }}
      >
        <BiCurrentLocation size={16} />
        {t("setLocation")}
      </button>
    </div>
  )
}

export default Location
