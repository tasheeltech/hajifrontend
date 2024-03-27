import React, { useState } from "react"
import { Link } from "react-router-dom"

interface Props {
  toggle: () => void
}

interface MyObject {
  name: string
  icon: string
  link: string
}

const data: MyObject[] = [
  { name: "Tawaf Calculator", icon: "/icons/tawaf.svg", link: "/tawaf" },
  { name: "Saii Calculator", icon: "/icons/saii.svg", link: "/saii" },
  { name: "Emergency", icon: "/icons/emergency.svg", link: "/emergency" },
]

function NavigationMenu({ toggle }: Props) {
  const [selected, setSelected] = useState(false)

  return (
    <div className="h-dvh w-3/4 bg-white absolute top-0 right-0 z-50 shadow-menu overflow-hidden">
      <div className="flex flex-col justify-between h-dvh">
        <div>
          <div className="w-full h-16 px-6 py-12 flex justify-between items-center">
            <button
              onClick={toggle}
              // className="absolute right-4 top-4"
            >
              <img src="/icons/close.svg" alt="" width={24} height={24} />
            </button>
            <p className="font-semibold text-lg">Name</p>
            <div></div>
          </div>
          <div className="px-5">
            <ul className=" flex flex-col gap-2">
              {data.map((obj, index) => (
                <li>
                  <Link
                    to={obj.link}
                    key={index}
                    onClick={() => setSelected(!selected)}
                  >
                    <div
                      className={`px-5 py-4 rounded-lg font-semibold
                       ${selected && "bg-[#e9fbf5]"}
                      `}
                    >
                      <img src={obj.icon} alt="" />
                      <p className="ml-2">{obj.name}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* <div className="border-t-2">
          <div className="py-8"></div>
        </div> */}
      </div>
      <div></div>
    </div>
  )
}

export default NavigationMenu
