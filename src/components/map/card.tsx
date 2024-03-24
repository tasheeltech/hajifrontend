import React from "react"
import LocationImage from "./locationImage"
import StarRating from "../rating/starRating"
import { Badge } from "../../ui/badge"

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
        <div className="border-b" key={index}>
          <div className="px-6 py-4 flex gap-6 justify-between items-center">
            <div className="flex flex-col gap-1">
              <p className="text-lg font-semibold">
                {index + 1}. {place.displayName.text}
              </p>
              {/* <p className="text-[#6e6e6e]">
                Rating - {place.rating ? place.rating : "Unknown"}
              </p> */}
              <StarRating rating={place.rating} />

              <p className="text-[#6e6e6e]">
                {place.regularOpeningHours?.openNow ? "Open" : "closed"}
              </p>
              <p className="text-[#6e6e6e]">{place.formattedAddress}</p>
              <Badge
                variant="outline"
                className="flex gap-2 self-start py-2 px-4"
              >
                <img src="/icons/call.svg" className="w-4 h-4" alt="" />
                <div>Call</div>
              </Badge>
            </div>
            <div>
              <div className="w-16">
                <LocationImage />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Card
