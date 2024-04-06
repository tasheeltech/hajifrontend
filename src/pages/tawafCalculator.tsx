import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

function TawafCalculator() {
  const [counter, setCounter] = useState(0)
  const [completed, setCompleted] = useState(false)

  const navigate = useNavigate()

  const { t } = useTranslation()

  useEffect(() => {
    if (counter === 7) {
      setCompleted(true)
    }
  }, [counter])

  const handleIncreament = () => {
    if (counter < 7) {
      setCounter(counter + 1)
    }
  }

  const handleDecreament = () => {
    if (counter > 0) {
      setCounter(counter - 1)
    }
  }

  const handleNext = () => {
    navigate("/saii")
  }

  return (
    <div className="div-6 flex flex-col items-center justify-between h-full">
      {completed ? (
        <>
          <div></div>
          <div className="flex flex-col justify-center">
            <p className="text-2xl font-medium text-[#2bce98] mb-4">
              {t("tawafCompleted")}
            </p>
            <button
              className="bg-[#2bce98] rounded-lg p-3 font-medium"
              onClick={handleNext}
            >
              {t("goToSaii")}
            </button>
          </div>
          <div></div>
        </>
      ) : (
        <>
          <div className="text-center flex flex-col gap-3 mt-6">
            <h1 className="text-2xl font-semibold ">{t("tawafCalc")}</h1>
            <div>
              <div className="text-sm">{t("increment")}</div>
              <div className="mt-1 text-sm">
                {t("decrement")}
           
              </div>
            </div>
          </div>
          <div className="flex items-center gap-10">
            <div className="text-[250px] w-32 leading-none flex justify-center items-center">
              <div>{counter}</div>
            </div>
            <div className="flex flex-col items-center gap-8">
              <button
                onClick={handleIncreament}
                className="border-2 rounded-full aspect-square"
              >
                <img className="w-16" src="/icons/plus.svg" alt="" />
              </button>
              <button
                onClick={handleDecreament}
                className="border-2 rounded-full aspect-square"
              >
                <img className="w-16" src="/icons/minus.svg" alt="" />
              </button>
            </div>
          </div>
          <div></div>
        </>
      )}
    </div>
  )
}

export default TawafCalculator
