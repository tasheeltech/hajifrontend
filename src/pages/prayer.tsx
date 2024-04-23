import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { useUserState } from "../helper/userStateHelper";
import { DefaultLoader } from "../loaders/defaultLoader";
import { t } from "i18next";

const CalculationMethod = [
  "MuslimWorldLeague",
  "Egyptian",
  "Karachi",
  "UmmAlQura",
  "Dubai",
  "Qatar",
  "Kuwait",
  "MoonsightingCommittee",
  "Singapore",
  "Turkey",
  "Tehran",
  "NorthAmerica",
];

function Prayer() {
  const loadedData = useLoaderData() as DefaultLoader;
  const { madhab, setMadhab, calMethod, setCalMethod } =
    useUserState(loadedData);

  const [showMadhabOptions, setShowMadhabOptions] = useState(false);
  const [showCalMethodOptions, setShowCalMethodOptions] = useState(false);
  const [calMethodindex, setcalMethodindex] = useState(0 as number);
  const handleMadhabClick = (madhab: string) => {
    setMadhab(madhab);
    setShowMadhabOptions(false);
  };

  const handleCalMethodClick = (calMethod: string) => {
    setCalMethod(calMethod);
    setcalMethodindex(parseInt(calMethod));
    setShowCalMethodOptions(false);
  };

  const handleToggleMadhabOptions = () => {
    setShowMadhabOptions(!showMadhabOptions);
  };

  const handleToggleCalMethodOptions = () => {
    setShowCalMethodOptions(!showCalMethodOptions);
  };

  return (
    <div>
      <h1 className="text-4xl text-center mt-6  mb-12">Prayer Settings</h1>
      <div className="flex flex-col text-center gap-24 justify-center items-center h-full m-6">
        <div>
          <button
            className="flex justify-center items-center py-4 px-8 rounded-md text-xl  gap-4 font-medium  bg-gray-600  text-center text-white "
            onClick={handleToggleMadhabOptions}
          >
            {t("selectMadhab")}
          </button>
          <div className="flex flex-col justify-center items-center  w-full">
            {["Hanafi", "Shafi", "Hambali", "Maliki"].map(
              (madhabName, index) => (
                <button
                  key={index}
                  className={`${
                    madhab === madhabName
                      ? "bg-[#0b35276b] text-white"
                      : "bg-white"
                  } px-4 py-3 flex items-center justify-center h-12 border-[1px] w-full font-semibold`}
                  onClick={() => handleMadhabClick(madhabName)}
                >
                  {t(madhabName)}
                </button>
              )
            )}
          </div>
        </div>
        <div>
          <button
            className="flex justify-center items-center  py-4 px-8 rounded-md text-xl font-medium bg-gray-600 text-center text-white "
            onClick={handleToggleCalMethodOptions}
          >
            select prayer calculation method
          </button>
          <div className="flex flex-col justify-center items-center w-full overflow-y-scroll max-h-48">
            {CalculationMethod.map((calMethodName, index) => (
              <button
                key={index}
                className={`${
                  calMethod === calMethodName
                    ? "bg-[#0b35276b] text-white"
                    : "bg-white"
                } px-4 py-3 flex items-center justify-center h-12 border-[1px] w-full font-semibold`}
                onClick={() => handleCalMethodClick(calMethodName)}
              >
                {t(calMethodName)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Prayer;
