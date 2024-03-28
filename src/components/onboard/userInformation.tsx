import React, { useState, useEffect, FormEvent } from "react";
import { Permission, useUserState } from "../../helper/userStateHelper";
import { DefaultLoader } from "../../loaders/defaultLoader";
import { useLoaderData, useNavigate } from "react-router-dom";

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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userName || !visitPurpose) {
      alert("Please enter your name and select your visit purpose.");
      return;
    }
    localStorage.setItem(
      "userInfo",
      JSON.stringify({ name: userName, visitPurpose })
    );

    console.log("name :", userName);
    console.log("visitPurpose :", visitPurpose);

    if (userName && (visitPurpose === "Haji" || visitPurpose === "Umrah")) {
      onboardingComplete();
      // navigate("/homepage");
    }
  };

  useEffect(() => {
    // This effect will re-render the component when onboardingComplete function changes
  }, [onboardingComplete]);

  return (
    <main className="overflow-scroll no-scrollbar  h-dvh">
      <div className="flex flex-col items-center h-dvh px-5">
        <div className="flex items-center justify-center gap-10 py-6 w-full">
          {/* <Link href="/languageDetected"> */}
          <img className="w-7 h-7" alt="back-button" src="/icons/back.svg" />
          {/* </Link> */}
          <div className="w-56 rounded-full h-3 bg-zinc-100">
            <div className="bg-emerald-400 h-3 rounded-full w-5/5"></div>
          </div>
          <p className="text-xl">5/5</p>
        </div>

        <div className="flex flex-col gap-2 max-w-[21.5rem]">
          <h1 className="font-urbanist text-2xl leading-6 text-neutral-700">
            What's Your Name?
          </h1>
          <p className="text-zinc-600">Please enter your full name.</p>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-center text-center mt-32">
              <div>
                <p className="font-urbanist text-xl text-bold mb-4">
                  Please Enter Your Name:
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
                    Why are you visiting Saudi Arabia?
                  </p>
                  <div className="inline-flex gap-4">
                    <button
                      className={`hover:bg-slate-400 font-urbanist border-[1px] rounded-md py-4 px-11 mt-4 ${
                        visitPurpose === "Haji" && "bg-emerald-400"
                      }`}
                      onClick={() => setVisitPurpose("Haji")}
                    >
                      Hajj
                    </button>
                    <button
                      className={`hover:bg-slate-400 font-urbanist border-[1px] rounded-md py-4 px-8 mt-4 ${
                        visitPurpose === "Umrah" && "bg-emerald-400"
                      }`}
                      onClick={() => setVisitPurpose("Umrah")}
                    >
                      Umrah
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
