import React, { useState, useEffect } from "react";
import { Permission, useUserState } from "../../helper/userStateHelper";
import { DefaultLoader } from "../../loaders/defaultLoader";
import { useLoaderData, useNavigate } from "react-router-dom";

interface MicPermissionProps {
  onNextStep: () => void;
}

const MicPermission: React.FC<MicPermissionProps> = ({ onNextStep }) => {
  const loadedData = useLoaderData() as DefaultLoader;
  const { micPermission, setMicPermission } = useUserState(loadedData);
  // const [permissionRequests, setPermissionRequests] = useState(0);
  const [permissionGranted, setPermissionGranted] = useState(false); // State to track permission grant

  useEffect(() => {
    if (permissionGranted) {
      onNextStep(); // Call onNextStep if permission is already granted
    } else {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(() => {
          setMicPermission(Permission.GRANTED);
          setPermissionGranted(true); // Set permissionGranted to true
        })
        .catch(() => setMicPermission(Permission.DEFAULT));
    }
  }, [setMicPermission, onNextStep, permissionGranted]);

  const handleMicPermissionClick = async () => {
    try {
      const micPermission = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      console.log("Microphone permission granted:", micPermission);
      setMicPermission(Permission.GRANTED);
      setPermissionGranted(true); // Set permissionGranted to true
    } catch (error) {
      console.error(
        "Error occurred while asking for microphone permission:",
        error
      );
    }
  };

  return (
    <main className="overflow-scroll no-scrollbar  h-dvh">
      <div className="flex flex-col items-center h-dvh px-5">
        <div className="flex items-center justify-center gap-10 py-6 w-full">
          <div className="w-56 rounded-full h-3 bg-zinc-100">
            <div className="bg-emerald-400 h-3 rounded-full w-1/5"></div>
          </div>
          <p className="text-xl">1/5</p>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="font-urbanist text-2xl leading-6 text-neutral-700">
            Give Mic Permission
          </h1>
          <p className="text-zinc-600">
            Kindly, allow your access to your microphone
          </p>
          <div
            className="border-x border-t py-40 px-10 rounded-3xl mt-4
                shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]"
          >
            <div className="flex flex-col items-center">
              <p className="font-urbanist text-neutral-700">Allow Hajiansari</p>
              <p>To access your microphone</p>
              <button onClick={handleMicPermissionClick}>
                <img
                  className="w-20 h-32 mt-4"
                  alt="microphone-button"
                  src="/icons/microphone.svg"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MicPermission;
