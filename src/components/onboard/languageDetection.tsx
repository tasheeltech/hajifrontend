import React from "react";
import { useEffect, useState } from "react";
import { MicState, useMic } from "../../helper/micHelper";
import { Link } from "react-router-dom";
import CountriesData from "../../components/languages/langlist";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Permission, useUserState } from "../../helper/userStateHelper";
import { DefaultLoader } from "../../loaders/defaultLoader";

interface Country {
  language: string;
  flag: string;
}
interface LanguageDetectionProps {
  onNextStep: () => void;
}


const capitaliseFirstLetter = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

const sentences = [
  { language: "Arabic", sentence: "أريد التحدث بلغتي" },
  { language: "English", sentence: "I want to talk in my language" },
  { language: "Urdu", sentence: "میں اپنی زبان میں بات کرنا چاہتا ہوں۔" },
  {
    language: "Indonesian",
    sentence: "Saya ingin berbicara dalam bahasa saya",
  },
  { language: "Turkish", sentence: "Kendi dilimde konuşmak istiyorum" },
  { language: "Malay", sentence: "Saya mahu bercakap dalam bahasa saya" },
];

const LanguageDetection: React.FC<LanguageDetectionProps> = ({
  onNextStep,
}) => {
  // Load user state
  const loadedData = useLoaderData() as DefaultLoader;
  const {
    isoLanguage,
    name,
    setIsoLanguage,
    setName,
    getUserScreen,
    computeUserScreen,
  } = useUserState(loadedData);
  const navigate = useNavigate();

  // State variables
  const [isMicButtonHidden, setIsMicButtonHidden] = useState(false);
  const [isStopButtonDisabled, setIsStopButtonDisabled] = useState(false);
  const [languageDetected, setLanguageDetected] = useState(false);
  const [wrongButtonClicked, setWrongButtonClicked] = useState(false);
  const [listLang, setListLang] = useState(false);

  // Handle mic button click
  const handleMicButtonClick = () => {
    setIsMicButtonHidden(true);
    startRecording();
  };

  // Handle stop button click
  const handleStopButtonClick = () => {
    setIsStopButtonDisabled(true);
    stopRecording();
  };

  // Send recording for language detection
  const sendRecording = async (blob: Blob) => {
    console.log("Sending recording!!!");
    const formData = new FormData();
    formData.append("audio", blob, "audio.webm");

    try {
      const body = await fetch(
        "https://hajibackend.tasheel-tech.workers.dev/getLanguage",
        {
          method: "POST",
          body: formData,
        }
      );
      const json = await body.json();
      if (json) {
        setLanguageDetected(true);
        console.log(json.payload.name);

        const country = CountriesData.countries.find(
          (country) =>
            country.language.toLocaleLowerCase() === json.payload.name
        );

        if (country) {
          //   setSearch(json.payload.name);
          setIsoLanguage(country);
          console.log(country);
        } else {
          console.log("Country not found for language:", json.payload.name);
        }
      }
    } catch (error) {
      console.error("Error sending recording:", error);
    }
  };

  const { micState, startRecording, stopRecording } = useMic((blob: Blob) => {
    sendRecording(blob);
  });

  // Handle wrong button click
  const handleWrongButtonClick = () => {
    setWrongButtonClicked(true);
  };

  const handleCountrySelection = (
    language: string
  ): React.MouseEventHandler<HTMLDivElement> => {
    return () => {
      console.log(language);
      const country = CountriesData.countries.find(
        (country) => country.language === language
      );
      setListLang(true);
      console.log(country);

      if (country) {
        //   setSearch(json.payload.name);
        setIsoLanguage(country);
        console.log(country);
      } else {
        console.log("Country not found for language:", language);
      }
    };
  };

  return (
    <main className="overflow-scroll no-scrollbar  h-dvh">
      {!languageDetected && (
        <div>
          <div className="flex flex-col items-center h-dvh px-5">
            <div className="flex items-center justify-center gap-10 py-6 w-full">
              <div className="w-56 rounded-full h-3 bg-zinc-100">
                <div className="bg-emerald-400 h-3 rounded-full w-2/5"></div>
              </div>
              <p className="text-xl">2/5</p>
            </div>

            <div className="flex flex-col gap-2 max-w-[21.5rem]">
              <h1 className="font-urbanist text-2xl leading-6 text-neutral-700">
                Running Auto-detect..
              </h1>
              <p className="text-zinc-600">Please talk into your microphone.</p>
              <div
                className="flex flex-col justify-center border-x border-t px-10 rounded-3xl mt-4 min-h-[32rem]
            shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]"
              >
                <div className="flex flex-col items-center text-center gap-2">
                  <p className="font-urbanist text-[#00C483] italic">
                    {sentences.map((item) => (
                      <p>{item.sentence}</p>
                    ))}
                  </p>
                  <p className="text-neutral-700">Speak for 5 seconds.</p>

                  {/* <h1>{MicState[micState]}</h1> */}
                  {!isMicButtonHidden && (
                    <button type="button" onClick={handleMicButtonClick}>
                      <img
                        className="w-20 h-20 mt-2 bg-emerald-100 rounded-full p-2"
                        alt="mic-button"
                        src="/icons/microphone.svg"
                      />
                    </button>
                  )}
                  {isMicButtonHidden && (
                    <button
                      type="button"
                      onClick={handleStopButtonClick}
                      disabled={isStopButtonDisabled}
                      className="mt-8"
                    >
                      <img
                        className="w-20 h-20 mt-2"
                        alt="stop-button"
                        src="/icons/stopBtn.svg"
                      />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {languageDetected && !wrongButtonClicked && (
        <div className="flex flex-col items-center h-dvh px-5">
          <div className="flex items-center justify-center gap-10 py-6 w-full">
            {/* <Link href="/autoDetectLanguage"> */}
            <img className="w-7 h-7" alt="back-button" src="/icons/back.svg" />
            {/* </Link> */}
            <div className="w-56 rounded-full h-3 bg-zinc-100">
              <div className="bg-emerald-400 h-3 rounded-full w-4/5"></div>
            </div>
            <p className="text-xl">4/5</p>
          </div>

          <div className="flex flex-col gap-2 max-w-[21.5rem]">
            <h1 className="font-urbanist text-2xl leading-6 text-neutral-700">
              Language Detected
            </h1>
            <div
              className="flex flex-col justify-center border-x border-t min-h-[32rem] rounded-3xl mt-4
            shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]"
            >
              <div className="flex flex-col items-center text-center gap-2">
                <p className="font-urbanist italic border-[1px] py-4 px-8 ">
                  {isoLanguage!.flag}
                  {capitaliseFirstLetter(isoLanguage!.language)}
                </p>
                <p className="text-neutral-700 mt-8 px-8">
                  Can you please confirm your language
                </p>
                <div className="flex gap-20">
                  <button onClick={onNextStep}>
                    <img
                      className="w-20 h-20 mt-12 "
                      alt="ok-button"
                      src="/icons/ok.svg"
                    />
                  </button>
                  <img
                    className="w-20 h-20 mt-12"
                    alt="wrong-button"
                    src="/icons/wrong.svg"
                    onClick={handleWrongButtonClick}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {wrongButtonClicked && !listLang && (
        <div className="flex flex-col items-center">
          <h2 className="text-lg my-8 font-bold font-urbanist">
            Please select from the list of languages
          </h2>
          <div>
            {CountriesData.countries.map((country: Country, index: number) => (
              <button onClick={onNextStep} key={index} className="flex">
                <div
                  key={index}
                  className="flex min-w-72 items-center gap-6 py-2 px-12 border-2 hover:bg-slate-200 cursor-pointer"
                  onClick={handleCountrySelection(country.language)}
                >
                  <span className="text-5xl"> {country.flag}</span>
                  <span className="text-lg "> {country.language}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </main>
  );
};


export default LanguageDetection;