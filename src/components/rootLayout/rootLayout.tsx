import React, { useEffect, useRef, useState } from "react"
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"
import Header from "../header/header"
import { useTranslation } from "react-i18next"
import { LuChevronRightCircle } from "react-icons/lu"

import { IconType } from "react-icons"
import { FaSignOutAlt } from "react-icons/fa"
import { MdGTranslate, MdMessage } from "react-icons/md"
import { MdCategory } from "react-icons/md"
import { RiHome3Fill } from "react-icons/ri"
import { FaLocationDot } from "react-icons/fa6"

interface MyObject {
  name: string
  icon: IconType
  link: string
}

const data: MyObject[] = [
  // { name: "home", icon: ImHome, link: "/homepage" },
  // { name: "tawafCalc", icon: FaKaaba, link: "/tawaf" },
  // { name: "saiiCalc", icon: PiMountainsFill, link: "/saii" },
  // { name: "bookmarks", icon: MdBookmarks, link: "/bookmarks" },
  // { name: "emergency", icon: MdEmergencyShare, link: "/emergency" },
  { name: "language", icon: MdGTranslate, link: "/language" },
  { name: "location", icon: FaLocationDot, link: "/location" },
  { name: "logOut", icon: FaSignOutAlt, link: "/" },
]

function RootLayout() {
  const [layout, setLayout] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [selectedMenuItem, setSelectedMenuItem] = useState("/homepage")
  const [home, setHome] = useState(true)
  const [chat, setChat] = useState(false)
  const [tools, setTools] = useState(false)

  // const [name, setName] = useState("")

  const location = useLocation()

  const navigate = useNavigate()

  const { t } = useTranslation()

  const menuRef = useRef<HTMLDivElement>(null)

  // const loadedData = useLoaderData() as DefaultLoader
  // const { name } = useUserState(loadedData)

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }

  // useEffect(() => {
  //   let uName: string
  //   const userInfo = localStorage.getItem("userInfo")
  //   if (userInfo) {
  //     uName = JSON.parse(userInfo).name
  //     setName(uName)
  //   }
  // }, [name, showMenu])

  useEffect(() => {
    setSelectedMenuItem(location.pathname)

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
              <div className="w-full h-16 px-6 py-12 flex justify-between items-center border-b">
                <div></div>
                <p className="text-[#4a4a4a] font-medium">Menu</p>
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
                            setSelectedMenuItem(obj.link)
                            setShowMenu(false)
                          }}
                        >
                          <div
                            className={`flex gap-2 items-center px-5 py-4 rounded-lg font-semibold
                         ${selectedMenuItem === obj.link && "bg-[#e9fbf5]"}
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
      {layout && (
        <footer>
          <div className=" py-1 flex items-baseline justify-around w-full bg-white border-t-2">
            <button
              onClick={() => {
                navigate("/homepage")
                setHome(true)
                setChat(false)
                setTools(false)
              }}
              // to={"/tools"}
            >
              <div className="flex flex-col gap-1 items-center justify-center rounded-lg px-4 py-2 ">
                <div>
                  <RiHome3Fill
                    size={28}
                    color={`${home ? "#51d1a6" : "#a6a6a6"}`}
                  />
                </div>
                <p
                  className={`text-xs font-bold ${
                    home ? "text-[#51d1a6]" : "text-[#a6a6a6]"
                  }`}
                >
                  HOME
                </p>
              </div>
            </button>
            <button
              // onClick={() => {
              //   navigate("/chat")
              // }}
              // onClick={handleChatButtonClick}
              onClick={() => {
                navigate("/chat")
                setChat(true)
                setHome(false)
                setTools(false)
              }}
              // to={"/chat"}
            >
              <div className="flex flex-col gap-1 items-center justify-center  rounded-lg px-4 py-2 ">
                <div>
                  <MdMessage
                    size={26}
                    color={`${chat ? "#51d1a6" : "#a6a6a6"}`}
                  />
                </div>
                <p
                  className={`text-xs font-bold ${
                    chat ? "text-[#51d1a6]" : "text-[#a6a6a6]"
                  }`}
                >
                  CHAT
                </p>
              </div>
            </button>
            <button
              onClick={() => {
                navigate("/tools")
                setTools(true)
                setChat(false)
                setHome(false)
              }}
              // to={"/tools"}
            >
              <div className="flex flex-col gap-1 items-center  justify-center rounded-lg px-4 py-2 ">
                <div>
                  <MdCategory
                    size={28}
                    color={`${tools ? "#51d1a6" : "#a6a6a6"}`}
                  />
                </div>
                <p
                  className={`text-xs font-bold ${
                    tools ? "text-[#51d1a6]" : "text-[#a6a6a6]"
                  }`}
                >
                  TOOLS
                </p>
              </div>
            </button>
          </div>
        </footer>
      )}
    </div>
  )
}

export default RootLayout
