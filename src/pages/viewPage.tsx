import React from "react"
import Map from "../components/map/map"
import { MdChevronLeft } from "react-icons/md"

interface Entry {
  id: string
  question: string
  answer: string
  answerWithMap: boolean
  locations: any
}

interface EntryProps {
  selectedEntry: Entry
  bookmarkPage: () => void
  bookmarkButton: any
}

const ViewPage: React.FC<EntryProps> = ({
  selectedEntry,
  bookmarkPage,
  bookmarkButton,
}) => {
  return (
    <div className="flex flex-col h-full">
      <div className="w-full flex justify-left py-3 sticky top-0 left-0 p-3 bg-white border-b">
        <button onClick={bookmarkPage} className="flex items-center">
          <MdChevronLeft className="-ml-1" style={{ width: 24, height: 24 }} />
          <p className="text-sm ">Bookmarks</p>
        </button>
      </div>
      <div
        className={`flex flex-col gap-5  pt-3 ${
          !selectedEntry.answerWithMap && "px-6"
        }`}
      >
        <div className={`${selectedEntry.answerWithMap && "px-6"}`}>
          <p className="text-[#666666] text-sm font-medium">
            {selectedEntry.answerWithMap
              ? "Here are your results"
              : selectedEntry.question}
          </p>
          <div className="mt-2 flex">{bookmarkButton()}</div>
        </div>

        {!selectedEntry.answerWithMap ? (
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
            <p className="text-[#373535] text-sm font-normal my-2 indent-12">
              {selectedEntry.answer}
            </p>
          </div>
        ) : (
          <div className="">
            <Map places={selectedEntry.locations} />
          </div>
        )}
      </div>
    </div>
  )
}

export default ViewPage
