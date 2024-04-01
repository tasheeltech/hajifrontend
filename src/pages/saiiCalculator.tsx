import React, { useEffect, useState } from "react"
import { ImArrowRight } from "react-icons/im"

function SaiiCalculator() {
  const [counter, setCounter] = useState(0)
  const [completed, setCompleted] = useState(false)
  const [safaMarwa, setSafaMarwa] = useState(true)

  useEffect(() => {
    if (counter === 7) {
      setCompleted(true)
    }

    if (counter % 2 === 0) {
      setSafaMarwa(true)
    } else {
      setSafaMarwa(false)
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

  return (
    <div className="div-6 flex flex-col items-center justify-between h-full">
      {completed ? (
        <>
          <div></div>
          <div>
            <p className="text-2xl font-medium text-[#2bce98]">
              Saii Completed
            </p>
          </div>
          <div></div>
        </>
      ) : (
        <>
          <div className="text-center flex flex-col gap-3 mt-6">
            <h1 className="text-2xl font-semibold ">Saii Calculator</h1>
            <div>
              <div>
                Press <span className="font-bold text-lg">"+"</span> when you
                have completed 1 circle
              </div>
              <div className="mt-1">
                Press <span className="font-bold text-lg">"-"</span> if you have
                accidentally pressed{" "}
                <span className="font-bold text-lg">"+"</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-5 font-semibold text-lg">
            <p>{safaMarwa ? "Safa " : "Marwa "}</p>
            <ImArrowRight />
            <p>{safaMarwa ? "Marwa " : "Safa "}</p>
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
