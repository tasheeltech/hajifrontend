import React, { useEffect, useState } from "react"
import { MdOutlineMessage } from "react-icons/md"
import { TbTools } from "react-icons/tb"
import i18n from "../i18n"
import { useLoaderData, useNavigate } from "react-router-dom"
import { useUserState } from "../helper/userStateHelper"
import { DefaultLoader } from "../loaders/defaultLoader"
import { RxArrowTopRight } from "react-icons/rx"
import { useTranslation } from "react-i18next"

function HomePage() {
  // const [name, setName] = useState("Welcome")

  const { t } = useTranslation()

  const loadedData = useLoaderData() as DefaultLoader
  const { isoLanguage } = useUserState(loadedData)

  useEffect(() => {
    i18n.changeLanguage(isoLanguage ? isoLanguage.iso : navigator.language)
    document.body.dir = i18n.dir()
    // let uName: string
    // const userInfo = localStorage.getItem("userInfo")
    // if (userInfo) {
    //   uName = JSON.parse(userInfo).name
    //   setName(uName)
    // }
  }, [])

  return (
    <div className="flex flex-col justify-between h-full">
      {/* <section className="flex flex-col gap-5 p-6 border-b">
        <p className="font-semibold text-lg text-center">
          {t("welcome")} {name} 😊️
        </p>
        <div className="flex flex-col gap-3">
          <div className="flex gap-4 items-center justify-between px-5 py-4 rounded-[36px] border">
            <p className="text-sm">{t("question1")}</p>
            <div>
              <RxArrowTopRight size={14} />
            </div>
          </div>
          <div className="flex gap-4 items-center justify-between px-5 py-4 rounded-[36px] border">
            <p className="text-sm">{t("question2")}</p>
            <div>
              <RxArrowTopRight size={14} />
            </div>
          </div>
          <div className="flex gap-4 items-center justify-between px-5 py-4 rounded-[36px] border">
            <p className="text-sm">{t("question3")}</p>
            <div>
              <RxArrowTopRight size={14} />
            </div>
          </div>
        </div>
      </section> */}

      
    </div>
  )
}

export default HomePage
