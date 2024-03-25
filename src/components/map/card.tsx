import React from "react"
import LocationImage from "./locationImage"
import StarRating from "../rating/starRating"
import { Badge } from "../../ui/badge"
import { Link } from "react-router-dom"

// interface Place {
//   formattedAddress: string
//   location: {
//     latitude: number
//     longitude: number
//   }
//   rating: number
//   regularOpeningHours?: {
//     openNow: boolean
//   }
//   displayName: {
//     text: string
//     languageCode: string
//   }
// }

// interface CardProps {
//   places: Place[]
// }

type CardProps = {
  places: {
    formattedAddress: string
    internationalPhoneNumber: string
    googleMapsUri: string
    location: {
      latitude: number
      longitude: number
    }
    rating: number
    regularOpeningHours?: {
      openNow: boolean
    }
    displayName: {
      text: string
      languageCode: string
    }
  }[]
}

const Card: React.FC<CardProps> = ({ places }) => {
  return (
    <div className="">
      {places.map((place, index) => (
        <div className="border-b px-6 py-4 " key={index}>
          <div>
            <div className="flex gap-6 justify-between items-center">
              <div className="flex flex-col gap-1">
                <p className="text-lg font-medium mb-1">
                  {index + 1}. {place.displayName.text}
                </p>

                <StarRating rating={place.rating} />

                <p className="text-[#6e6e6e] text-sm">
                  {place.regularOpeningHours?.openNow ? "Open" : "closed"}
                </p>
                <div className="">
                  <p className="text-[#6e6e6e] text-sm ">
                    {place.formattedAddress}
                  </p>
                </div>
              </div>

              <div>
                <div className="w-20">
                  <LocationImage />
                </div>
              </div>
            </div>
          </div>

          <div className=" flex self-start mt-4">
            <div
              className={
                place.internationalPhoneNumber ? "" : "opacity-40 -z-50"
              }
            >
              <Link to={`tel:${place.internationalPhoneNumber}`}>
                <Badge
                  variant="outline"
                  className="flex gap-2 py-3 px-5 border-[#2BCE98] rounded-3xl"
                >
                  <img src="/icons/call.svg" className="w-4 h-4" alt="" />
                  <div className="text-[#2BCE98]">Call</div>
                </Badge>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Card
