import React, { useEffect, useState } from "react"
import i18n from "../i18n"
import { Link, useLoaderData } from "react-router-dom"
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
import { IoIosArrowDown } from "react-icons/io"
import { RiTimeLine } from "react-icons/ri"
import { FaMapMarkerAlt } from "react-icons/fa"
import { BiSolidTime } from "react-icons/bi"

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
    "MuslimWorldLeague",
    "Egyptian",
    "Karachi",
    "UmmAlQura",
    "Dubai",
    "Qatar",
    "Kuwait",
    "MoonsightingCommittee",
    "Singapore",
    "Turkey",
    "Tehran",
    "NorthAmerica",
  ]

  const [coordinates, setCoordinates] = useState<Coordinates | null>(null)
  // const [remainingTime, setRemainingTime] = useState("");
  // const coordinates = new Coordinates(10.342005, 79.380153);
  // const calMethodValue = calMethod !== null ? parseInt(calMethod) : 4
  //@ts-ignore
  const params = (() => {
    switch (calMethod) {
      case "MuslimWorldLeague":
        return CalculationMethod.MuslimWorldLeague();
      case "Egyptian":
        return CalculationMethod.Egyptian();
      case "Karachi":
        return CalculationMethod.Karachi();
      case "UmmAlQura":
        return CalculationMethod.UmmAlQura();
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
    <div className="bg-[#EFF0F2] h-full">
      <div className="relative h-full">
        <div className="absolute top-0 w-full h-3/5 bg-gradient-to-b from-[#2BCE98] via-[#3AB9D0] to-[#ABDDE6] z-10"></div>
        <div className="absolute bottom-0 w-full h-[70%] bg-[#EFF0F2] rounded-tl-3xl rounded-tr-3xl z-20"></div>
        <div className="relative flex flex-col gap-6 justify-between h-full p-6 z-40">
          <div className="">
            <p className="text-white text-4xl">Assalamu aliakum, Sadiya! 😊</p>
          </div>
          <div className="prayer flex flex-col gap-4 bg-white p-5 rounded-[30px] items-center">
            <div className="top flex justify-between w-full">
              <div className="left">
                <div className="flex items-center gap-[6px]">
                  <BiSolidTime color="#2BCE98" />
                  <p>prayer</p>
                </div>
                <div className="flex items-center gap-[6px]">
                  <div className="w-4"></div>
                  <p>time left</p>
                </div>
              </div>
              <div className="right">
                <div className="flex items-center gap-[6px]">
                  <FaMapMarkerAlt color="#2BCE98" />

                  <p>prayer</p>
                </div>
                <div className="flex items-center gap-[6px]">
                  <div className="w-4"></div>
                  <p>time left</p>
                </div>
              </div>
            </div>
            <div className="h-[2px] w-full bg-[#ACACAC]"></div>
            <div className="timings flex items-center gap-[6px] overflow-x-scroll no-scrollbar">
              <div className="h-[78px] min-w-[58px] bg-[#37353573] flex flex-col justify-between items-center g-2 p-[6px] rounded-sm">
                <p className="text-[10px] text-white">{fajrTime}</p>
                <div>
                  <img src="/mosque.svg" alt="" />
                </div>
                <p className="text-[10px] text-white">{t("fajr")}</p>
              </div>
              <div className="h-[78px] min-w-[58px] bg-[#37353573] flex flex-col justify-between items-center g-2 p-[6px] rounded-sm bg-[#373535]">
                <p className="text-[10px] text-white">4:30</p>
                <div>
                  <img src="/mosque.svg" alt="" />
                </div>
                <p className="text-[10px] text-white">{t("duhr")}</p>
              </div>
              <div className="h-[78px] min-w-[58px] bg-[#37353573] flex flex-col justify-between items-center g-2 p-[6px] rounded-sm">
                <p className="text-[10px] text-white">4:30</p>
                <div>
                  <img src="/mosque.svg" alt="" />
                </div>
                <p className="text-[10px] text-white">{t("asr")}</p>
              </div>
              <div className="h-[78px] min-w-[58px] bg-[#37353573] flex flex-col justify-between items-center g-2 p-[6px] rounded-sm">
                <p className="text-[10px] text-white">4:30</p>
                <div>
                  <img src="/mosque.svg" alt="" />
                </div>
                <p className="text-[10px] text-white">{t("maghrib")}</p>
              </div>
              <div className="h-[78px] min-w-[58px] bg-[#37353573] flex flex-col justify-between items-center g-2 p-[6px] rounded-sm">
                <p className="text-[10px] text-white">4:30</p>
                <div>
                  <img src="/mosque.svg" alt="" />
                </div>
                <p className="text-[10px] text-white">{t("isha")}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between items-center text-center gap-6 rounded-[20px] border border-[#3735353D] px-3 mt-8">
            <div className="flex justify-center items-center rounded-3xl bg-[#373535] min-w-20 h-20 p-[18px] -m-10">
              <img
                src="/HajiAnsariLogoWhite.svg"
                className="min-w-full aspect-square"
                alt=""
              />
            </div>
            <h1 className="pt-10 text-3xl font-bold">Welcome to HajiAnsari</h1>
            <p className="text-[#373535] text px-3">
              HajiAnsari is on a mission to become a true “supporter” of
              pilgrims throughout their Umrah and Hajj journey.
            </p>
            <Link to="/chat" className="flex flex-col items-center pb-2">
              <p className="text-[#0097B2]">Start a new chat</p>
              <IoIosArrowDown color="#0097B2" />
            </Link>
          </div>
          {/* <section className="flex flex-col border-b ">
        <div className="flex flex-col justify-center items-center">
         
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
      </section> */}
        </div>
      </div>
    </div>
  )
}

export default HomePage
