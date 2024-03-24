import React from "react"

interface Val {
  value: number
  key: number
}

const Def: React.FC<Val> = ({ value, key }) => {
  return (
    <svg
      key={`${key}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-yellow-500 w-4 h-4"
    >
      <polygon
        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
        className="fill-current"
        style={{ fill: `url(#starGradient${key})` }}
      />
      <defs>
        <linearGradient
          id={`starGradient${key}`} // Ensure unique ID for each gradient
          x1="0%"
          y1="0%"
          x2={`${value}%`}
          y2="0%"
        >
          <stop offset="0%" stopColor="gold" />
          {/* <stop offset={`${val}%`} stopColor="gold" />
                <stop offset={`${val}%`} stopColor="transparent" /> */}
          <stop offset="99%" stopColor="gold" />
          <stop offset="99%" stopColor="transparent" />
        </linearGradient>
      </defs>
      {/* <Def value={val} /> */}
    </svg>
  )
}

export default Def
