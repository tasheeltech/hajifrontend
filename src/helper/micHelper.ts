import { useEffect, useRef, useState } from "react"

export enum MicState {
  WAITING_FOR_MIC_PERMISSION,
  MIC_UNSUPPORTED,
  PERMISSION_REJECTED,
  MIC_READY,
  MIC_RECORDING,
  MIC_RECORDED,
}

const mimeType = "audio/webm"

const getAudioBlob = (audioChunks: Blob[]) =>
  new Blob(audioChunks, { type: mimeType })

export function useMic(audioBlobReadyTrigger: (blob: Blob) => void): {
  micState: MicState
  doStart: () => void
  startRecording: () => void
  stopRecording: () => void
  callTrigger: () => void
} {
  const [micState, setMicState] = useState(MicState.WAITING_FOR_MIC_PERMISSION)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const mediaRecorder = useRef<MediaRecorder | null>(null)
  const [audioChunks, setAudioChunks] = useState<Blob[]>([])

  const doStart = async () => {
    if (micState !== MicState.MIC_READY) {
      if ("MediaRecorder" in window) {
        try {
          const streamData: MediaStream =
            await navigator.mediaDevices.getUserMedia({
              audio: true,
            })
          // console.log("THISSS");
          setMicState(MicState.MIC_READY)
          setStream(streamData)
        } catch (err: any) {
          setMicState(MicState.PERMISSION_REJECTED)
          // alert(err.message);
        }
      } else {
        setMicState(MicState.MIC_UNSUPPORTED)
        // Silently; keep a note that audio recording is not supported for them
        // alert("The MediaRecorder API is not supported in your browser.");
      }
    }
  }

  useEffect(() => {
    doStart()
  }, [])

  const startRecording = async () => {
    setMicState(MicState.MIC_RECORDING)
    //create new Media recorder instance using the stream
    // @ts-ignore
    const media = new MediaRecorder(stream!, { type: mimeType })
    //set the MediaRecorder instance to the mediaRecorder ref
    mediaRecorder.current = media
    //invokes the start method to start the recording process
    mediaRecorder.current.start()
    console.log("Starting recording!!!")
    let localAudioChunks: Blob[] = []
    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === "undefined") return
      if (event.data.size === 0) return
      localAudioChunks.push(event.data)
    }
    setAudioChunks(localAudioChunks)
  }

  const stopRecording = () => {
    console.log("Stopping recording")
    //stops the recording instance
    // @ts-ignore
    mediaRecorder.current.stop()
    // @ts-ignore
    mediaRecorder.current.onstop = () => {
      //creates a blob file from the audiochunks data
      setMicState(MicState.MIC_RECORDED)

      function selfCallingTimeout() {
        setTimeout(() => {
          if (audioChunks.length !== 0) {
            audioBlobReadyTrigger(getAudioBlob(audioChunks))
          } else {
            selfCallingTimeout()
          }
        }, 500)
      }
      selfCallingTimeout()
    }
  }

  const callTrigger = () => {
    audioBlobReadyTrigger(getAudioBlob(audioChunks))
  }

  return { micState, doStart, startRecording, stopRecording, callTrigger }
}
