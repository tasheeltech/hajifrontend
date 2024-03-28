import React, { useEffect, useRef, useState } from "react"
import { Link, Outlet, useLocation } from "react-router-dom"
import Header from "../header/header"

interface MyObject {
  name: string
  icon: string
  link: string
}

const data: MyObject[] = [
  { name: "Home", icon: "/icons/home.svg", link: "/homepage" },
  { name: "Tawaf Calculator", icon: "/icons/tawaf.svg", link: "/tawaf" },
  { name: "Saii Calculator", icon: "/icons/saii.svg", link: "/saii" },
  { name: "Emergency", icon: "/icons/emergency.svg", link: "/emergency" },
]

function RootLayout() {
  const [layout, setLayout] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [selected, setSelected] = useState("/homepage")
  const [name, setName] = useState("Welcome")

  const location = useLocation()

  const menuRef = useRef<HTMLDivElement>(null)

  // const loadedData = useLoaderData() as DefaultLoader
  // const { name } = useUserState(loadedData)

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }

  const formatName = (name: string): string => {
    const words = name.split(" ")

    const formattedWords = words.map((word) => {
      const capitalizedFirstLetter = word.charAt(0).toUpperCase()
      const lowercaseRemainingLetters = word.slice(1).toLowerCase()
      return capitalizedFirstLetter + lowercaseRemainingLetters
    })

    const formattedName = formattedWords.join(" ")

    return formattedName
  }

  useEffect(() => {
    let parsed
    const userInfo = localStorage.getItem("userInfo")
    if (userInfo) {
      parsed = JSON.parse(userInfo)
      let username = formatName(parsed.name)
      setName(username)
    }
  }, [])

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
                <button onClick={toggleMenu}>
                  <img src="/icons/close.svg" alt="" width={24} height={24} />
                </button>
                <p className="font-semibold text-lg">{name}</p>
                <div></div>
              </div>
              <div className="px-5">
                <ul className=" flex flex-col gap-2">
                  {data.map((obj, index) => (
                    <li key={index}>
                      <Link
                        to={obj.link}
                        onClick={() => {
                          setSelected(obj.link)
                          setShowMenu(false)
                        }}
                      >
                        <div
                          className={`px-5 py-4 rounded-lg font-semibold
                         ${selected === obj.link && "bg-[#e9fbf5]"}
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
