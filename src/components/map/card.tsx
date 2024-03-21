import React from "react"

interface Place {
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
}

interface CardProps {
  places: Place[]
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
              <p className="text-[#6e6e6e]">
                Rating - {place.rating ? place.rating : "Unknown"}
              </p>

              <p className="text-[#6e6e6e]">
                {place.regularOpeningHours?.openNow}
              </p>
            </div>
            <div>
              <div className="w-16">
                <img
                  src={"/imgs/restaurant.jpeg"}
                  alt=""
                  width={75}
                  height={75}
                  className="aspect-square rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Card
