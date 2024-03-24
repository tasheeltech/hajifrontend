import React, { useEffect, useState } from "react"
import Def from "./def"

interface StarRatingProps {
  rating: number
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const [value, setValue] = useState<number[]>([])

  useEffect(() => {
    const roundedRating = rating
    const newValue: Array<number> = []
    for (let i = 0; i < 5; i++) {
      if (roundedRating >= i + 1) {
        newValue.push(100)
      } else if (roundedRating > i && roundedRating < i + 1) {
        let dec = Number((roundedRating - i).toFixed(2)) * 100
        newValue.push(dec)
      } else {
        newValue.push(0)
      }
    }
    setValue(newValue)
    console.log(newValue)
  }, [rating])

  return (
    <div className="flex items-center">
      {value.map((val, index) => (
        <div>
          <Def value={val} key={index} />
        </div>
      ))}
      <p className="ml-2">Rating: {rating}/5</p>
    </div>
  )
}

export default StarRating
