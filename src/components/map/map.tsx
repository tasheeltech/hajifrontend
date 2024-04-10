import React, { useEffect, useState } from "react"
import Card from "./card"
import {
  GoogleMap,
  InfoWindowF,
  MarkerF,
  useJsApiLoader,
} from "@react-google-maps/api"
import { useLoaderData } from "react-router-dom"
import { DefaultLoader } from "../../../src/loaders/defaultLoader"
import { useUserState } from "../../../src/helper/userStateHelper"

type MapProps = {
  places: {
    formattedAddress: string
    internationalPhoneNumber: string
    googleMapsUri: string
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
  }[]
}

type Place = {
  formattedAddress: string
  internationalPhoneNumber: string
  googleMapsUri: string
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

const containerStyle = {
  width: "100%",
  height: "100%",
}

const Map: React.FC<MapProps> = ({ places }) => {
  const loadedData = useLoaderData() as DefaultLoader
  const { location } = useUserState(loadedData)

  // const [center, setCenter] = useState({ lat: 21.4225, lng: 39.8262 })
  const [center, setCenter] = useState(
    location ? location : { lat: 21.4225, lng: 39.8262 }
  )
  // const [points, setPoints] = useState<any>([])

  // eslint-disable-next-line no-use-before-define
  const [map, setMap] = React.useState(null)
  const [selectedPlace, setSelectedPlace] = useState<Place | undefined>()

  useEffect(() => {
    // Check if geolocation is supported by the browser
    console.log(places)

    // setPoints([])

    if (navigator.geolocation) {
      // Get the current position
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          if (center.lat !== latitude || center.lng !== longitude) {
            // setTimeout(() => {
            const loc = { lat: latitude, lng: longitude }
            setCenter(loc)
            // }, 50000)
          }
        },
        (error) => {
          console.error("Error getting geolocation:", error)
        }
      )
    } else {
      console.error("Geolocation is not supported by this browser.")
    }
  }, [center, places])

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
    <div className="">
      <div className="w-full h-[40vh] bg-[#F1F1F1] sticky top-0 shadow-inner">
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={12}
            onLoad={onLoad}
            onUnmount={onUnmount}
            onClick={(e) => {
              console.log("latitide = ", e.latLng!.lat())
              console.log("longitude = ", e.latLng!.lng())
            }}
          >
            <MarkerF position={center} />

            {places.map((place, id) => {
              return (
                <MarkerF
                  key={id}
                  onClick={() => {
                    place === selectedPlace
                      ? setSelectedPlace(undefined)
                      : setSelectedPlace(place)
                  }}
                  position={{
                    lat: place.location.latitude,
                    lng: place.location.longitude,
                  }}
                />
              )
            })}
            {selectedPlace && (
              <InfoWindowF
                position={{
                  lat: selectedPlace.location.latitude,
                  lng: selectedPlace.location.longitude,
                }}
                zIndex={1}
                onCloseClick={() => setSelectedPlace(undefined)}
              >
                <div>
                  <h3>{selectedPlace.displayName.text}</h3>
                  <p>{selectedPlace.formattedAddress}</p>
                </div>
              </InfoWindowF>
            )}
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
