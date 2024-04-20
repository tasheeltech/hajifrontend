import React from "react"
import "../components/processing/processing.css"
import TextTypingEffect from "../components/typewriterEffect/typeWrtiter"
import { useTranslation } from "react-i18next"

interface ProcessingProps {
  question: string
}

const Processing: React.FC<ProcessingProps> = ({ question }) => {
  const { t } = useTranslation()

  return (
    <div className="grid place-items-center h-full">
      <div className="mb-6 text-lg mx-6 ">
        <div className="text-center flex flex-col gap-2 min-h-10">
          <div className="font-medium text-[#373535] text-lg underline">
            {t("yourQuestion")}
          </div>
          {question && <TextTypingEffect text={question} />}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="loader"></div>
        <div className="text-[#2BCE98]">Processing...</div>
      </div>
    </div>
  )
}

export default Processing
