import { t } from "i18next"
import React from "react"
import { Link } from "react-router-dom"

function Visa() {
  return (
    <div className="flex flex-col justify-between items-center h-full text-center">
      <div></div>
      <p className="max-w-72">
        {t("toKnowVisaQueries")}
      </p>
      <Link to="https://ksavisa.sa/" target="_blank">
        <div className="max-w-60 rounded-lg">
          <img src="/images/visa.png" alt="" className="rounded-t-lg" />
          <p className="bg-[#e9fbf5] text-[#0000EE] text-sm py-2 rounded-b-lg">
            https://ksavisa.sa/
          </p>
        </div>
      </Link>
      <div></div>
    </div>
  )
}

export default Visa
