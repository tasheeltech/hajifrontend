import React, { useEffect, useState } from "react"
import i18n from "../i18n"
import { useLoaderData } from "react-router-dom"
import { useUserState } from "../helper/userStateHelper"
import { DefaultLoader } from "../loaders/defaultLoader"
import { useTranslation } from "react-i18next"
import { Coordinates, CalculationMethod, PrayerTimes, Prayer } from "adhan"
import moment from "moment-timezone"

function HomePage() {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null)
  // const [remainingTime, setRemainingTime] = useState("");
  // const coordinates = new Coordinates(10.342005, 79.380153);
  const params = CalculationMethod.MoonsightingCommittee()
  const date = new Date()
  // const prayerTimes = new PrayerTimes(coordinates, date, params);
  const timeZone = moment.tz.guess()
  const currentTime = moment().tz(timeZone)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setCoordinates(new Coordinates(latitude, longitude))
      },
      (error) => {
        console.error("Error getting user location:", error)
        setCoordinates(null)
      }
    )
  }, [])

  const prayerTimes = coordinates
    ? new PrayerTimes(coordinates, date, params)
    : null

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

  const [name, setName] = useState("Welcome")

  const { t } = useTranslation()

  const loadedData = useLoaderData() as DefaultLoader
  const { isoLanguage } = useUserState(loadedData)

  useEffect(() => {
    i18n.changeLanguage(isoLanguage ? isoLanguage.iso : navigator.language)
    document.body.dir = i18n.dir()
    let uName: string
    const userInfo = localStorage.getItem("userInfo")
    if (userInfo) {
      uName = JSON.parse(userInfo).name
      setName(uName)
    }
  }, [])

  return (
    <div className="flex flex-col justify-between h-full">
      <section className="flex flex-col border-b ">
        {coordinates === null && (
          <div className="bg-gray-500 bg-opacity-70 flex items-center justify-center">
            <p className="text-white font-bold text-2xl">
              Please grant location permission to show prayer times.
            </p>
          </div>
        )}
        {coordinates && (
          <div className="flex flex-col justify-center items-center">
            <p className="text-5xl mt-8">{currentPrayer}</p>
            <p>{remainingTimeFormatted} </p>
            <p className="my-4 font-bold">Prayer times for {prayerDate}</p>
            <div className="flex flex-col  mb-4">
              <p>Fajr: {fajrTime}</p>
              <p>Sunrise: {sunriseTime}</p>
              <p>Dhuhr: {dhuhrTime}</p>
              <p>Asr: {asrTime}</p>
              <p>Maghrib: {maghribTime}</p>
              <p>Isha: {ishaTime}</p>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}

export default HomePage
