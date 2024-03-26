import React from "react"
import LocationImage from "./locationImage"
import StarRating from "../rating/starRating"
import { Badge } from "../../ui/badge"
import { Link } from "react-router-dom"

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
        <Link key={index} to={place.googleMapsUri} target="_blank">
          <div className="border-b px-6 py-4" key={index}>
            <div>
              <div className="flex gap-5 justify-between items-center">
                <div className="flex flex-col gap-1">
                  <p className="text-lg font-medium mb-1  line-clamp-1">
                    {index + 1}. {place.displayName.text}
                  </p>

                  <StarRating rating={place.rating} />

                  <div className=" text-sm">
                    {place.regularOpeningHours ? (
                      <p className="text-[#2BCE98]">Open</p>
                    ) : (
                      <p className="text-[#dc6666]">Closed</p>
                    )}
                  </div>
                  <div className="">
                    <p className="text-[#6e6e6e] text-sm line-clamp-1	">
                      {place.formattedAddress}
                    </p>
                  </div>
                </div>

                <div>
                  <div className="w-24 h-24">
                    <LocationImage />
                  </div>
                </div>
              </div>
            </div>

            <div className=" flex self-start mt-4">
              {place.internationalPhoneNumber && (
                <Link to={`tel:${place.internationalPhoneNumber}`}>
                  <Badge
                    variant="outline"
                    className="flex gap-2 py-2 px-3 border-[#2BCE98] rounded-3xl"
                  >
                    <img src="/icons/call.svg" className="w-4 h-4" alt="" />
                    <div className="text-[#2BCE98]">Call</div>
                  </Badge>
                </Link>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Card
