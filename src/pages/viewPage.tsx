import React from "react"

function ViewPage() {
  return <div>ViewPage</div>
}

export default ViewPage

// import React, { useEffect, useState } from "react"
// import { MdBookmarks } from "react-icons/md"
// import Map from "../components/map/map"

// interface Entry {
//   id: string
//   question: string
//   answer: string
//   answerWithMap: boolean
//   locations: any
//   bookmark: boolean
// }

// interface EntryProps {
//   id: string
//   question: string
//   answer: string
//   answerWithMap: boolean
//   locations: any
//   bookmark: boolean
//   bookmarkPage: () => {}
// }

// const ViewPage: React.FC<EntryProps> = ({
//   question,
//   answer,
//   answerWithMap,
//   locations,
//   bookmarkPage,
// }) => {
//   const [bookmark, setBookmark] = useState(true)
//   useEffect(() => {
//     function updateEntry(existingEntries: Entry[], newEntry: Entry) {
//       const index = existingEntries.findIndex(
//         (entry) => entry.id === newEntry.id
//       )
//       if (index !== -1) {
//         existingEntries[index] = newEntry
//       } else {
//         existingEntries.push(newEntry)
//       }
//       localStorage.setItem("allEntries", JSON.stringify(existingEntries))
//     }

//     function removeEntry(existingEntries: Entry[], idToRemove: string) {
//       const filteredEntries = existingEntries.filter(
//         (entry) => entry.id !== idToRemove
//       )
//       localStorage.setItem("allEntries", JSON.stringify(filteredEntries))
//     }

//     const allEntriesString = localStorage.getItem("allEntries")
//     const existingEntries: Entry[] = allEntriesString
//       ? JSON.parse(allEntriesString)
//       : []

//     const id = new Date().toISOString() // Using date as ID
//     const newEntry: Entry = {
//       id: id,
//       question: question,
//       answer: answer,
//       answerWithMap: answerWithMap,
//       locations: locations,
//       bookmark: bookmark, // Adding bookmark status
//     }

//     if (bookmark) {
//       updateEntry(existingEntries, newEntry)
//     } else {
//       // Remove existing entry with the same ID
//       const existingEntryIndex = existingEntries.findIndex(
//         (entry) => entry.id === newEntry.id
//       )
//       if (existingEntryIndex !== -1) {
//         removeEntry(existingEntries, newEntry.id)
//       }
//     }
//   }, [bookmark])

//   // useEffect(() => {
//   //   function updateEntry(existingEntries: Entry[], newEntry: Entry) {
//   //     const index = existingEntries.findIndex(
//   //       (entry) =>
//   //         entry.question === newEntry.question &&
//   //         entry.answer === newEntry.answer &&
//   //         entry.answerWithMap === newEntry.answerWithMap &&
//   //         entry.locations === newEntry.locations
//   //     )
//   //     if (index !== -1) {
//   //       existingEntries[index] = newEntry
//   //     } else {
//   //       existingEntries.push(newEntry)
//   //     }
//   //     localStorage.setItem("allEntries", JSON.stringify(existingEntries))
//   //   }

//   //   function removeEntry(existingEntries: Entry[], entryToRemove: Entry) {
//   //     const filteredEntries = existingEntries.filter(
//   //       (entry) =>
//   //         entry.question !== entryToRemove.question ||
//   //         entry.answer !== entryToRemove.answer ||
//   //         entry.answerWithMap !== entryToRemove.answerWithMap ||
//   //         entry.locations !== entryToRemove.locations
//   //     )
//   //     localStorage.setItem("allEntries", JSON.stringify(filteredEntries))
//   //   }

//   //   const allEntriesString = localStorage.getItem("allEntries")
//   //   const existingEntries = allEntriesString ? JSON.parse(allEntriesString) : []

//   //   // const newEntry = {
//   //   //   question: question,
//   //   //   answer: answer,
//   //   //   answerWithMap: answerWithMap,
//   //   //   locations: locations,
//   //   // }

//   //   const id = new Date().toISOString() // Using date as ID
//   //   const newEntry = {
//   //     id: id,
//   //     question: question,
//   //     answer: answer,
//   //     answerWithMap: answerWithMap,
//   //     locations: locations,
//   //   }

//   //   if (bookmark) {
//   //     updateEntry(existingEntries, newEntry)
//   //   } else {
//   //     removeEntry(existingEntries, newEntry)
//   //   }
//   // }, [bookmark, question, answer, answerWithMap, locations])

//   return (
//     <div className="flex flex-col justify-between h-full">
//       <div className={`flex flex-col gap-5  pt-3 ${!answerWithMap && "px-6"}`}>
//         <div className={`${answerWithMap && "px-6"}`}>
//           <p className="text-[#666666] text-sm font-medium">
//             {answerWithMap ? "Here are your results" : question}
//           </p>
//           <div className="mt-2 flex">
//             <button
//               onClick={() => setBookmark(!bookmark)}
//               className={`flex items-center py-2 px-3 ${
//                 bookmark ? "bg-[#e9fbf5]" : "bg-[#e6eaed]"
//               } rounded-full`}
//             >
//               <MdBookmarks style={{ width: 12, height: 12 }} />
//               <p className="ml-1 text-xs font-medium">Bookmark</p>
//             </button>
//           </div>
//         </div>

//         {!answerWithMap ? (
//           <div className="">
//             <div className="flex gap-2">
//               <img
//                 src={"/icons/messengerIcon.svg"}
//                 alt=""
//                 width={24}
//                 height={24}
//               />
//               <p className="font-semibold">HajiAnsari</p>
//             </div>
//             <p className="text-[#373535] text-sm font-normal my-2 indent-12">
//               {answer}
//             </p>
//           </div>
//         ) : (
//           <div className="">
//             <Map places={locations} />
//           </div>
//         )}
//       </div>
//       <div className="w-full py-3">
//         <button onClick={bookmarkPage}>go back</button>
//       </div>
//     </div>
//   )
// }

// export default ViewPage
