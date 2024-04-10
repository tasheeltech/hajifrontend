import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { IoIosSend } from "react-icons/io"

interface Props {
  handleClick: (question: string) => void
  click: () => void
}

const Search: React.FC<Props> = ({ handleClick, click }) => {
  const [question, setQuestion] = useState("")

  const { t } = useTranslation()

  return (
    <div className="flex gap-4 items-center">
      <input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
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
      ) : (
        <button className="bg-[#2BCE98] p-[10px] rounded-full opacity-50 flex items-center justify-center">
          <IoIosSend size={28} color="#ffffff" />
        </button>
      )}
    </div>
  )
}

export default Search
