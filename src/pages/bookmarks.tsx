import React from "react"

function Bookmarks() {
  return <div>Bookmarks</div>
}

export default Bookmarks



// import React, { useEffect, useState } from "react"
// import { MdBookmarks } from "react-icons/md"
// import { MdChevronRight } from "react-icons/md"
// import { useNavigate } from "react-router-dom"
// import ViewPage from "./viewPage"

// interface Entry {
//   id: string
//   question: string
//   answer: string
//   answerWithMap: boolean
//   locations: any
//   bookmark: boolean
// }

// const Bookmarks = () => {
//   const [view, setView] = useState(false)
//   const [ID, setID] = useState("")

//   const [selQues, setSelQues] = useState("")
//   const [selAns, setSelAns] = useState("")
//   const [ansMap, setAnsMap] = useState(false)
//   const [loc, setLoc] = useState([])
//   const [book, setBook] = useState(true)

//   const navigate = useNavigate()

//   const getEntriesFromLocalStorage = () => {
//     const allEntries = localStorage.getItem("allEntries")

//     console.log(allEntries)

//     if (allEntries) {
//       const parsedEntries = JSON.parse(allEntries)
//       return parsedEntries
//     }
//     return []
//   }
//   const [entries] = useState(() => getEntriesFromLocalStorage())

//   useEffect(() => {
//     console.log(entries)
//   }, [])

//   const goToViewPage = ({
//     id,
//     question,
//     answer,
//     answerWithMap,
//     locations,
//     bookmark,
//   }: Entry) => {
//     // navigate("bookmarks/viewPage")
//     setID(id)
//     setSelQues(question)
//     setSelAns(answer)
//     setAnsMap(answerWithMap)
//     setLoc(locations)
//     setBook(bookmark)
//     setView(true)
//   }

//   const gotToBookmarkPage = () => {
//     setView(false)
//   }

//   return (
//     <div className="flex flex-col h-full">
//       {!view ? (
//         <>
//           {entries.length ? (
//             <>
//               {entries.map((entry: Entry, index: number) => (
//                 <div className="border-l-4 border-[#2BCE98]" key={index}>
//                   <div className="flex items-center justify-between gap-4 border-b pl-4 py-3">
//                     <div>
//                       <div className="text-sm font-medium">
//                         {entry.question}
//                       </div>
//                       <div className="line-clamp-1 text-sm text-[#666666]">
//                         {entry.answer}
//                       </div>
//                     </div>
//                     <button
//                       onClick={() => {
//                         goToViewPage(entry)
//                       }}
//                       className="flex items-center"
//                     >
//                       <p className="text-[10px] text-[#2BCE98]">View</p>
//                       <MdChevronRight
//                         className="-ml-1"
//                         style={{ width: 24, height: 24, color: " #17CE92" }}
//                       />
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </>
//           ) : (
//             <div className="flex h-full gap-2 flex-col justify-center items-center text-center">
//               <MdBookmarks style={{ color: "#666666" }} />
//               <p className="max-w-28 text-sm text-[#666666]">
//                 No bookmarks added yet
//               </p>
//             </div>
//           )}
//         </>
//       ) : (
//         <>
//           <ViewPage
//             id={ID}
//             question={selQues}
//             answer={selAns}
//             answerWithMap={ansMap}
//             locations={loc}
//             bookmark={book}
//             bookmarkPage={() => gotToBookmarkPage}
//           />
//         </>
//       )}
//     </div>
//   )
// }

// export default Bookmarks
