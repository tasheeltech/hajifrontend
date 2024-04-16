import React, { useEffect, useState } from "react"
import CountriesData from "../components/languages/langlist"
import { useTranslation } from "react-i18next"
import { Link, useLoaderData } from "react-router-dom"
import { useUserState } from "../helper/userStateHelper"
import { DefaultLoader } from "../loaders/defaultLoader"
import { IoMdSearch } from "react-icons/io"

interface Country {
  language: string
  iso: string
  flag: string
}

function Language() {
  const { i18n, t } = useTranslation()
  const loadedData = useLoaderData() as DefaultLoader
  const { isoLanguage, setIsoLanguage } = useUserState(loadedData)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    console.log(i18n.dir())
    document.body.dir = i18n.dir()
  }, [i18n, i18n.language])

  const handleLanguageSelect = (country: Country) => {
    i18n.changeLanguage(country.iso)
    setIsoLanguage(country)
    console.log(country)
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const filteredCountries = CountriesData.countries.filter((country: Country) =>
    country.language.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex flex-col items-center">
      <h2 className="text text-center mt-5 font-semibold">
        {t("selectLanguage")}
      </h2>
      <div>
        <div>
          <div className="bg-white sticky top-0 py-5">
            <input
              type="text"
              placeholder="Search language..."
              value={searchTerm}
              onChange={handleSearchChange}
              // className="w-full min-w-72 px-4 py-2 mb-4 sticky top-0 rounded-sm border border-gray-300"
              className="relative max-h-12 min-w-72 border border-[#373535] rounded-sm pl-5 pr-10 py-4 focus:outline-none focus:ring focus:ring-[#2BCE986B] focus:border-[#888888]"
            />
            <IoMdSearch
              size={20}
              color="#373535"
              className="absolute right-4 top-2/4 -translate-y-2/4"
            />
          </div>
          {filteredCountries.map((country: Country, index: number) => (
            <Link to="/homepage">
              <button
                // onClick={onNextStep}
                onClick={() => handleLanguageSelect(country)}
                key={index}
                className="flex"
              >
                <div
                  key={index}
                  // className="flex min-w-72 items-center gap-6 py-2 px-12 border-2 hover:bg-slate-200 cursor-pointer"
                  className={`flex min-w-72 items-center gap-6 py-2 px-12 border-2 hover:bg-slate-200 cursor-pointer ${
                    isoLanguage?.language === country.language
                      ? "bg-[#d7fdf1]"
                      : ""
                  }`}
                  // onClick={handleCountrySelection(country.language)}
                >
                  <span className="text-5xl"> {country.flag}</span>
                  <span className="text-lg "> {country.language}</span>
                </div>
              </button>
            </Link>
          ))}
        </div>
        {/* {CountriesData.countries.map((country: Country, index: number) => (
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
        ))} */}
      </div>
    </div>
  )
}

export default Language
