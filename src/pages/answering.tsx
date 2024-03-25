"use client"

import React from "react"
import Map from "../components/map/map"
import Header from "../components/header/header"

interface Props {
  question: string
  answer: string
  answerWithMap: boolean
  toHomepage: () => void
  toListening: () => void
  locations: any
}

const Answer: React.FC<Props> = ({
  question,
  answer,
  answerWithMap,
  toHomepage,
  toListening,
  locations,
}) => {
  return (
    <div>
      <div className="flex flex-col justify-between h-dvh">
        <div className="">
          <div className="border-b">
            <Header />
          </div>
          {!answerWithMap ? (
            <div className="flex flex-col gap-4 px-6  pt-3">
              <div className="">
                <p className="text-[#2BCE98] font-normal">{question}</p>
              </div>
              <div className="">
                <div className="flex gap-3">
                  <img
                    src={"/icons/messengerIcon.svg"}
                    alt=""
                    width={24}
                    height={24}
                  />
                  <p className="font-semibold">HajiAnsari</p>
                </div>
                <p className="text-[#373535] font-normal mt-2">{answer}</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3 pt-3">
              <div className="px-6">
                <p className="text-[#373535] font-meidum">
                  Here are your results
                </p>
              </div>
              <div className="">
                <Map places={locations} />
              </div>
            </div>
          )}
        </div>
        <div className="flex gap-6 items-center justify-center py-4 px-2 sticky bottom-0 left-0 w-full bg-white border-t-2">
          <button
            onClick={toHomepage}
            className="bg-[#2BCE986B] shadow-[0_4px_4px_-1px_rgba(0,0,0,0.5)] rounded-[30px] px-6 py-3 flex items-center gap-2 max-w-[130px] w-full active:opacity-50"
          >
            <img src={"/icons/chatIcon.svg"} alt="" width={20} height={20} />
            <div className="font-bold">Chat</div>
          </button>

          <button
            onClick={toListening}
            className="bg-[#2BCE986B] shadow-[0_4px_4px_-1px_rgba(0,0,0,0.5)] rounded-[30px] px-6 py-3 flex items-center gap-2 max-w-[130px] w-full active:opacity-50"
          >
            <img src={"/icons/micIcon.svg"} alt="" width={20} height={20} />
            <div className="font-bold">Record</div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Answer
