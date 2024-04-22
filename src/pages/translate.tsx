import React from 'react'
import { MdChevronLeft } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

function Translate() {
    const navigate = useNavigate()

  return (
    <div className="flex flex-col h-full">
    <div className="w-full flex justify-left py-3 sticky top-0 left-0 p-3 bg-white border-b">
        <button onClick={() => navigate("/chat")} className="flex items-center">
          <MdChevronLeft className="-ml-1" style={{ width: 24, height: 24 }} />
          <p className="text-sm ">New Chat</p>
        </button>
      </div>
      <div className="flex flex-col gap-5  pt-3 px-6">
      
      </div>
    </div>
  )
}

export default Translate