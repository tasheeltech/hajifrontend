import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./index.css"
import reportWebVitals from "./reportWebVitals"
import Root from "./routes/root"
import ErrorPage from "./error-page"
import AnotherPage from "./routes/anotherPage"
import defaultLoader from "./loaders/defaultLoader"
import TestPage from "./routes/homepage"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: defaultLoader,
  },
  {
    path: "/anotherPage",
    element: <AnotherPage />,
    errorElement: <ErrorPage />,
    loader: defaultLoader,
  },
  {
    path: "/homepage",
    element: <TestPage />,
    errorElement: <ErrorPage />,
    loader: defaultLoader,
  },
])

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

// question={""} answer={""} answerWithMap={false} locations={undefined}
