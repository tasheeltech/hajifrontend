import React, { useState } from "react"

interface Props {
  handleClick: (question: string) => void
  click: () => void
}

const Search: React.FC<Props> = ({ handleClick, click }) => {
  const [question, setQuestion] = useState("")

  return (
    <div className="flex gap-4 items-center justify-center p-4 sticky bottom-0 left-0 w-full bg-white">
      <input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        type="text"
        className="w-full max-h-12 border border-[#373535] rounded-[30px] px-6 py-4 focus:outline-none focus:ring focus:ring-[#2BCE986B] focus:border-[#888888]"
        placeholder="Ask a question..."
      />
      {question !== "" ? (
        <div>
          <img
            onClick={() => {
              handleClick(question)
              click()
            }}
            className=" opacity-100"
            src={"/button/sendBtn.svg"}
            alt=""
            width={60}
            height={60}
          />
        </div>
      ) : (
        <div>
          <img
            className="opacity-50"
            src={"/button/sendBtn.svg"}
            alt=""
            width={60}
            height={60}
          />
        </div>
      )}
    </div>
  )
}

export default Search
