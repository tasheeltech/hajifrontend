import React, { useEffect, useState } from "react"

interface StarRatingProps {
  rating?: number
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const [stars, setStars] = useState<string[]>([])

  useEffect(() => {
    if (typeof rating !== "undefined") {
      const fullStars = Math.floor(rating)
      const partialStar = rating - fullStars

      const starsArray = Array(5)
        .fill(0)
        .map((_, index) => {
          if (index < fullStars) {
            return "★" // Full star character
          } else if (index === fullStars && partialStar > 0) {
            // Round the fill percentage to 1 decimal place and convert to character
            const fillPercentage = Math.round(partialStar * 10) * 10
            return fillPercentage >= 50 ? "★" : "☆" // Partially filled star character
          } else {
            return "☆" // Empty star character
          }
        })

      setStars(starsArray)
    }
  }, [rating])

  if (typeof rating === "undefined") {
    return null
  }

  return (
    <div className="flex items-center">
      {stars.map((star, index) => (
        <span key={index} className="text-yellow-500 text-sm">
          {star}
        </span>
      ))}
      <p className="ml-2 text-sm">{rating.toFixed(1)}</p>
    </div>
  )
}

export default StarRating
