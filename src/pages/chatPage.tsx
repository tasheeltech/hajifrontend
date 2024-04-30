"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { useMic } from "../helper/micHelper"
import Processing from "./processing"
import Answering from "./answering"
import Timer from "../components/timer/timer"
import Search from "../components/search/search"
import { ImageContext } from "../components/map/context"
// import Emergency from "../components/emergency/emergency"
import { useLoaderData, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { BsMicMuteFill } from "react-icons/bs"
import { DefaultLoader } from "../loaders/defaultLoader"
import { useUserState } from "../helper/userStateHelper"
import { RxArrowTopRight } from "react-icons/rx"
import { HAJI_BACKEND_URL } from "../helper/url"

interface Intent {
  type: string
  payload: {
    input: string
    output: string
    message: string
    locations: any
  }
}

export default function ChatPage() {
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
  const [emergency, setEmergency] = useState(false)
  const [translate, setTranslate] = useState(false)

  const [answerWithMap, setAnswerwithMap] = useState(false)

  const formData = new FormData()

  const { t } = useTranslation()

  const navigate = useNavigate()

  const loadedData = useLoaderData() as DefaultLoader
  const { isoLanguage, location, setLandmark } = useUserState(loadedData)

  const [center, setCenter] = useState(
    location ? location : { lat: 21.4225, lng: 39.8262 }
  )

  useEffect(() => {
    // Check if geolocation is supported by the browser
    if (navigator.geolocation) {
      // Get the current position
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          if (center.lat !== latitude || center.lng !== longitude) {
            // setTimeout(() => {
            const loc = { lat: latitude, lng: longitude }
            setCenter(loc)
            // }, 50000)
          }
        },
        (error) => {
          console.error("Error getting geolocation:", error)
        }
      )
    } else {
      console.error("Geolocation is not supported by this browser.")
    }
  }, [center])

  const { doStart, startRecording, stopRecording } = useMic((blob: Blob) => {
    sendRecording(blob)
  })

  const [microphonePermission, setMicrophonePermission] = useState<
    string | null
  >(null)
  const [micAvailable, setMicAvailable] = useState<boolean>(false)

  useEffect(() => {
    const requestMicrophonePermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        })
        // Permission granted
        setMicrophonePermission("granted")
        handleDeviceChange()
        // Don't forget to stop the stream when you're done with it
        stream.getTracks().forEach((track) => track.stop())
      } catch (error) {
        if (
          error instanceof Error &&
          (error.name === "NotAllowedError" ||
            error.name === "PermissionDeniedError")
        ) {
          // Permission denied
          setMicrophonePermission("denied")
        } else {
          // Handle other errors
          console.error("Error accessing microphone:", error)
          setMicrophonePermission("denied")
        }
      }
    }

    const handleDeviceChange = async () => {
      // Check if the microphone is still available
      try {
        const devices = await navigator.mediaDevices.enumerateDevices()
        const microphone = devices.find(
          (device) => device.kind === "audioinput"
        )
        if (!microphone) {
          // Microphone is disconnected
          // setMicrophonePermission("disconnected")
          setMicAvailable(false)
        } else {
          // Microphone is reconnected
          setTimeout(() => {
            // setMicrophonePermission("granted")
            setMicAvailable(true)
            console.log(micAvailable)
            doStart()
          }, 500)
        }
      } catch (error) {
        console.error("Error checking media devices:", error)
      }
    }

    // Request microphone permission when the component mounts
    requestMicrophonePermission()

    // Listen for changes in media devices
    navigator.mediaDevices.addEventListener("devicechange", handleDeviceChange)
 
    // Clean up event listener
    return () => {
      navigator.mediaDevices.removeEventListener(
        "devicechange",
        handleDeviceChange
      )
    }
  }, [])

  // useEffect(() => {
  //   const requestMicrophonePermission = async () => {
  //     try {
  //       const stream = await navigator.mediaDevices.getUserMedia({
  //         audio: true,
  //       })
  //       // Permission granted
  //       setMicrophonePermission("granted")
  //       doStart()
  //       // Don't forget to stop the stream when you're done with it
  //       stream.getTracks().forEach((track) => track.stop())
  //     } catch (error) {
  //       if (
  //         error instanceof Error &&
  //         (error.name === "NotAllowedError" ||
  //           error.name === "PermissionDeniedError")
  //       ) {
  //         // Permission denied
  //         setMicrophonePermission("denied")
  //       } else {
  //         // Handle other errors
  //         console.error("Error accessing microphone:", error)
  //         setMicrophonePermission("denied")
  //       }
  //     }
  //   }

  //   // Request microphone permission when the component mounts
  //   requestMicrophonePermission()
  // }, [])

  // const requestMicrophonePermission = async () => {
  //   try {
  //     const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
  //     // Permission granted
  //     setMicrophonePermission("granted")
  //     doStart()
  //     // Don't forget to stop the stream when you're done with it
  //     stream.getTracks().forEach((track) => track.stop())
  //   } catch (error) {
  //     if (
  //       error instanceof Error &&
  //       (error.name === "NotAllowedError" ||
  //         error.name === "PermissionDeniedError")
  //     ) {
  //       // Permission denied
  //       setMicrophonePermission("denied")
  //     } else {
  //       // Handle other errors
  //       console.error("Error accessing microphone:", error)
  //       setMicrophonePermission("denied")
  //     }
  //   }
  // }

  // useEffect(() => {
  //   // Check microphone permission periodically
  //   const interval = setInterval(requestMicrophonePermission, 1000) // Check every second
  //   return () => clearInterval(interval)
  // }, [])

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
    startRecording()
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
    formData.append("isoLanguage", JSON.stringify(isoLanguage))
    formData.append("location", JSON.stringify(center))
    console.log(isoLanguage)

    // formData.append("isoLanguage", "en")
    const getProcessPath = HAJI_BACKEND_URL + "transcript"
    const body = await fetch(getProcessPath, {
      method: "POST",
      body: formData,
    })

    const json = await body.json()

    console.log(json)

    handleTextData(json.payload.text)
  }

  const handleTextData = async (input: string) => {
    setNativeQues(input)

    formData.append("text", input)
    formData.append("isoLanguage", JSON.stringify(isoLanguage))
    formData.append("location", JSON.stringify(center))
    console.log(isoLanguage)

    // formData.append("isoLanguage", "en")

    const body = await fetch(HAJI_BACKEND_URL + "processText", {
      method: "POST",
      body: formData,
    })
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
    if (res.type === "TEXT_NOT_SENT") {
      setQuestion("?")
      setAnswer("Please speak clearly and try again")
    }
    if (res.payload.input === "undefined" || res.type === "INTENT:") {
      setQuestion("?")
      setAnswer("Unfortunately error occured, Please try again")
    }
    if (res.type.startsWith("INTENT:NEAREST")) {
      setMapLocations(res.payload.locations.places)
      setAnswerwithMap(true)

      const splitLocation = res.type.split("_")[1].toLowerCase().trim()
      setImage(splitLocation)
    }
    if (
      res.type === "INTENT:EMERGENCY" ||
      res.type.startsWith("INTENT:NEEDS")
    ) {
      // setEmergency(true)
      navigate("/emergency")
      // setQuestion(res.payload.input)
    }

    if (res.type.startsWith("AUDIO")) {
      setAnswer(res.payload.message)
    }
    if (res.type === "COULD_FIND_INTENT") {
      setAnswer(res.payload.message)
    }
    if (res.type === "INTENT:OTHER") {
      // if (res.payload.input) {
      //   let ques = res.payload.input.toLowerCase()
      //   console.log(ques)
      //   if (ques.includes("tawaf") && ques.includes("calc")) {
      //     navigate("/tawaf")
      //   }
      //   if (ques.includes("saii") && ques.includes("calc")) {
      //     navigate("/saii")
      //   }
      // }
    }
    if (res.type === "INTENT:CALCUALTE_MY_TAWAF") {
      navigate("/tawaf")
    }
    if (res.type === "INTENT:CALCULATE_MY_SAII") {
      navigate("/saii")
    }
    if (res.type === "INTENT:VISA_QUERIES") {
      navigate("/visa")
    }
    if (res.type === "INTENT:TRAIN_QUERIES") {
      navigate("/train")
    }
    if (res.type === "INTENT:SHOW_LANDMARKS") {
      setLandmark("Makkah")
      navigate("/landmarks")
    }
    if (res.type === "INTENT:SHOW_LANDMARKS_MAKKAH") {
      setLandmark("Makkah")

      navigate("/landmarks")
    }
    if (res.type === "INTENT:SHOW_LANDMARKS_MADINA") {
      setLandmark("Madinah")
      navigate("/landmarks")
    }
    if (res.type === "INTENT:TRANSLATE") {
      setTranslate(true)
    }
  }

  const toChatPage = () => {
    setHomepage(true)
    setSuccess(false)
    setEmergency(false)
  }

  const toListening = () => {
    startRecording()
    handleStartRecord()
    setSuccess(false)
  }

  const proccessed = () => {
    setProcessing(false)
  }

  const [name, setName] = useState("")

  useEffect(() => {
    let uName: string
    const userInfo = localStorage.getItem("userInfo")
    if (userInfo) {
      uName = JSON.parse(userInfo).name
      setName(uName)
    }
  }, [])

  // const questions = [
  //   "How to perform Umrah?",
  //   "How long do I need to cut my hair?",
  //   "I want to count my Tawaf?",
  //   "I am in an Emergency",
  //   "Show me Landmarks in Makkah",
  //   "Count my Sa'ii",
  //   "Say to the security guard, I want to find my son",
  // ]

  const qs = [t("q1"), t("q2"), t("q3"), t("q4"), t("q5"), t("q6"), t("q7"),t("q8")]

  const [value, setValue] = useState("")
  const [dummy, setDummy] = useState(0)

  const handleForceUpdate = () => {
    // Update dummy to force the effect to run again
    setDummy((prevDummy) => prevDummy + 1)
  }

  return (
    <>
      {homepage && (
        <div className="flex flex-col justify-between h-full">
          {/* <div></div> */}
          <section className="flex flex-col gap-5 p-6 border-b">
            <p className="font-semibold text-lg text-center">
              {t("welcome")} {name} 😊️
            </p>
            <div className="flex flex-col gap-3">
              {qs.map((q, index) => (
                <div
                  className="flex gap-4 items-center justify-between px-5 py-2 rounded-[36px] border"
                  onClick={() => {
                    handleForceUpdate()
                    // setValue(q)
                    handleSendClick(q)
                    handleStopRecord()
                  }}
                  key={index}
                >
                  <p className="text-sm">{q}</p>
                  <div className="p-2">
                    <RxArrowTopRight size={14} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="grid place-content-center my-10">
            {/* {microphonePermission === "granted" && (
              <img
                onClick={() => {
                  handleStartRecord()
                  // startRecording()
                }}
                className="active:opacity-50"
                src={"/button/recordBtn.svg"}
                alt=""
                width={100}
                height={100}
              />
            )} */}
            {microphonePermission === "denied" && (
              <div className="flex flex-col gap-2 items-center ">
                <BsMicMuteFill size={32} />
                <div className="max-w-60 text-xs text-center">{t("noMic")}</div>
              </div>
            )}
          </div>
          <div className=" py-4 px-4 sticky bottom-0 left-0 w-full bg-white border-t-2">
            <Search
              handleClick={handleSendClick}
              click={handleStopRecord}
              startRecord={handleStartRecord}
              micPermission={microphonePermission}
              micAvailable={micAvailable}
              value={value}
              dummy={dummy}
            />
          </div>
        </div>
      )}
      {listening && (
        <div className="flex flex-col justify-between h-full">
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
                <p className="font-light italic text-sm text-center max-w-40">
                  {t("stopRecord")}
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
            toChatPage={toChatPage}
            toListening={toListening}
            locations={mapLocations}
            micPermission={microphonePermission}
            translate={translate}
          />
        </ImageContext.Provider>
      )}
      {/* {emergency && <Emergency toChatPage={toChatPage} />} */}
    </>
  )
}
