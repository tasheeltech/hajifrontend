import React, { useEffect, useRef, useState } from "react"
import { Link, Outlet, useLoaderData, useLocation } from "react-router-dom"
import Header from "../header/header"
import { useTranslation } from "react-i18next"
import { LuChevronRightCircle } from "react-icons/lu"

import { IconType } from "react-icons"
import { ImHome } from "react-icons/im"
import { FaKaaba, FaSignOutAlt } from "react-icons/fa"
import { PiMountainsFill } from "react-icons/pi"

import { MdBookmarks, MdEmergencyShare, MdGTranslate } from "react-icons/md"

interface MyObject {
  name: string
  icon: IconType
  link: string
}

const data: MyObject[] = [
  { name: "home", icon: ImHome, link: "/homepage" },
  { name: "tawafCalc", icon: FaKaaba, link: "/tawaf" },
  { name: "saiiCalc", icon: PiMountainsFill, link: "/saii" },
  { name: "bookmarks", icon: MdBookmarks, link: "/bookmarks" },
  { name: "emergency", icon: MdEmergencyShare, link: "/emergency" },
  { name: "language", icon: MdGTranslate, link: "/language" },
  { name: "logOut", icon: FaSignOutAlt, link: "/" },
]

function RootLayout() {
  const [layout, setLayout] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [selected, setSelected] = useState("/homepage")
  const [name, setName] = useState("")

  const location = useLocation()

  const { t } = useTranslation()

  const menuRef = useRef<HTMLDivElement>(null)

  // const loadedData = useLoaderData() as DefaultLoader
  // const { name } = useUserState(loadedData)

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }

  useEffect(() => {
    let uName: string
    const userInfo = localStorage.getItem("userInfo")
    if (userInfo) {
      uName = JSON.parse(userInfo).name
      setName(uName)
    }
  }, [name, showMenu])

  useEffect(() => {
    setSelected(location.pathname)

    if (location.pathname !== "/") {
      setLayout(true)
    } else {
      setLayout(false)
    }
  }, [location.pathname])

  useEffect(() => {
    let handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false)
      }
    }

    document.addEventListener("mousedown", handler)

    return () => {
      document.removeEventListener("mousedown", handler)
    }
  })

  return (
    <div className="h-dvh flex flex-col">
      {showMenu && (
        <div
          className="h-dvh w-3/4 bg-white absolute top-0 right-0 z-50 shadow-menu overflow-hidden"
          ref={menuRef}
        >
          <div className="flex flex-col justify-between h-dvh">
            <div>
              <div className="w-full h-16 px-6 py-12 flex justify-between items-center">
                <div></div>
                <p className="font-semibold text-lg">
                  {name ? name : "Welcome"}
                </p>
                <button onClick={toggleMenu}>
                  <LuChevronRightCircle size={24} />
                </button>
              </div>
              <div className="px-5">
                <ul className=" flex flex-col gap-2">
                  {data.map((obj, index) => {
                    const Icon = data[index].icon

                    return (
                      <li key={index}>
                        <Link
                          to={obj.link}
                          onClick={() => {
                            if (obj.link === "/") {
                              localStorage.clear()
                            }
                            setSelected(obj.link)
                            setShowMenu(false)
                          }}
                        >
                          <div
                            className={`flex gap-2 items-center px-5 py-4 rounded-lg font-semibold
                         ${selected === obj.link && "bg-[#e9fbf5]"}
                        `}
                          >
                            <Icon />
                            <p className="ml-2 font-medium">
                              {t(`${obj.name}`)}
                            </p>
                          </div>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      )}

      {layout && (
        <div className="border-b">{<Header toggle={toggleMenu} />}</div>
      )}

      <main className="grow overflow-scroll no-scrollbar">
        <Outlet />
      </main>
    </div>
  )
}

export default RootLayout
