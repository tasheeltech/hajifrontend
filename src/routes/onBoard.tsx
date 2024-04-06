import React, { useState, useEffect } from "react"
import { useLoaderData, useNavigate } from "react-router-dom"
import MicPermission from "../components/onboard/micPermission"
import LocationPermission from "../components/onboard/locationPermission"
import LanguageDetection from "../components/onboard/languageDetection"
import UserInformation from "../components/onboard/userInformation"
import i18n from "../i18n"
import { useUserState } from "../helper/userStateHelper"
import { DefaultLoader } from "../loaders/defaultLoader"

const OnBoard: React.FC = () => {
  const [step, setStep] = useState<number>(1)
  const navigate = useNavigate() // Initialize useNavigate

  const loadedData = useLoaderData() as DefaultLoader
  const { isoLanguage } = useUserState(loadedData)

  useEffect(() => {
    i18n.changeLanguage(isoLanguage ? isoLanguage.iso : navigator.language)
    console.log(navigator.language)

    console.log(isoLanguage)
    console.log(i18n.dir())
    document.body.dir = i18n.dir()
  }, [])

  useEffect(() => {
    const onboardingCompleted = localStorage.getItem("onboardingCompleted")
    if (onboardingCompleted) {
      // If onboarding is completed, redirect to homepage or desired route
      navigate("/homepage")
      console.log("Onboarding completed")
    }
  }, [navigate])

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1)
  }

  const handleOnboardingComplete = () => {
    localStorage.setItem("onboardingCompleted", "true")
    // Redirect to homepage or desired route
    navigate("/homepage")
    console.log("Onboarding completed")
  }

  return (
    <main className="overflow-scroll no-scrollbar h-dvh">
      {step === 1 && <MicPermission onNextStep={handleNextStep} />}
      {step === 2 && <LocationPermission onNextStep={handleNextStep} />}
      {step === 3 && <LanguageDetection onNextStep={handleNextStep} />}
      {step === 4 && (
        <UserInformation onboardingComplete={handleOnboardingComplete} />
      )}
    </main>
  )
}

export default OnBoard
