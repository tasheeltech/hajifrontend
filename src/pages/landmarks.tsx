import React, { useEffect, useRef, useState } from "react"
import { BiCurrentLocation } from "react-icons/bi"

import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api"
import { useLoaderData } from "react-router-dom"
import { DefaultLoader } from "../loaders/defaultLoader"
import { useUserState } from "../helper/userStateHelper"
import "../components/location/location.css"
import Card from "../components/landmarks/card"
import LandmarksData from "../components/landmarks/landmarksList"

interface Location {
  place: string
  latitude: number
  longitude: number
  googleMapsUri: string
}

const containerStyle = {
  width: "100%",
  height: "100%",
}

const Landmarks: React.FC = () => {
  const loadedData = useLoaderData() as DefaultLoader
  const { location, setLocation } = useUserState(loadedData)

  // const [center, setCenter] = useState({ lat: 21.4225, lng: 39.8262 })
  //   const [center, setCenter] = useState(
  //     location ? location : { lat: 21.4225, lng: 39.8262 }
  //   )

  const [makkah, setMakkah] = useState(true)
  const [center, setCenter] = useState({ lat: 21.4225, lng: 39.8262 })
  const [data, setData] = useState<Location[]>(LandmarksData.Makkah)
  console.log(data)

  useEffect(() => {
    if (makkah) {
      setCenter({ lat: 21.4225, lng: 39.8262 })
      setData(LandmarksData.Makkah)
    } else {
      setCenter({ lat: 24.470901, lng: 39.612236 })
      setData(LandmarksData.Madinah)
    }
  }, [makkah])

  //   const data = makkah ? LandmarksData.Makkah : LandmarksData.Madinah

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

  //   const refMap = useRef<google.maps.Map | null>(null)

  //   const handleBoundsChanged = () => {
  //     if (refMap.current) {
  //       const mapCenter = refMap.current.getCenter()
  //       console.log(mapCenter)
  //       setCenter({
  //         lat: mapCenter!.lat(),
  //         lng: mapCenter!.lng(),
  //       })
  //       console.log(center)
  //     }
  //   }

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_JAVASCRIPT_API!,
  })

  const onLoad = React.useCallback(function callback(map: any) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    // const bounds = new window.google.maps.LatLngBounds(center)
    // map.fitBounds(bounds)

    // refMap.current = map

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback() {
    if (map) {
      setMap(null)
    }
  }, [])

  return (
    <div className="flex flex-col items-stretch relative ">
      {/* <div className="bg-[#F1F1F1] shadow-inner h-full "> */}
      <div className="sticky top-0">
        <div className="flex justify-around my-4 sticky top-0">
          <button
            onClick={() => setMakkah(true)}
            className={`${
              makkah ? "bg-[#2BCE986B]" : "bg-[#0b35276b] text-white"
            } shadow-[0_4px_4px_-1px_rgba(0,0,0,0.5)] rounded-[30px] px-4 py-3 flex items-center justify-center h-12 w-1/2 max-w-40 font-semibold`}
          >
            Makkah
          </button>
          <button
            onClick={() => {
              setMakkah(false)
            }}
            className={`${
              makkah ? "bg-[#0b35276b] text-white" : "bg-[#2BCE986B]"
            } shadow-[0_4px_4px_-1px_rgba(0,0,0,0.5)] rounded-[30px] px-4 py-3 flex items-center justify-center h-12 w-1/2 max-w-40 font-semibold`}
          >
            Madinah
          </button>
        </div>
        <div className="bg-[#F1F1F1] shadow-inner h-[45vh]">
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={12}
              onLoad={onLoad}
              onUnmount={onUnmount}
              // onBoundsChanged={handleBoundsChanged}
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
              {data.map((place, id) => {
                return (
                  <MarkerF
                    key={id}
                    onClick={() => {
                      // place === selectedPlace
                      //   ? setSelectedPlace(undefined)
                      //   : setSelectedPlace(place)
                    }}
                    position={{
                      lat: place.latitude,
                      lng: place.longitude,
                    }}
                  />
                )
              })}
            </GoogleMap>
          ) : (
            <></>
          )}
        </div>
      </div>

      <div>
        {data.map((location: Location, index: number) => {
          return (
            <div>
              <Card
                sNo={index + 1}
                name={location.place}
                map={location.googleMapsUri}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Landmarks
