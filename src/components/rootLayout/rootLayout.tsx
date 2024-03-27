import React, { useState } from "react"
import { Link, Outlet } from "react-router-dom"
import Header from "../header/header"

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

function RootLayout() {
  const [showMenu, setShowMenu] = useState(false)
  const [selected, setSelected] = useState(false)

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }
  return (
    <div className="h-dvh flex flex-col">
      {showMenu && (
        <div className="h-dvh w-3/4 bg-white absolute top-0 right-0 z-50 shadow-menu overflow-hidden">
          <div className="flex flex-col justify-between h-dvh">
            <div>
              <div className="w-full h-16 px-6 py-12 flex justify-between items-center">
                <button
                  onClick={toggleMenu}
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
                    <li key={index}>
                      <Link
                        to={obj.link}
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
      )}
      {/* <div className="flex flex-col"> */}
      <div className="border-b">{<Header toggle={toggleMenu} />}</div>
      {/* <Routes>
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/tawaf" element={<TawafCalculator />} />
          <Route path="/saii" element={<SaiiCalculator />} />
          <Route path="/emergency" element={<EmergencyPage />} />
        </Routes> */}

      <main className="grow overflow-scroll no-scrollbar">
        <Outlet />
      </main>
      {/* </div> */}
    </div>
  )
}

export default RootLayout
