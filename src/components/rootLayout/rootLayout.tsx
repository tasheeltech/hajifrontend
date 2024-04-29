import React, { useEffect, useRef, useState } from "react"
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"
import Header from "../header/header"
import { useTranslation } from "react-i18next"
import { LuChevronRightCircle } from "react-icons/lu"

import { IconType } from "react-icons"
import { FaSignOutAlt } from "react-icons/fa"
import { MdGTranslate, MdMessage, MdPrivacyTip } from "react-icons/md"
import { MdCategory } from "react-icons/md"
import { RiHome3Fill } from "react-icons/ri"
import { FaLocationDot } from "react-icons/fa6"
import { RiUserSettingsFill } from "react-icons/ri"
import { BiCategoryAlt, BiHomeAlt2, BiSolidChat } from "react-icons/bi"

interface MyObject {
  name: string
  icon: IconType
  link: string
}

const data: MyObject[] = [
  { name: "language", icon: MdGTranslate, link: "/language" },
  { name: "location", icon: FaLocationDot, link: "/location" },
  { name: "prayer", icon: RiUserSettingsFill, link: "/prayer" },
  { name: "privacy", icon: MdPrivacyTip, link: "/privacy" },
  { name: "logOut", icon: FaSignOutAlt, link: "/" },
]

function RootLayout() {
  const [layout, setLayout] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [selectedMenuItem, setSelectedMenuItem] = useState("/homepage")
  const [direction, setDirection] = useState("ltr")
  const [home, setHome] = useState(true)
  const [chat, setChat] = useState(false)
  const [tools, setTools] = useState(false)

  // const [name, setName] = useState("")

  const location = useLocation()

  const navigate = useNavigate()

  const { t } = useTranslation()

  const menuRef = useRef<HTMLDivElement>(null)

  // const loadedData = useLoaderData() as DefaultLoader
  // const { isoLanguage } = useUserState(loadedData)

  // useEffect(() => {
  //   i18n.changeLanguage(isoLanguage ? isoLanguage.iso : navigator.language)
  //   document.body.dir = i18n.dir()
  // }, [i18n, i18n.language])

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }

  useEffect(() => {
    console.log("pathname")
    if (location.pathname === "/homepage") {
      setHome(true)
      setChat(false)
      setTools(false)
    } else if (location.pathname === "/chat") {
      setChat(true)
      setHome(false)
      setTools(false)
    } else if (
      location.pathname === "/language" ||
      location.pathname === "/location" ||
      location.pathname === "/prayer" ||
      location.pathname === "/privacy"
    ) {
      setChat(false)
      setHome(false)
      setTools(false)
    } else {
      setTools(true)
      setHome(false)
      setChat(false)
    }
  }, [location.pathname])

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

  useEffect(() => {
    setDirection(document.body.dir)
  }, [])

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
                <p className="text-[#4a4a4a] font-medium">{t("menu")}</p>
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
          {/* <div className=" py-1 flex gap-2 items-baseline justify-around w-full bg-white border-t-2">
            <button
              onClick={() => {
                navigate("/homepage")
              }}
              // to={"/tools"}
            >
              <div className="flex flex-col gap-1 items-center justify-center rounded-lg px-4 py-2 max-w-16">
                <div>
                  <RiHome3Fill
                    size={28}
                    color={`${home ? "#51d1a6" : "#a6a6a6"}`}
                  />
                </div>
                <p
                  className={`text-xs font-bold truncate ${
                    home ? "text-[#51d1a6]" : "text-[#a6a6a6]"
                  }`}
                >
                  {t("home")}
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
                  className={`text-xs font-bold truncate ${
                    chat ? "text-[#51d1a6]" : "text-[#a6a6a6]"
                  }`}
                >
                  {t("chat")}
                </p>
              </div>
            </button>
            <button
              onClick={() => {
                navigate("/tools")
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
                  className={`text-xs font-bold truncate ${
                    tools ? "text-[#51d1a6]" : "text-[#a6a6a6]"
                  }`}
                >
                  {t("tools")}
                </p>
              </div>
            </button>
          </div> */}
          <div className="bg-[#eff0f2] relative flex justify-center items-center py-5  text-white font-medium">
            <button
              className="chat btn bg-gradient-to-b from-[#2BCE98] to-[#3AB9D0] flex flex-col justify-center items-center aspect-square h-[72px] absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 rounded-full border-[2px] border-[#373535] text-[10px] "
              onClick={() => {
                navigate("/chat")
              }}
            >
              <BiSolidChat size={24} />
              <p className="truncate">{t("chat")}</p>
            </button>
            <div className="flex items-center ">
              <button
                className={`home btn bg-[#373535] h-14 px-12 flex flex-col justify-center items-center text-[8px] gap-1 w-36 ${
                  document.body.dir === "ltr"
                    ? "rounded-l-[40px] rounded-r-none"
                    : "rounded-r-[40px] rounded-l-none"
                } `}
                onClick={() => {
                  navigate("/homepage")
                }}
              >
                <BiHomeAlt2 size={20} />
                <p className="truncate">{t("home")}</p>
              </button>
              <div className=""></div>
              <button
                className={`tools btn bg-[#373535] h-14 px-12 flex flex-col justify-center items-center text-[8px] gap-1 w-36 ${
                  document.body.dir === "ltr"
                    ? "rounded-r-[40px] rounded-l-none"
                    : "rounded-l-[40px] rounded-r-none"
                }`}
                onClick={() => {
                  navigate("/tools")
                }}
              >
                <BiCategoryAlt size={20} />
                <p className="truncate">{t("tools")}</p>
              </button>
            </div>
          </div>
        </footer>
      )}
    </div>
  )
}

export default RootLayout
