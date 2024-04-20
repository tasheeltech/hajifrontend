import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { Badge } from "../ui/badge"
import { useTranslation } from "react-i18next"
import { IoCall } from "react-icons/io5"
import { CgClose } from "react-icons/cg"

function EmergencyPage() {
  const navigate = useNavigate()

  const { t } = useTranslation()

  return (
    <div className="absolute left-0 top-0 h-dvh p-8 w-full flex justify-center items-center z-50 bg-white">
      <div className="absolute right-4 top-4 ">
        <button
          onClick={() => navigate("/homepage")}
          className=" border bg-[#dc6666] rounded-lg p-[6px] "
        >
          {/* <img src="/icons/exit.svg" alt="" width={28} height={28} /> */}
          <CgClose color="#ffffff" />
        </button>
      </div>
      <div className="flex flex-col gap-8 w-full items-stretch">
        <Link to={`tel:997`}>
          <Badge
            variant="outline"
            className="flex items-center justify-center gap-3 py-3 px-6 border-[#2BCE98] border-2 rounded-3xl"
          >
            {/* <img src="/icons/call.svg" alt="" className="w-7" /> */}
            <IoCall size={28} color="#2BCE98" />
            <p className="text-2xl font-medium text-[#2BCE98]">
              {t("ambulance")}
            </p>
          </Badge>
        </Link>
        <Link to={`tel:998`}>
          <Badge
            variant="outline"
            className="flex items-center justify-center gap-3 py-3 px-6 border-[#2BCE98] border-2 rounded-3xl"
          >
            {/* <img src="/icons/call.svg" alt="" className="w-7" /> */}
            <IoCall size={28} color="#2BCE98" />

            <p className="text-2xl font-medium text-[#2BCE98]">{t("fire")}</p>
          </Badge>
        </Link>

        <Link to={`tel:999`}>
          <Badge
            variant="outline"
            className="flex items-center justify-center gap-3 py-3 px-6 border-[#2BCE98] border-2 rounded-3xl"
          >
            {/* <img src="/icons/call.svg" alt="" className="w-7" /> */}
            <IoCall size={28} color="#2BCE98" />

            <p className="text-2xl font-medium text-[#2BCE98]">{t("police")}</p>
          </Badge>
        </Link>
      </div>
    </div>
  )
}

export default EmergencyPage
