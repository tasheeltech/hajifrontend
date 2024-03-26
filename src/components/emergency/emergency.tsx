import { Link } from "react-router-dom"
import { Badge } from "../../../src/ui/badge"
import React from "react"

interface Props {
  toHomepage: () => void
}

function Emergency({ toHomepage }: Props) {
  return (
    <div className="absolute left-0 top-0 h-dvh p-8 w-full flex justify-center items-center z-50 bg-white">
      <div className="absolute right-4 top-4 ">
        <button
          onClick={toHomepage}
          className="text-[#dc6666] border border-[#dc6666] rounded-full aspect-square p-4 w-12 h-12 flex justify-center items-center text-xl"
        >
          X
        </button>
      </div>
      <div className="flex flex-col gap-8 w-full items-stretch">
        <Link to={`tel:997`}>
          <Badge
            variant="outline"
            className="flex items-center justify-center gap-3 py-3 px-6 border-[#2BCE98] border-2 rounded-3xl"
          >
            <img src="/icons/call.svg" alt="" className="w-7" />
            <p className="text-2xl font-medium text-[#2BCE98]">AMBULANCE</p>
          </Badge>
        </Link>
        <Link to={`tel:998`}>
          <Badge
            variant="outline"
            className="flex items-center justify-center gap-3 py-3 px-6 border-[#2BCE98] border-2 rounded-3xl"
          >
            <img src="/icons/call.svg" alt="" className="w-7" />
            <p className="text-2xl font-medium text-[#2BCE98]">FIRE</p>
          </Badge>
        </Link>

        <Link to={`tel:999`}>
          <Badge
            variant="outline"
            className="flex items-center justify-center gap-3 py-3 px-6 border-[#2BCE98] border-2 rounded-3xl"
          >
            <img src="/icons/call.svg" alt="" className="w-7" />
            <p className="text-2xl font-medium text-[#2BCE98]">POLICE</p>
          </Badge>
        </Link>
      </div>
    </div>
  )
}

export default Emergency
