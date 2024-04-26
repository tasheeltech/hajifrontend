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

interface Geo {
  lat: number
  lng: number
}

interface Place {
  city: string
  country: string
}

interface City {
  name: string
  cc: string
  tz: string
  geo: Geo
  // Add other properties of the city data here
}

function HomePage() {
  const loadedData = useLoaderData() as DefaultLoader
  const {
    isoLanguage,
    madhab,
    calMethod,
    location,
    setLocation,
    setCalMethod,
  } = useUserState(loadedData)
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
  ]

  const [coordinates, setCoordinates] = useState<Coordinates | null>(null)
  const [defaultToMadinah, setDefaultToMadinah] = useState(false)
  const [nearestLocation, setNearestLocation] = useState<City | null>()

  const [timeZone, setTimeZone] = useState<string>("")
  const [currentTime, setCurrentTime] = useState<moment.Moment | null>(null)

  const [fajrTime, setFajrTime] = useState<moment.Moment | null>(null)
  const [dhuhrTime, setDhuhrTime] = useState<moment.Moment | null>(null)
  const [asrTime, setAsrTime] = useState<moment.Moment | null>(null)
  const [maghribTime, setMaghribTime] = useState<moment.Moment | null>(null)
  const [ishaTime, setIshaTime] = useState<moment.Moment | null>(null)

  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null)
  const [nextPrayerTime, setNextPrayerTime] = useState<moment.Moment | null>(
    null
  )
  const [nextPrayerName, setNextPrayerName] = useState<string>("")
  const [place, setPlace] = useState<string[]>(["", ""])

  const [temp, setTemp] = useState(false)

  //@ts-ignore
  const params = (() => {
    switch (calMethod) {
      case "UmmAlQura":
        return CalculationMethod.UmmAlQura()
      case "Egyptian":
        return CalculationMethod.Egyptian()
      case "Karachi":
        return CalculationMethod.Karachi()
      case "MuslimWorldLeague":
        return CalculationMethod.MuslimWorldLeague()
      case "Dubai":
        return CalculationMethod.Dubai()
      case "Qatar":
        return CalculationMethod.Qatar()
      case "Kuwait":
        return CalculationMethod.Kuwait()
      case "MoonsightingCommittee":
        return CalculationMethod.MoonsightingCommittee()
      case "Singapore":
        return CalculationMethod.Singapore()
      case "Turkey":
        return CalculationMethod.Turkey()
      case "Tehran":
        return CalculationMethod.Tehran()
      case "NorthAmerica":
        return CalculationMethod.NorthAmerica()
      default:
        // Handle the case where calMethodValue is out of range or invalid
        return CalculationMethod.UmmAlQura()
    }
  })()

  params.madhab = madhab === "Hanafi" ? Madhab.Hanafi : Madhab.Shafi
  // const [defaultToMadinah, setDefaultToMadinah] = useState(false)
  const [remainingHours, setRemainingHours] = useState(0)
  const [remainingMinutes, setRemainingMinutes] = useState(0)

  const date = new Date()

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setLocation({ lat: latitude, lng: longitude })
        // setCoordinates(new Coordinates(41.9029, 12.4534))
        setDefaultToMadinah(false)

        load(latitude, longitude)
        // setCoordinates(new Coordinates(latitude, longitude))
      },
      (error) => {
        console.error("Error getting user location:", error)
        console.log(location, "manual location")
        load(
          location ? location.lat : 24.470901,
          location ? location.lng : 39.612236
        )

        // setCoordinates(new Coordinates(24.470901, 39.612236))
        setDefaultToMadinah(true)
      }
    )
  }, [])

  const { t } = useTranslation()

  useEffect(() => {
    i18n.changeLanguage(isoLanguage ? isoLanguage.iso : navigator.language)
    document.body.dir = i18n.dir()
  }, [i18n, i18n.language])

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setTemp((prevTemp) => !prevTemp)
    }, 60000)

    return () => {
      clearInterval(timerId) // Cleanup function to clear the interval when component unmounts
    }
  }, [])

  // const prayerDate = moment(date).format("MMMM DD, YYYY")

  useEffect(() => {
    i18n.changeLanguage(isoLanguage ? isoLanguage.iso : navigator.language)
    document.body.dir = i18n.dir()
  }, [i18n, i18n.language])

  // const place = timeZone.split("/")

  function extractNumbers(inputString: string): string {
    // Use regular expression to find numbers and decimal points
    const numbersArray = inputString.match(/\d+\.?\d*/g)
    // Join the matches into a single string
    const result = numbersArray ? numbersArray.join("") : ""
    return result
  }

  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    const R = 6371 // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180)
    const dLon = (lon2 - lon1) * (Math.PI / 180)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const d = R * c // Distance in kilometers
    return d
  }

  // useEffect(() => {
  const load = async function (
    userLat: number,
    userLng: number
  ): Promise<void> {
    try {
      const response = await fetch("/cities.csv")
      const responseText = await response.text()

      const cities: City[] = responseText
        .trim()
        .split("\n")
        .map((line) => {
          const [name, cc, tz, latitude, longitude] = line.split(",")

          const lat = latitude ? latitude.substring(1) : "24.46861"
          const lng = extractNumbers(longitude ? longitude : "79.4789")

          return {
            name,
            cc,
            tz,
            geo: {
              lat: parseFloat(lat), // Remove first letter from geolat
              lng: parseFloat(lng), // Remove last letter from geolon
            },
          }
        })

      // Find the nearest city
      let nearestCity: City = {
        name: "Medina",
        cc: "SA",
        tz: "Asia/Riyadh",
        geo: {
          lat: 24.46861,
          lng: 39.61417,
        },
      }
      let minDistance = 99999

      cities.forEach((city) => {
        const distance = calculateDistance(
          userLat,
          userLng,
          city.geo.lat,
          city.geo.lng
        )
        if (distance < minDistance) {
          minDistance = distance
          nearestCity = city
        }
      })

      // Check if nearestCity is null
      if (nearestCity === null) {
        // You can handle this case by informing the user or taking appropriate action
      } else {
        setNearestLocation(nearestCity)
      }
    } catch (error) {
      console.error("Error loading cities data:", error)
    }
  }

  useEffect(() => {
    if (nearestLocation) {
      const nearestCityCoordinates = {
        lat: nearestLocation.geo.lat,
        lng: nearestLocation.geo.lng,
      }

      console.log(nearestCityCoordinates, "nearestCityCoordinates")

      setTimeZone(nearestLocation.tz)
      // const timeNow = moment().tz(timeZone).format('YYYY-MM-DD HH:mm:ss');
      // console.log(timeNow)

      const currentTime = moment().tz(nearestLocation.tz)

      // Format the time as desired
      const formattedTime = currentTime.format("YYYY-MM-DD HH:mm:ss")

      console.log(`Current time in ${timeZone}: ${formattedTime}`)

      // const places = timeZone.split("/")
      const places = nearestLocation.tz.split("/")

      setPlace(places && places)

      // Set current time initially
      // const initialCurrentTime = moment().tz(timeZone)
      const initialCurrentTime = moment().tz(nearestLocation.tz)
      setCurrentTime(initialCurrentTime)

      const prayerTimes = nearestCityCoordinates
        ? new PrayerTimes(
            new Coordinates(
              nearestCityCoordinates.lat,
              nearestCityCoordinates.lng
            ),
            date,
            params
          )
        : new PrayerTimes(new Coordinates(24.46861, 39.61417), date, params)

      setPrayerTimes(prayerTimes)
    }
  }, [nearestLocation])

  useEffect(() => {
    console.log(timeZone, "tz")

    if (timeZone && temp) {
      const initialCurrentTime = moment().tz(timeZone)
      setCurrentTime(initialCurrentTime)
      console.log(currentTime, "2")
    }
  }, [timeZone, temp])

  useEffect(() => {
    if (prayerTimes && currentTime && timeZone) {
      // Convert prayer times to the determined time zone
      setFajrTime(moment(prayerTimes.fajr).tz(timeZone))
      setDhuhrTime(moment(prayerTimes.dhuhr).tz(timeZone))
      setAsrTime(moment(prayerTimes.asr).tz(timeZone))
      setMaghribTime(moment(prayerTimes.maghrib).tz(timeZone))
      setIshaTime(moment(prayerTimes.isha).tz(timeZone))
    }

    if (
      fajrTime &&
      dhuhrTime &&
      asrTime &&
      maghribTime &&
      ishaTime &&
      currentTime &&
      timeZone
    ) {
      let nextPrayerTime: moment.Moment | null = null
      let nextPrayerName: string = ""

      if (currentTime.isBefore(fajrTime)) {
        nextPrayerTime = fajrTime
        nextPrayerName = "Fajr"
      } else if (currentTime.isBefore(dhuhrTime)) {
        nextPrayerTime = dhuhrTime
        nextPrayerName = "Dhuhr"
      } else if (currentTime.isBefore(asrTime)) {
        nextPrayerTime = asrTime
        nextPrayerName = "Asr"
      } else if (currentTime.isBefore(maghribTime)) {
        nextPrayerTime = maghribTime
        nextPrayerName = "Maghrib"
      }
      // else {
      //   nextPrayerTime = ishaTime
      //   nextPrayerName = "Isha"
      // }
      else if (currentTime.isBefore(ishaTime)) {
        nextPrayerTime = ishaTime
        nextPrayerName = "Isha"
      } else {
        // If it's past Isha, then the next prayer will be Fajr of the next day
        nextPrayerTime = moment(prayerTimes?.fajr).add(1, "day").tz(timeZone)
        nextPrayerName = "Fajr"
      }

      // Update next prayer name state
      setNextPrayerTime(nextPrayerTime)
      setNextPrayerName(nextPrayerName)
      // console.log(nextPrayerName, "setNextPrayerName")
      console.log(nextPrayerTime, "nextPrayerTime")
    }
  }, [prayerTimes, temp])

  useEffect(() => {
    console.log("run remaining")
    console.log("currentTime", currentTime)
    console.log("prayerTimes", prayerTimes)

    if (nextPrayerTime && currentTime) {
      const remainingTime = moment.duration(nextPrayerTime.diff(currentTime))
      setRemainingHours(Math.floor(remainingTime.asHours()))
      setRemainingMinutes(remainingTime.minutes())
      // const remainingSeconds = remainingTime.seconds()
      console.log(remainingTime, "remainingTime")
    }
  }, [nextPrayerTime, nextPrayerName, temp])

  //   load()
  // }, [])

  const [name, setName] = useState("")

  useEffect(() => {
    let uName: string
    const userInfo = localStorage.getItem("userInfo")
    if (userInfo) {
      uName = JSON.parse(userInfo).name
      setName(uName)
    }
  }, [])

  return (
    <div className="bg-[#EFF0F2] overflow-y-scroll no-scrollbar h-full">
      <div className="relative h-full">
        <div className="absolute top-0 w-full h-3/5 bg-gradient-to-b from-[#2BCE98] via-[#3AB9D0] to-[#ABDDE6] z-10"></div>
        <div className="absolute bottom-0 w-full h-[70%] bg-[#EFF0F2] rounded-tl-3xl rounded-tr-3xl z-20"></div>
        <div className="relative flex flex-col gap-6 justify-between h-full before:p-1 after:p-1 px-6 z-40">
          <div className="">
            <p className="text-white text-4xl">
              {t("welcome")}, {name} 😊
            </p>
          </div>
          <div className="prayer flex flex-col items-center gap-4 bg-white py-5 px-6 rounded-[30px]">
            <div className="top text-center w-full">
              <div className="top flex justify-between w-full">
                <div className="left">
                  <div className="flex items-center gap-[6px]">
                    <BiSolidTime color="#2BCE98" />
                    <p className="font-semibold">{nextPrayerName}</p>
                  </div>
                  <div className="flex items-center gap-[6px]">
                    <div className="w-4"></div>
                    {/* <p className="text-[#6a6a6a] font-medium">{prayerDate}</p> */}
                    <p className="text-[#6a6a6a] font-medium">{`${remainingHours} hr ${remainingMinutes} mins left`}</p>
                  </div>
                </div>
                <div className="right">
                  <div className="flex items-center gap-[6px]">
                    <FaMapMarkerAlt color="#2BCE98" />

                    <p className="font-semibold">
                      {/* {defaultToMadinah ? "Al Madinah" : place[1]} */}
                      {place[1]}
                    </p>
                  </div>
                  <div className="flex items-center gap-[6px]">
                    <div className="w-4"></div>
                    <p className="text-[#6a6a6a] font-medium">
                      {/* {defaultToMadinah ? "Saudi Arabia" : place[0]} */}
                      {place[0]}
                    </p>
                  </div>
                </div>
              </div>
              {/* <p className="font-bold">
                {t("prayerTimesFor")} {prayerDate}
              </p> */}
            </div>
            <div className="h-[2px] w-full bg-[#ACACAC]"></div>
            <div className="timings w-full flex items-center gap-[6px] text-center overflow-x-scroll no-scrollbar">
              <div
                className={`${
                  nextPrayerName === "Fajr" ? "bg-[#373535]" : "bg-[#37353573]"
                } h-[78px] flex-1 min-w-[57px] flex flex-col justify-between items-center g-2 p-[6px] rounded-sm`}
                // >
                // className="bg-[#373535] h-[78px] flex-1 min-w-[57px] flex flex-col justify-between items-center g-2 p-[6px] rounded-sm"
              >
                <p className="text-[10px] text-white">
                  {fajrTime && fajrTime.format(" h:mm a")}
                </p>
                <div className="w-5">
                  <img src="/mosque.svg" alt="" />
                </div>
                <p className="text-[10px] text-white">{t("fajr")}</p>
              </div>
              <div
                className={`${
                  nextPrayerName === "Dhuhr" ? "bg-[#373535]" : "bg-[#37353573]"
                } h-[78px] flex-1 min-w-[57px] flex flex-col justify-between items-center g-2 p-[6px] rounded-sm`}
                // >
                // className="bg-[#373535] h-[78px] flex-1 min-w-[57px] flex flex-col justify-between items-center g-2 p-[6px] rounded-sm"
              >
                <p className="text-[10px] text-white">
                  {dhuhrTime && dhuhrTime.format(" h:mm a")}
                </p>
                <div className="w-5">
                  <img src="/mosque.svg" alt="" />
                </div>
                <p className="text-[10px] text-white">{t("duhr")}</p>
              </div>
              <div
                className={`${
                  nextPrayerName === "Asr" ? "bg-[#373535]" : "bg-[#37353573]"
                } h-[78px] flex-1 min-w-[57px] flex flex-col justify-between items-center g-2 p-[6px] rounded-sm`}
                // >
                // className="bg-[#373535] h-[78px] flex-1 min-w-[57px] flex flex-col justify-between items-center g-2 p-[6px] rounded-sm"
              >
                <p className="text-[10px] text-white">
                  {asrTime && asrTime.format(" h:mm a")}
                </p>
                <div className="w-5">
                  <img src="/mosque.svg" alt="" />
                </div>
                <p className="text-[10px] text-white">{t("asr")}</p>
              </div>
              <div
                className={`${
                  nextPrayerName === "Maghrib"
                    ? "bg-[#373535]"
                    : "bg-[#37353573]"
                } h-[78px] flex-1 min-w-[57px] flex flex-col justify-between items-center g-2 p-[6px] rounded-sm`}
                // >
                // className="bg-[#373535] h-[78px] flex-1 min-w-[57px] flex flex-col justify-between items-center g-2 p-[6px] rounded-sm"
              >
                <p className="text-[10px] text-white">
                  {maghribTime && maghribTime.format(" h:mm a")}
                </p>
                <div className="w-5">
                  <img src="/mosque.svg" alt="" />
                </div>
                <p className="text-[10px] text-white">{t("maghrib")}</p>
              </div>
              <div
                className={`${
                  nextPrayerName === "Isha" ? "bg-[#373535]" : "bg-[#37353573]"
                } h-[78px] flex-1 min-w-[57px] flex flex-col justify-between items-center g-2 p-[6px] rounded-sm`}
                // >
                // className="bg-[#373535] h-[78px] flex-1 min-w-[57px] flex flex-col justify-between items-center g-2 p-[6px] rounded-sm"
              >
                <p className="text-[10px] text-white">
                  {ishaTime && ishaTime.format(" h:mm a")}
                </p>
                <div className="w-5">
                  <img src="/mosque.svg" alt="" />
                </div>
                <p className="text-[10px] text-white">{t("isha")}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between items-center text-center gap-6 rounded-[20px] border border-[#3735353D] px-3 mt-8">
            <div className="flex justify-center items-center rounded-3xl bg-[#373535] w-[72px] h-[72px] p-[14px] -m-[38px]">
              <img
                src="/HajiAnsariLogoWhite.svg"
                className="min-w-full aspect-square"
                alt=""
              />
            </div>
            <h1 className="pt-10 text-3xl font-bold">{t("homeWelcome")}</h1>
            <p className="text-[#373535] text px-3">{t("homePara")}</p>
            <Link to="/chat" className="flex flex-col items-center pb-2">
              <p className="text-[#0097B2]">{t("startChat")}</p>
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
