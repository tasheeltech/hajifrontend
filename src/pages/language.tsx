import React, { useEffect } from "react"
import CountriesData from "../components/languages/langlist"
import { useTranslation } from "react-i18next"
import { Link, useLoaderData } from "react-router-dom"
import { useUserState } from "../helper/userStateHelper"
import { DefaultLoader } from "../loaders/defaultLoader"

interface Country {
  language: string
  iso: string
  flag: string
}

function Language() {
  const { i18n, t } = useTranslation()
  const loadedData = useLoaderData() as DefaultLoader
  const { isoLanguage, setIsoLanguage } = useUserState(loadedData)

  useEffect(() => {
    console.log(i18n.dir())
    document.body.dir = i18n.dir()
  }, [i18n, i18n.language])

  const handleLanguageSelect = (country: Country) => {
    i18n.changeLanguage(country.iso)
    setIsoLanguage(country)
    console.log(country)
  }

  return (
    <div className="flex flex-col items-center mb-5">
      <h2 className="text text-center my-5 font-semibold">
        {t("selectLanguage")}
      </h2>
      <div>
        {CountriesData.countries.map((country: Country, index: number) => (
          <Link to="/homepage">
            <button
              onClick={() => handleLanguageSelect(country)}
              key={index}
              className="flex"
            >
              <div
                key={index}
                className={`flex min-w-72 items-center gap-6 py-2 px-12 border-2 hover:bg-slate-200 cursor-pointer ${
                  isoLanguage?.language === country.language
                    ? "bg-[#d7fdf1]"
                    : ""
                }`}
              >
                <span className="text-5xl"> {country.flag}</span>
                <span className="text-lg "> {country.language}</span>
              </div>
            </button>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Language
