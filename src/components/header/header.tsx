import React from "react"

export default function Header() {
  return (
    <div className=" flex gap-5 items-center justify-between py-4 px-6">
      <div className="flex gap-4 items-center">
        <img src={"HajiAnsariLogo.svg"} alt="" width={48} height={48} />

        <div className="flex flex-col gap-2 justify-center">
          <p className="text-xl font-semibold leading-none">HajiAnsari</p>
          <p className="text-[#17CE92] text-xs">Powered by Ansari AI</p>
        </div>
      </div>
      <div className="">
        <img src={"/icons/shareIcon.svg"} alt=" " width={24} height={24} />{" "}
      </div>
    </div>
  )
}
