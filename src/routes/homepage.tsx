"use client"

import React from "react"

import { useEffect, useMemo, useState } from "react"
import { useMic } from "../helper/micHelper"
import Processing from "../pages/processing"
import Answering from "../pages/answering"
import Timer from "../components/timer/timer"
import Header from "../components/header/header"
import Search from "../components/search/search"
import { ImageContext } from "../components/map/context"

interface Intent {
  type: string
  payload: {
    input: string
    output: string
    message: string
    locations: any
  }
}

export default function HomePage() {
  const [listening, setListening] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [answering, setAnswering] = useState(false)
  const [homepage, setHomepage] = useState(true)
  const [question, setQuestion] = useState("")
  const [tempQues, setTempQues] = useState("")
  const [answer, setAnswer] = useState("")
  const [succes, setSuccess] = useState(false)
  const [nativeQues, setNativeQues] = useState("")
  const [mapLocations, setMapLocations] = useState([])
  const [image, setImage] = useState("")

  const [answerWithMap, setAnswerwithMap] = useState(false)
  const formData = new FormData()

  useEffect(() => {
    if (question !== "" && answer !== "") {
      if (question !== tempQues) {
        setAnswering(true)
        setSuccess(true)
        proccessed()
        setTempQues(question)
        setNativeQues("")
      }
    }
  }, [question, answer, tempQues])

  const handleSendClick = (chatStr: string) => {
    setHomepage(false)
    setProcessing(true)
    setListening(false)
    setAnswering(false)
    console.log(chatStr)
    handleTextData(chatStr)
  }

  const handleStartRecord = () => {
    setHomepage(false)
    setListening(true)
    setProcessing(false)
    setAnswering(false)
  }

  const handleStopRecord = () => {
    setListening(false)
    setProcessing(true)
    setHomepage(false)
    setAnswering(false)
  }

  const sendRecording = async (blob: Blob) => {
    console.log("Sending recording!!!")
    formData.append("audio", blob, "audio.webm")
    const getProcessPath =
      "https://hajibackend.tasheel-tech.workers.dev/transcript"
    const body = await fetch(getProcessPath, {
      method: "POST",
      body: formData,
    })

    const json = await body.json()

    console.log(json)

    handleTextData(json.payload.text)
  }

  const { startRecording, stopRecording } = useMic((blob: Blob) => {
    sendRecording(blob)
  })

  const handleTextData = async (input: string) => {
    setNativeQues(input)

    formData.append("text", input)
    const body = await fetch(
      "https://hajibackend.tasheel-tech.workers.dev/processText",
      {
        method: "POST",
        body: formData,
      }
    )
    const res = await body.json()

    console.log(res)
    handleReceivedData(res)
  }

  const handleReceivedData = (res: Intent) => {
    setAnswerwithMap(false)

    if (res.payload.input !== "") {
      setQuestion(res.payload.input)
    } else {
      setQuestion("Ask anything")
    }
    if (res.payload.output !== "") {
      setAnswer(res.payload.output)
    } else {
      console.log(res.payload.message)
      setAnswer("Please try again")
    }

    if (res.type.startsWith("INTENT:NEAREST")) {
      setMapLocations(res.payload.locations.places)
      console.log("locations updated")
      setAnswerwithMap(true)

      const splitLocation = res.type.split("_")[1].toLowerCase().trim()
      setImage(splitLocation)
    }
    if (res.type === "INTENT:OTHER") {
    }

    if (res.type.startsWith("AUDIO")) {
      setAnswer(res.payload.message)
    }
    if (res.type === "COULD_FIND_INTENT") {
      setAnswer(res.payload.message)
    }
  }

  const toHomepage = () => {
    setHomepage(true)
    setSuccess(false)
  }

  const toListening = () => {
    startRecording()
    handleStartRecord()
    setSuccess(false)
  }

  const proccessed = () => {
    setProcessing(false)
  }

  return (
    <div className="overflow-scroll no-scrollbar">
      {homepage && (
        <div className="flex flex-col justify-between h-dvh">
          <div className="">
            <div className="border-b">
              <Header />
            </div>
            <section className="flex flex-col gap-5 p-6 border-b">
              <p className="font-semibold text-lg text-center">
                Assalamualaikum Ya Hajji! 😊️
              </p>
              <div className="flex flex-col gap-3">
                <div className="flex gap-4 justify-between px-5 py-4 rounded-[36px] border">
                  <p className="text-sm">Where's nearest toilet for women?</p>
                  <img
                    className="active:scale-150"
                    src={"/icons/goToIcon.svg"}
                    alt=" "
                    width={8}
                    height={8}
                  />
                </div>
                <div className="flex gap-4 justify-between px-5 py-4 rounded-[36px] border">
                  <p className="text-sm">where is muzdalifa? </p>
                  <img
                    className="active:scale-150"
                    src={"/icons/goToIcon.svg"}
                    alt=" "
                    width={8}
                    height={8}
                  />
                </div>
                <div className="flex gap-4 justify-between px-5 py-4 rounded-[36px] border">
                  <p className="text-sm">
                    Translate my question in arabic to talk to a local.{" "}
                  </p>
                  <img
                    className="active:scale-150"
                    src={"/icons/goToIcon.svg"}
                    alt=" "
                    width={8}
                    height={8}
                  />
                </div>
              </div>
            </section>
          </div>
          <div className="grid place-content-center my-10">
            <img
              onClick={() => {
                handleStartRecord()
                startRecording()
              }}
              className="active:opacity-50"
              src={"/button/recordBtn.svg"}
              alt=""
              width={100}
              height={100}
            />
          </div>
          <Search handleClick={handleSendClick} click={handleStopRecord} />
        </div>
      )}
      {listening && (
        <div className="flex flex-col  justify-between  h-dvh">
          <div className="">
            <div className="border-b">
              <Header />
            </div>
            <section className="mx-6 my-3 flex flex-col items-center">
              <div>
                <img
                  className=""
                  src={"/gif/listeningGif.gif"}
                  alt=""
                  width={250}
                  height={100}
                />
              </div>
              <div className="self-center">
                <Timer />
              </div>
              <p className="text-[#2BCE98] self-start mt-8"></p>
            </section>
          </div>
          <div className="py-6 sticky bottom-0 left-0 bg-white">
            <div className="grid place-content-center mb-4">
              <div className="flex flex-col items-center gap-5">
                <img
                  onClick={() => {
                    handleStopRecord()
                    stopRecording()
                  }}
                  className="active:opacity-50"
                  src={"/button/stopBtn.svg"}
                  alt=""
                  width={100}
                  height={100}
                />
                <p className="font-light italic text-sm text-center">
                  To stop
                  <br />
                  recording press the button....
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {processing && <Processing question={nativeQues} />}
      {answering && succes && (
        <ImageContext.Provider value={image}>
          <Answering
            question={question}
            answer={answer}
            answerWithMap={answerWithMap}
            toHomepage={toHomepage}
            toListening={toListening}
            locations={mapLocations}
          />
        </ImageContext.Provider>
      )}
    </div>
  )
}
