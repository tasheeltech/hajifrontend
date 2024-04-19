import React from "react"
import { Link } from "react-router-dom"

function Train() {
  return (
    <div className="flex flex-col justify-between items-center h-full text-center">
      <div></div>
      <p className="max-w-72">
        Click the below link to know about visa related queries
      </p>
      <Link to="https://sar.hhr.sa/#" target="_blank">
        <div className="max-w-60 rounded-lg">
          <img src="/images/train.png" alt="" className="rounded-t-lg" />
          <p className="bg-[#e9fbf5] text-[#0000EE] text-sm py-2 rounded-b-lg">
            https://sar.hhr.sa/#
          </p>
        </div>
      </Link>
      <div></div>
    </div>
  )
}

export default Train
