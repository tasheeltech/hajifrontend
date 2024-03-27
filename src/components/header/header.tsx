import React from "react"
import { Link, useNavigate } from "react-router-dom"

interface Props {
  toggle: () => void
}

export default function Header({ toggle }: Props) {
  const navigate = useNavigate()
  return (
    <div className="flex gap-5 items-center justify-between py-3 px-6">
      <div className="flex gap-2 items-center">
        <div onClick={() => navigate("/homepage")}>
          <img src={"HajiAnsariLogo.svg"} alt="" width={48} height={48} />
        </div>

        <div className="flex flex-col gap-1 justify-center">
          <p className="text-xl font-semibold leading-none">HajiAnsari</p>
          <p className="text-[#17CE92] text-xs">Powered by Ansari AI</p>
        </div>
      </div>
      <button onClick={toggle}>
        <img src={"/icons/menu.svg"} alt=" " width={32} height={32} />{" "}
      </button>
    </div>
  )
}
