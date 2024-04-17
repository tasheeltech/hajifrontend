import { Link, useNavigate } from "react-router-dom"

import { IconType } from "react-icons"
import { FaKaaba } from "react-icons/fa"
import { PiMountainsFill } from "react-icons/pi"
import { MdBookmarks, MdEmergencyShare } from "react-icons/md"

import { useTranslation } from "react-i18next"

interface MyObject {
  name: string
  icon: IconType
  link: string
}

const data: MyObject[] = [
  //   { name: "home", icon: ImHome, link: "/homepage" },
  { name: "tawafCalc", icon: FaKaaba, link: "/tawaf" },
  { name: "saiiCalc", icon: PiMountainsFill, link: "/saii" },
  { name: "bookmarks", icon: MdBookmarks, link: "/bookmarks" },
  { name: "emergency", icon: MdEmergencyShare, link: "/emergency" },
  // { name: "language", icon: MdGTranslate, link: "/language" },
  // { name: "location", icon: FaLocationDot, link: "/location" },
  //   { name: "logOut", icon: FaSignOutAlt, link: "/" },
]

function Tools() {
  //   const [layout, setLayout] = useState(false)
  //   const [showMenu, setShowMenu] = useState(false)
  //   const [selected, setSelected] = useState("/homepage")

  const navigate = useNavigate()

  const { t } = useTranslation()

  return (
    <div className="border-l-4 border-[#2BCE98]">
      <ul className=" flex flex-col">
        {data.map((obj, index) => {
          const Icon = data[index].icon

          return (
            <li
              key={index}
              className="border-b active:bg-[#e9fbf5] active:pl-2"
            >
              <Link
                to={obj.link}
                onClick={() => {
                  navigate(`/${obj.link}`)
                }}
              >
                <div
                  className={`flex gap-2 items-center px-5 py-4 rounded-lg font-semibold
            `}
                >
                  <Icon />
                  <p className="ml-2 font-medium">{t(`${obj.name}`)}</p>
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Tools
