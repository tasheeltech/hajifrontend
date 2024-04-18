import React, { useEffect, useState } from "react";
import { MdOutlineMessage } from "react-icons/md";
import { TbTools } from "react-icons/tb";
import i18n from "../i18n";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useUserState } from "../helper/userStateHelper";
import { DefaultLoader } from "../loaders/defaultLoader";
import { RxArrowTopRight } from "react-icons/rx";
import { useTranslation } from "react-i18next";
import { Coordinates, CalculationMethod, PrayerTimes, Prayer } from "adhan";
import moment from "moment-timezone";

function HomePage() {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  // const coordinates = new Coordinates(10.342005, 79.380153);
  const params = CalculationMethod.MoonsightingCommittee();
  const date = new Date();
  // const prayerTimes = new PrayerTimes(coordinates, date, params);
  const timeZone = moment.tz.guess();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoordinates(new Coordinates(latitude, longitude));
      },
      (error) => {
        console.error("Error getting user location:", error);
        setCoordinates(null);
      }
    );
  }, []);

  const prayerTimes = coordinates
    ? new PrayerTimes(coordinates, date, params)
    : null;

  function prayerName(prayer: any) {
    if (prayer === Prayer.Fajr) {
      return "Fajr";
    } else if (prayer === Prayer.Sunrise) {
      return "Sunrise";
    } else if (prayer === Prayer.Dhuhr) {
      return "Dhuhr";
    } else if (prayer === Prayer.Asr) {
      return "Asr";
    } else if (prayer === Prayer.Maghrib) {
      return "Maghrib";
    } else if (prayer === Prayer.Isha) {
      return "Isha";
    } else if (prayer === Prayer.None) {
      return "None";
    }
  }

  const [name, setName] = useState("Welcome");

  const { t } = useTranslation();

  const loadedData = useLoaderData() as DefaultLoader;
  const { isoLanguage } = useUserState(loadedData);

  useEffect(() => {
    i18n.changeLanguage(isoLanguage ? isoLanguage.iso : navigator.language);
    document.body.dir = i18n.dir();
    let uName: string;
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      uName = JSON.parse(userInfo).name;
      setName(uName);
    }
  }, []);

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
            <p className="my-8 font-bold">
              Prayer times for {moment(date).format("MMMM DD, YYYY")}
            </p>
            <div className="flex flex-col  mb-4">
              <p>
                Fajr: {moment(prayerTimes?.fajr).tz(timeZone).format(" h:mm A")}
              </p>
              <p>
                Sunrise:{" "}
                {moment(prayerTimes?.sunrise).tz(timeZone).format(" h:mm A")}
              </p>
              <p>
                Dhuhr:{" "}
                {moment(prayerTimes?.dhuhr).tz(timeZone).format(" h:mm A")}
              </p>
              <p>
                Asr: {moment(prayerTimes?.asr).tz(timeZone).format(" h:mm A")}
              </p>
              <p>
                Maghrib:{" "}
                {moment(prayerTimes?.maghrib).tz(timeZone).format(" h:mm A")}
              </p>
              <p>
                Isha: {moment(prayerTimes?.isha).tz(timeZone).format(" h:mm A")}
              </p>
              <p>Current Prayer: {prayerName(prayerTimes?.currentPrayer()!)}</p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default HomePage;
