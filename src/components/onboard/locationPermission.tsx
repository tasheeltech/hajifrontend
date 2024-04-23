import React, { useState, useEffect } from "react";
import { Permission, useUserState } from "../../helper/userStateHelper";
import { DefaultLoader } from "../../loaders/defaultLoader";
import { useLoaderData, useNavigate } from "react-router-dom";

interface LocationPermissionProps {
  onNextStep: () => void;
}

const LocationPermission: React.FC<LocationPermissionProps> = ({
  onNextStep,
}) => {
  const loadedData = useLoaderData() as DefaultLoader;
  const { locationPermission, setLocationPermission } =
    useUserState(loadedData);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [showSkipButton, setShowSkipButton] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | null = null;
    if (permissionGranted) {
      onNextStep();
    } else {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          () => {
            setLocationPermission(Permission.GRANTED);
            setPermissionGranted(true);
          },
          () => setLocationPermission(Permission.DEFAULT)
        );
      } else {
        setLocationPermission(Permission.DEFAULT);
      }
    }
    // Call onNextStep after 3 seconds, regardless of permission status
    timeout = setTimeout(() => {
      setShowSkipButton(true);
    }, 3000);

    // Clean up the timeout when the component unmounts or the effect re-runs
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [setLocationPermission, onNextStep, permissionGranted]);

  const handleLocationPermissionClick = async () => {
    try {
      navigator.geolocation.watchPosition(
        () => {
          setLocationPermission(Permission.GRANTED);
          setPermissionGranted(true);
        },
        (error) => {
          setLocationPermission(Permission.DEFAULT);
          console.error("Permission denied:", error);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 30000,
          timeout: 27000,
        }
      );
    } catch (error) {
      console.error("Permission denied:", error);
    }
  };

  return (
    <main className="overflow-scroll no-scrollbar  h-dvh">
      <div className="flex flex-col items-center  justify-center h-screen text-center  px-5">
        <div className="flex flex-col gap-2">
          <h1 className="font-urbanist text-2xl leading-6 text-neutral-700">
            Give location Permission
          </h1>
          <p className="text-zinc-600">
            Kindly, allow your access to your location
          </p>
          <div
            className="border-x border-t py-40 px-10 rounded-3xl mt-4
                shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]"
          >
            <div className="flex flex-col items-center">
              <p className="font-urbanist text-neutral-700">Allow Hajiansari</p>
              <p>To access your location</p>
              <button onClick={handleLocationPermissionClick}>
                <img
                  className="w-20 h-32 mt-4"
                  alt="location-button"
                  src="/icons/location.svg"
                />
              </button>
              {showSkipButton && (
                <button
                  className="bg-blue-500 px-12 py-3 hover:bg-blue-700 text-white font-bold rounded mt-4"
                  onClick={onNextStep}
                >
                  Skip
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LocationPermission;
