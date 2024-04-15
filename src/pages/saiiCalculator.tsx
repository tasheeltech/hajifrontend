import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { ImArrowRight } from "react-icons/im"
import "../components/counter/counter.css"
import { FaPlus, FaMinus } from "react-icons/fa6"
import { useNavigate } from "react-router-dom"

function SaiiCalculator() {
  const [counter, setCounter] = useState(0)
  const [completed, setCompleted] = useState(false)
  const [right, setRight] = useState(false)
  const [left, setLeft] = useState(false)
  const [animated, setAnimated] = useState(false)
  const [decDisable, setDecDisable] = useState(true)

  const { t } = useTranslation()

  const navigate = useNavigate()

  useEffect(() => {
    setRight(false)
    setLeft(false)
    if (counter === 7) {
      setCompleted(true)
    }

    if (counter % 2 === 0) {
      setRight(true)
    } else {
      setLeft(true)
    }
  }, [counter])

  const handleIncreament = () => {
    if (counter < 7) {
      setCounter((prevCounter) => prevCounter + 1)
      setAnimated(true)
      setTimeout(() => {
        setAnimated(false)
      }, 150)
    }
  }

  const handleDecreament = () => {
    if (counter > 0) {
      setCounter((prevCounter) => prevCounter - 1)
      setAnimated(true)
      setTimeout(() => {
        setAnimated(false)
      }, 150)
      setDecDisable(false)
    } else {
      setDecDisable(true)
    }
  }

  return (
    <div className="div-6 flex flex-col items-center justify-between h-full">
      {completed ? (
        <>
          <div></div>
          <div className="flex flex-col justify-center">
            <p className="text-2xl font-medium text-[#2bce98] mb-4">
              {t("saiiCompleted")}
            </p>
            <button
              className="bg-[#2bce98] rounded-lg p-3 font-medium"
              onClick={() => navigate("/homepage")}
            >
              {t("goToHome")}
            </button>
          </div>
          <div></div>
        </>
      ) : (
        <>
          <div className="text-center flex flex-col gap-3 mt-6">
            <h1 className="text-2xl font-semibold ">{t("saiiCalc")}</h1>
            <div>
              <div className="text-sm">{t("increment")}</div>
              <div className="mt-1 text-sm">{t("decrement")}</div>
            </div>
          </div>
          <div className="flex items-center gap-5 font-semibold text-xl">
            <p>{t("safa")}</p>
            <ImArrowRight
              color="#2bce98"
              style={{
                transform: right
                  ? "rotate(0deg)"
                  : left
                  ? "rotate(180deg)"
                  : "",
              }}
            />
            <p>{t("marwa")}</p>
          </div>
          <div className="flex items-center gap-10">
            <div className="text-[250px]   w-40 flex items-center justify-center ">
              <p className={`number leading-none ${animated && "animated"}`}>
                {counter}
              </p>
            </div>
            <div className="flex flex-col items-center gap-8">
              <button
                onClick={handleIncreament}
                className="border-4 border-[#a1d8c6] active:bg-[#a1d8c6] p-3 rounded-full aspect-square"
              >
                <FaPlus size={28} color="#1e1e1e" />
              </button>
              <button
                onClick={handleDecreament}
                className={`border-4 p-3 border-[#da9e9e] ${
                  !decDisable && "active:bg-[#da9e9e]"
                } rounded-full aspect-square`}
              >
                <FaMinus size={28} color="#1e1e1e" />
              </button>
            </div>
          </div>
          <div></div>
        </>
      )}
    </div>
  )
}

export default SaiiCalculator
