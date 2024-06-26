import React, { useState, useEffect, FormEvent } from "react";
import { Permission, useUserState } from "../../helper/userStateHelper";
import { DefaultLoader } from "../../loaders/defaultLoader";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface UserInformationProps {
  onboardingComplete: () => void;
}

const UserInformation: React.FC<UserInformationProps> = ({
  onboardingComplete,
}) => {
  const loadedData = useLoaderData() as DefaultLoader;
  const { name, setName, isoLanguage } = useUserState(loadedData);
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [visitPurpose, setVisitPurpose] = useState("");
  const { t } = useTranslation();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userName || !visitPurpose) {
      alert("Please enter your name and select your visit purpose.");
      return;
    }

    const uName = formatName(userName);
    setName(uName);
    localStorage.setItem(
      "userInfo",
      JSON.stringify({ name: uName, visitPurpose })
    );

    console.log("name :", userName);
    console.log("visitPurpose :", visitPurpose);

    if (userName && (visitPurpose === "Haji" || visitPurpose === "Umrah")) {
      onboardingComplete();
      // navigate("/homepage");
    }
  };

  const formatName = (name: string): string => {
    const words = name.split(" ");

    const formattedWords = words.map((word) => {
      const capitalizedFirstLetter = word.charAt(0).toUpperCase();
      const lowercaseRemainingLetters = word.slice(1).toLowerCase();
      return capitalizedFirstLetter + lowercaseRemainingLetters;
    });

    const formattedName = formattedWords.join(" ");

    return formattedName;
  };

  useEffect(() => {
    // This effect will re-render the component when onboardingComplete function changes
  }, [onboardingComplete]);

  return (
    <main className="overflow-scroll no-scrollbar  h-dvh ">
      <div className="flex flex-col items-center h-dvh  justify-center text-center  px-5">
        <div className="flex flex-col gap-2 max-w-[21.5rem]">
          {/* <h1 className="font-urbanist text-2xl leading-6 text-neutral-700">
            What's Your Name?
          </h1>
          <p className="text-zinc-600">Please enter your full name.</p> */}
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-center text-center mt-32">
              <div>
                <p className="font-urbanist text-xl text-bold mb-4">
                  {t("whatsYourName")}
                </p>
                <input
                  type="text"
                  id="name"
                  className="bg-gray-50 border border-emerald-300 text-sm rounded-lg block w-64 p-2.5"
                  placeholder="Abdullah"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </div>
              <div>
                <div className="flex flex-col items-center text-center mt-12">
                  <p className="font-urbanist text-xl text-bold mb-2 ">
                    {t("request")}
                  </p>
                  <div className="inline-flex gap-4">
                    <button
                      className={`hover:bg-slate-400 font-urbanist border-[1px] rounded-md py-4 px-11 mt-4 ${
                        visitPurpose === "Haji" && "bg-emerald-400"
                      }`}
                      onClick={() => setVisitPurpose("Haji")}
                    >
                      {t("haji")}
                    </button>
                    <button
                      className={`hover:bg-slate-400 font-urbanist border-[1px] rounded-md py-4 px-8 mt-4 ${
                        visitPurpose === "Umrah" && "bg-emerald-400"
                      }`}
                      onClick={() => setVisitPurpose("Umrah")}
                    >
                      {t("umrah")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default UserInformation;
