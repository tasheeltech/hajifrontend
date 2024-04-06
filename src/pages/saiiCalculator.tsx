import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { ImArrowRight } from "react-icons/im"

function SaiiCalculator() {
  const [counter, setCounter] = useState(0)
  const [completed, setCompleted] = useState(false)
  const [right, setRight] = useState(false)
  const [left, setLeft] = useState(false)

  const { t } = useTranslation()

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
    }
  }

  const handleDecreament = () => {
    if (counter > 0) {
    
      setCounter((prevCounter) => prevCounter - 1)
    }
  }

  return (
    <div className="div-6 flex flex-col items-center justify-between h-full">
      {completed ? (
        <>
          <div></div>
          <div>
            <p className="text-2xl font-medium text-[#2bce98]">
              {t("saiiCompleted")}
            </p>
          </div>
          <div></div>
        </>
      ) : (
        <>
          <div className="text-center flex flex-col gap-3 mt-6">
            <h1 className="text-2xl font-semibold ">{t("saiiCalc")}</h1>
            <div>
              <div className="text-sm">
                {t("increment")}

              </div>
              <div className="mt-1 text-sm">
                {t("decrement")}
             
              </div>
            </div>
          </div>
          <div className="flex items-center gap-5 font-semibold text-xl">
            <p>{t("safa")}</p>
            <ImArrowRight
              style={{
                transform: right
                  ? "rotate(0deg)"
                  : left
                  ? "rotate(180deg)"
                  : "",
              }}
            />
            <p>{t("marwa")}</p>

            {/* <p>{safaMarwa ? "Safa" : "Marwa"}</p>
            <ImArrowRight />
            <p>{safaMarwa ? "Marwa" : "Safa"}</p> */}
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

export default SaiiCalculator
