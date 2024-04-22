import React, { useState } from "react"
import { useLoaderData } from "react-router-dom"
import { useUserState } from "../helper/userStateHelper"
import { DefaultLoader } from "../loaders/defaultLoader"
import { t } from "i18next"

function Prayer() {
  const loadedData = useLoaderData() as DefaultLoader
  const { madhab, setMadhab } = useUserState(loadedData)

  function getMadhab() {
    if (madhab === "Hanafi") {
      return false
    } else {
      return true
    }
  }

  const [shafiOrHanafi, setShafiOrHanafi] = useState(() => getMadhab())

  const handleClick = (button: string) => {
    setMadhab(button)
  }

  return (
    <div className="flex flex-col text-center gap-12 justify-center items-center h-full m-6">
      <div>
        <p className="text-2xl font-medium text-[#6a6a6a] ">
          {t("selectMadhab")}
        </p>
      </div>
      <div className="flex gap-6 justify-around w-full">
        <button
          //   className="bg-[#2bce98] text-white font-bold py-2 px-4 rounded mr-4"
          className={`${
            shafiOrHanafi ? "bg-[#0b35276b] text-white" : "bg-[#2BCE986B]"
          } shadow-[0_4px_4px_-1px_rgba(0,0,0,0.5)] rounded-[30px] px-4 py-3 flex items-center justify-center h-12 w-1/2 max-w-40 font-semibold`}
          onClick={() => {
            handleClick("Hanafi")
            setShafiOrHanafi(false)
            console.log(shafiOrHanafi, "hana")
            console.log(madhab)
          }}
        >
          {t("hanafi")}
        </button>
        <button
          //   className="bg-[#2bce98] text-white font-bold py-2 px-4 rounded"
          className={`${
            shafiOrHanafi ? "bg-[#2BCE986B]" : "bg-[#0b35276b] text-white"
          } shadow-[0_4px_4px_-1px_rgba(0,0,0,0.5)] rounded-[30px] px-4 py-3 flex items-center justify-center h-12 w-1/2 max-w-40 font-semibold`}
          onClick={() => {
            handleClick("Shafi")
            setShafiOrHanafi(true)
            console.log(shafiOrHanafi, "shaf")
            console.log(madhab)
          }}
        >
          {t("shafi")}
        </button>
      </div>
    </div>
  )
}

export default Prayer
