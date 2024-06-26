import { useLocation, useNavigate } from "react-router-dom"
import { ImHome } from "react-icons/im"
import { GiHamburgerMenu } from "react-icons/gi"
import { useEffect, useState } from "react"

// import { MdOutlineArrowBack } from "react-icons/md"

interface Props {
  toggle: () => void
}

export default function Header({ toggle }: Props) {
  const [showHomeBtn, setShowHomeBtn] = useState(true)

  const navigate = useNavigate()

  const location = useLocation()

  // useEffect(() => {
  //   setShowHomeBtn(true)
  //   if (location.pathname === "/homepage") {
  //     setShowHomeBtn(false)
  //   }
  // }, [location])

  const goToHome = () => {
    navigate("/homepage")
  }

  return (
    <div className="flex gap-5 items-center justify-between py-4 px-6">
      {/* {showHomeBtn && (
        <button onClick={goToHome}>
          <ImHome color="#666362" size={24} />
        </button>
      )} */}

      <div className="flex gap-2 items-center">
        <img
          onClick={goToHome}
          src={"HajiAnsariLogo.svg"}
          alt=""
          width={38}
          height={38}
        />

        <div className="flex flex-col gap-1 justify-center">
          <p className="text-xl font-semibold leading-none">HajiAnsari</p>
          <p className="text-[#17CE92] text-xs leading-none">
            Powered by Ansari AI
          </p>
        </div>
      </div>
      <button onClick={toggle}>
        <GiHamburgerMenu color="#666362" size={24} />
        {/* <img src={"/icons/menu.svg"} alt=" " width={24} height={24} />{" "} */}
      </button>
    </div>
  )
}
