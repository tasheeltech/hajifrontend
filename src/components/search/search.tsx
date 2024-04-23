import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { IoIosSend, IoMdMic } from "react-icons/io"

interface Props {
  handleClick: (question: string) => void
  click: () => void
  startRecord: () => void
  micPermission: string | null
  micAvailable: boolean
  value: string
  dummy: number
}

const Search: React.FC<Props> = ({
  handleClick,
  click,
  startRecord,
  micPermission,
  micAvailable,
  value,
  dummy,
}) => {
  const [question, setQuestion] = useState(value)

  useEffect(() => {
    // Update question whenever the value prop changes
    setQuestion(value)
  }, [value, dummy])

  const { t } = useTranslation()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setQuestion(newValue)
  }

  return (
    <div className="flex gap-4 items-center">
      <input
        value={question}
        onChange={handleChange}
        type="text"
        className="w-full max-h-12 border border-[#373535] rounded-[30px] px-6 py-4 focus:outline-none focus:ring focus:ring-[#2BCE986B] focus:border-[#888888]"
        placeholder={t("questionPH")}
      />
      {question !== "" ? (
        <button
          className="bg-[#2BCE98] p-[10px] rounded-full flex items-center justify-center"
          onClick={() => {
            handleClick(question)
            click()
          }}
        >
          <IoIosSend size={28} color="#ffffff" />
        </button>
      ) : micPermission === "granted" && micAvailable ? (
        <button
          className="bg-[#2BCE98] p-[10px] rounded-full flex items-center justify-center"
          onClick={() => startRecord()}
        >
          {/* <IoIosSend size={28} color="#ffffff" /> */}
          <IoMdMic size={28} color="#ffffff" />
        </button>
      ) : (
        <button
          className="bg-[#2BCE98] p-[10px] rounded-full flex items-center justify-center opacity-50"
          // onClick={() => startRecord()}
        >
          {/* <IoIosSend size={28} color="#ffffff" /> */}
          <IoMdMic size={28} color="#ffffff" />
        </button>
      )}
    </div>
  )
}

export default Search
