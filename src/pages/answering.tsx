"use client"

import React, { useEffect, useState } from "react"
import Map from "../components/map/map"
import { MdBookmarks } from "react-icons/md"
import { useTranslation } from "react-i18next"
import { HiChatBubbleLeftRight, HiMiniMicrophone } from "react-icons/hi2"

interface Props {
  question: string
  answer: string
  answerWithMap: boolean
  toHomepage: () => void
  toListening: () => void
  locations: any
}

interface Entry {
  id: string
  question: string
  answer: string
  answerWithMap: boolean
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
  const [bookmark, setBookmark] = useState(false)
  const [firstClick, setFirstClick] = useState(false)

  const { t } = useTranslation()

  const getEntriesFromLocalStorage = () => {
    const allEntries = localStorage.getItem("bookmarked")

    console.log(allEntries)

    if (allEntries) {
      const parsedEntries = JSON.parse(allEntries)

      return parsedEntries
    }

    return []
  }

  const [bookmarked, setBookmarked] = useState<Entry[]>(() =>
    getEntriesFromLocalStorage()
  )

  const toggleBookmark = (entry: Entry) => {
    let updatedBookmarked
    if (bookmarked.some((item) => item.question === entry.question)) {
      updatedBookmarked = bookmarked.filter(
        (item) => item.question !== entry.question
      )
      console.log(updatedBookmarked)
      console.log("filter")
    } else {
      updatedBookmarked = [...bookmarked, entry]
      console.log(updatedBookmarked)
      console.log("append")
    }
    setBookmarked(updatedBookmarked)
    localStorage.setItem("bookmarked", JSON.stringify(updatedBookmarked))
  }

  useEffect(() => {
    if (firstClick) {
      const id = new Date().toISOString() // Using date as ID
      const newEntry: Entry = {
        id: id,
        question: question,
        answer: answer,
        answerWithMap: answerWithMap,
        locations: locations,
      }
      toggleBookmark(newEntry)
    }
  }, [bookmark])

  return (
    <div className="flex flex-col justify-between h-full">
      <div className={`flex flex-col gap-5  pt-3 ${!answerWithMap && "px-6"}`}>
        <div className={`${answerWithMap && "px-6"}`}>
          <p className="text-[#8a8a8a] font-medium">
            {answerWithMap ? "Here are your results" : question}
          </p>
          <div className="mt-2 flex">
            <button
              onClick={() => {
                setBookmark(!bookmark)
                setFirstClick(true)
              }}
              className={`flex items-center py-2 px-3 ${
                bookmark ? "bg-[#e9fbf5]" : "bg-[#e6eaed]"
              } rounded-full`}
            >
              <MdBookmarks style={{ width: 12, height: 12 }} />
              <p className="ml-1 text-xs font-medium">{t("bookmark")}</p>
            </button>
          </div>
        </div>

        {!answerWithMap ? (
          <div className="">
            <div className="flex gap-2">
              <img
                src={"/icons/messengerIcon.svg"}
                alt=""
                width={24}
                height={24}
              />
              <p className="font-semibold">HajiAnsari</p>
            </div>
            <p className="text-[#373535] font-normal my-2 indent-12">
              {answer}
            </p>
          </div>
        ) : (
          <div className="">
            <Map places={locations} />
          </div>
        )}
      </div>
      <div className="flex gap-8 items-center justify-center py-3 px-6 sticky bottom-0 left-0 w-full bg-white border-t-2 ">
        <button
          onClick={toHomepage}
          className="bg-[#2BCE986B] shadow-[0_4px_4px_-1px_rgba(0,0,0,0.5)] rounded-[30px] px-4 py-3 flex items-center justify-center h-12 w-1/2 max-w-40 active:opacity-50"
        >
          <div className="flex items-center gap-1">
            {/* <img src={"/icons/chatIcon.svg"} alt="" width={20} height={20} /> */}
            <HiChatBubbleLeftRight size={18} />

            <div className="font-bold">{t("chat")}</div>
          </div>
        </button>

        <button
          onClick={toListening}
          className="bg-[#2BCE986B] shadow-[0_4px_4px_-1px_rgba(0,0,0,0.5)] rounded-[30px] px-4 py-3 flex items-center justify-center h-12 w-1/2 max-w-40 active:opacity-50"
        >
          <div className="flex items-center gap-1">
            {/* <img src={"/icons/micIcon.svg"} alt="" width={20} height={20} /> */}
            <HiMiniMicrophone size={18} />
            <div className="font-bold">{t("record")}</div>
          </div>
        </button>
      </div>
    </div>
  )
}

export default Answer
