import React from "react"
import { FaLock } from "react-icons/fa6"

function Privacy() {
  return (
    <div className="flex flex-col items-center justify-center px-8 h-full grow gap-12">
      <div className="h-2 w-full flex">
        <div className="bg-[#4F4D3880] w-1/4"></div>
        <div className="bg-[#2BCE9880] w-1/4"></div>
        <div className="bg-[#CE2B6180] w-1/4"></div>
        <div className="bg-[#B2CE2B80] w-1/4"></div>
        <div className="bg-[#472BCE80] w-1/4"></div>
      </div>
      <div className="flex flex-col items-center gap-5">
        <div className="flex items-center gap-3">
          <h1 className="font-semibold text-2xl font-[numbers]">
            Privacy Policy
          </h1>
          <FaLock color="#2bce98" size={20} />
        </div>
        <p className="text-center">
          Our privacy policy is really simple: we don’t collect or store any of
          your data, or track your usage in any way
        </p>
      </div>
      <div className="h-2 w-full flex">
        <div className="bg-[#4F4D3880] w-1/4"></div>
        <div className="bg-[#2BCE9880] w-1/4"></div>
        <div className="bg-[#CE2B6180] w-1/4"></div>
        <div className="bg-[#B2CE2B80] w-1/4"></div>
        <div className="bg-[#472BCE80] w-1/4"></div>
      </div>
      {/* </div> */}
    </div>
  )
}

export default Privacy
