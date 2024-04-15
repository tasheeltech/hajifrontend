import React, { useState, useEffect } from "react"
import { MdBookmarks } from "react-icons/md"
import { MdChevronRight } from "react-icons/md"
import ViewPage from "./viewPage"
import { useTranslation } from "react-i18next"

interface Entry {
  id: string
  question: string
  answer: string
  answerWithMap: boolean
  locations: any
}

const Bookmarks = () => {
  const [firstClick, setFirstClick] = useState(false)
  const [bookmark, setBookmark] = useState(false)
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null)
  const [view, setView] = useState(false)

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
        question: selectedEntry!.question,
        answer: selectedEntry!.answer,
        answerWithMap: selectedEntry!.answerWithMap,
        locations: selectedEntry!.locations,
      }
      toggleBookmark(newEntry)
    }
  }, [bookmark])

  const renderBookmarkButton = () => {
    return (
      <button
        onClick={() => {
          setBookmark(!bookmark)
          setFirstClick(true)
        }}
        className={`flex items-center py-2 px-3 ${
          bookmark ? "bg-[#e6eaed]" : "bg-[#e9fbf5]"
        } rounded-full`}
      >
        <MdBookmarks style={{ width: 12, height: 12 }} />
        <p className="ml-1 text-xs font-medium">{t("bookmark")}</p>
      </button>
    )
  }

  const gotToBookmarkPage = () => {
    setView(false)
    setFirstClick(false)
    setBookmark(false)
    console.log("go back clicked")
  }

  return (
    <>
      <div className="flex flex-col h-full">
        {!view ? (
          <>
            {bookmarked.length ? (
              <>
                {bookmarked.map((entry: Entry, index: number) => (
                  <div
                    className="border-l-4 border-[#2BCE98] active:pl-2"
                    key={index}
                    onClick={() => {
                      setView(true)
                      setSelectedEntry(entry)
                    }}
                  >
                    <div className="border-b pl-4 py-3">
                      {/* <div> */}
                      <div className=" font-medium">{entry.question}</div>
                      <div className="line-clamp-1 text-[#666666] text-sm">
                        {entry.answer}
                      </div>
                    </div>
                    {/* <button
                        onClick={() => {
                          setView(true)
                          setSelectedEntry(entry)
                        }}
                        className="flex items-center"
                      >
                        <p className="text-sm text-[#2BCE98]">View</p>
                        <MdChevronRight
                          className="-ml-1"
                          style={{ width: 24, height: 24, color: " #17CE92" }}
                        />
                      </button> */}
                    {/* </div> */}
                  </div>
                ))}
              </>
            ) : (
              <div className="flex h-full gap-2 flex-col justify-center items-center text-center">
                <MdBookmarks style={{ color: "#666666" }} />
                <p className="max-w-28 text-sm text-[#666666]">
                  {t("noBookmarks")}
                </p>
              </div>
            )}
          </>
        ) : (
          <>
            <ViewPage
              selectedEntry={selectedEntry!}
              bookmarkPage={gotToBookmarkPage}
              bookmarkButton={renderBookmarkButton}
            />
          </>
        )}
      </div>
    </>
  )
}

export default Bookmarks
