import React, { useEffect, useState } from "react"
import i18n from "../i18n"
import { useLoaderData } from "react-router-dom"
import { useUserState } from "../helper/userStateHelper"
import { DefaultLoader } from "../loaders/defaultLoader"
import { useTranslation } from "react-i18next"
import {
  Coordinates,
  CalculationMethod,
  PrayerTimes,
  Prayer,
  Madhab,
} from "adhan"
import moment from "moment-timezone"

interface Location {
  lat: number
  lon: number
}

interface City {
  geo: string
  // Add other properties of the city data here
}

function HomePage() {
  const loadedData = useLoaderData() as DefaultLoader
  const { isoLanguage, madhab, calMethod, setLocation, setCalMethod } =
    useUserState(loadedData)
  const arrayvalue = [
    "UmmAlQura",
    "Egyptian",
    "Karachi",
    "MuslimWorldLeague",
    "Dubai",
    "Qatar",
    "Kuwait",
    "MoonsightingCommittee",
    "Singapore",
    "Turkey",
    "Tehran",
    "NorthAmerica",
  ];

  const [coordinates, setCoordinates] = useState<Coordinates | null>(null)
  // const [remainingTime, setRemainingTime] = useState("");
  // const coordinates = new Coordinates(10.342005, 79.380153);
  // const calMethodValue = calMethod !== null ? parseInt(calMethod) : 4
  //@ts-ignore
  const params = (() => {
    switch (calMethod) {
      case "UmmAlQura":
        return CalculationMethod.UmmAlQura();
      case "Egyptian":
        return CalculationMethod.Egyptian();
      case "Karachi":
        return CalculationMethod.Karachi();
      case "MuslimWorldLeague":
        return CalculationMethod.MuslimWorldLeague();
      case "Dubai":
        return CalculationMethod.Dubai();
      case "Qatar":
        return CalculationMethod.Qatar();
      case "Kuwait":
        return CalculationMethod.Kuwait();
      case "MoonsightingCommittee":
        return CalculationMethod.MoonsightingCommittee();
      case "Singapore":
        return CalculationMethod.Singapore();
      case "Turkey":
        return CalculationMethod.Turkey();
      case "Tehran":
        return CalculationMethod.Tehran();
      case "NorthAmerica":
        return CalculationMethod.NorthAmerica();
      default:
        // Handle the case where calMethodValue is out of range or invalid
        return CalculationMethod.UmmAlQura();
    }
  })();
  console.log(params)
  params.madhab = madhab === "Hanafi" ? Madhab.Hanafi : Madhab.Shafi
  const date = new Date()
  // const prayerTimes = new PrayerTimes(coordinates, date, params);
  const timeZone = moment.tz.guess()
  const currentTime = moment().tz(timeZone)
  console.log(timeZone)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setLocation({ lat: latitude, lng: longitude })
        setCoordinates(new Coordinates(latitude, longitude))
      },
      (error) => {
        console.error("Error getting user location:", error)
        setCoordinates(new Coordinates(24.470901, 39.612236))
      }
    )
  }, [])

  const myLocation: Location = {
    lat: coordinates?.latitude ?? 24.470901,
    lon: coordinates?.longitude ?? 39.612236,
  }
  console.log(myLocation)
  let lowestDistance: number = 99999
  let lowestCity: City | null = null

  function calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    // console.log(lat1,lat2,lon1,lon2)
    const R = 6371 // Radius of the Earth in kilometers
    const dLat = ((lat2 - lat1) * Math.PI) / 180 // Convert degrees to radians
    const dLon = ((lon2 - lon1) * Math.PI) / 180 // Convert degrees to radians
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = R * c // Distance in kilometers
    // console.log(distance)
    return distance
  }

  const [text, setText] = useState<string | undefined>()

  useEffect(() => {
    const load = async function (): Promise<void> {
      try {
        const response = await fetch("/cities.csv")
        const responseText = await response.text()
        // console.log(responseText);
        const cities = responseText
          .trim()
          .split("\n")
          .map((line) => {
            const [name, cc, tz, geolat, geolon] = line.split(",")
            // console.log(name, cc, tz, geolat, geolon);

            // console.log(lat, lon);
            return {
              name,
              cc,
              tz,
              geo: {
                geolat: geolat.substring(1), // Remove first letter from geolat
                geolon, // Remove last letter from geolon
              },
            }
          })
        // console.log(cities);
        let lowestDistance = 99999
        let lowestCity = null

        cities.forEach((city) => {
          const { geolat, geolon } = city.geo
          const parsedGeolat = parseFloat(geolat)
          const parsedGeolon = parseFloat(geolon)

          const distance = calculateDistance(
            parsedGeolat,
            parsedGeolon,
            myLocation.lat,
            myLocation.lon
          )
          // console.log(distance);
          if (distance < lowestDistance) {
            lowestDistance = distance
            console.log(lowestDistance)
            lowestCity = city
          }
        })

        console.log("finished...")
        console.log(lowestCity)
      } catch (error) {
        console.error("Error fetching cities.csv:", error)
      }
    }
    load()
  }, [])

  const prayerTimes = coordinates
    ? new PrayerTimes(coordinates, date, params)
    : null
  console.log(coordinates)

  function prayerName(prayer: any) {
    if (prayer === Prayer.Fajr || prayer === Prayer.None) {
      return "Fajr"
    } else if (prayer === Prayer.Sunrise || Prayer.Dhuhr) {
      return "Dhuhr"
    } else if (prayer === Prayer.Asr) {
      return "Asr"
    } else if (prayer === Prayer.Maghrib) {
      return "Maghrib"
    } else if (prayer === Prayer.Isha) {
      return "Isha"
    }
  }
  const currentPrayer = prayerName(prayerTimes?.currentPrayer()!)
  const prayerDate = moment(date).format("MMMM DD, YYYY")
  const fajrTime = moment(prayerTimes?.fajr).tz(timeZone).format(" h:mm A")
  const fajrMoment = moment(prayerTimes?.fajr).tz(timeZone)
  const sunriseTime = moment(prayerTimes?.sunrise)
    .tz(timeZone)
    .format(" h:mm A")
  const dhuhrTime = moment(prayerTimes?.dhuhr).tz(timeZone).format(" h:mm A")
  const asrTime = moment(prayerTimes?.asr).tz(timeZone).format(" h:mm A")
  const maghribTime = moment(prayerTimes?.maghrib)
    .tz(timeZone)
    .format(" h:mm A")
  const ishaTime = moment(prayerTimes?.isha).tz(timeZone).format(" h:mm A")

  const remainingTime = moment.duration(fajrMoment.diff(currentTime))

  const remainingTimeFormatted = `${Math.floor(
    remainingTime.asHours()
  )} hour : ${remainingTime.minutes()} minutes left`

  const { t } = useTranslation()

  useEffect(() => {
    i18n.changeLanguage(isoLanguage ? isoLanguage.iso : navigator.language)
    document.body.dir = i18n.dir()
  }, [i18n, i18n.language])

  return (
    <div className="flex flex-col justify-between h-full">
      <section className="flex flex-col border-b ">
        <div className="flex flex-col justify-center items-center">
          {/* <p className="text-5xl mt-8">{currentPrayer}</p>
            <p>{remainingTimeFormatted} </p> */}
          <p className="my-4 font-bold">
            {t("prayerTimesFor")} {prayerDate}
          </p>
          <div className="flex flex-col  mb-4">
            <p>
              {t("fajr")}: {fajrTime}
            </p>
            <p>
              {t("sunrise")}: {sunriseTime}
            </p>
            <p>
              {t("duhr")}: {dhuhrTime}
            </p>
            <p>
              {t("asr")}: {asrTime}
            </p>
            <p>
              {t("maghrib")}: {maghribTime}
            </p>
            <p>
              {t("isha")}: {ishaTime}
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
