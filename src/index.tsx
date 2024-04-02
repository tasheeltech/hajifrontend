import React from "react"
import ReactDOM from "react-dom/client"
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom"
import "./index.css"
import reportWebVitals from "./reportWebVitals"
import ErrorPage from "./error-page"
import AnotherPage from "./routes/anotherPage"
import defaultLoader from "./loaders/defaultLoader"
import OnBoard from "./routes/onBoard"
import Testing from "./routes/testing"
import TawafCalculator from "./pages/tawafCalculator"
import SaiiCalculator from "./pages/saiiCalculator"
import EmergencyPage from "./pages/emergency"
import HomePage from "./routes/homepage"
import RootLayout from "./components/rootLayout/rootLayout"

import Bookmarks from "./pages/bookmarks"
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <OnBoard />,
//     errorElement: <ErrorPage />,
//     loader: defaultLoader,
//   },
//   {
//     path: "/anotherPage",
//     element: <AnotherPage />,
//     errorElement: <ErrorPage />,
//     loader: defaultLoader,
//   },
//   {
//     path: "/testing",
//     element: <Testing />,
//     errorElement: <ErrorPage />,
//     loader: defaultLoader,
//   },
//   {
//     path: "/homepage",
//     element: <TestPage />,
//     errorElement: <ErrorPage />,
//     loader: defaultLoader,
//   },
//   {
//     path: "/tawaf",
//     element: <TawafCalculator />,
//     errorElement: <ErrorPage />,
//     loader: defaultLoader,
//   },
//   {
//     path: "/saii",
//     element: <SaiiCalculator />,
//     errorElement: <ErrorPage />,
//     loader: defaultLoader,
//   },
//   {
//     path: "/emergency",
//     element: <EmergencyPage />,
//     errorElement: <ErrorPage />,
//     loader: defaultLoader,
//   },
// ])

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<RootLayout />}
      errorElement={<ErrorPage />}
      loader={defaultLoader}
    >
      <Route
        index
        element={<OnBoard />}
        errorElement={<ErrorPage />}
        loader={defaultLoader}
      />
      <Route
        path="/homepage"
        element={<HomePage />}
        errorElement={<ErrorPage />}
        loader={defaultLoader}
      />
      <Route
        path="/tawaf"
        element={<TawafCalculator />}
        errorElement={<ErrorPage />}
        loader={defaultLoader}
      />
      <Route
        path="/saii"
        element={<SaiiCalculator />}
        errorElement={<ErrorPage />}
        loader={defaultLoader}
      />
      <Route
        path="/bookmarks"
        element={<Bookmarks />}
        errorElement={<ErrorPage />}
        loader={defaultLoader}
      />
      <Route
        path="/emergency"
        element={<EmergencyPage />}
        errorElement={<ErrorPage />}
        loader={defaultLoader}
      />
      <Route
        path="/anotherPage"
        element={<AnotherPage />}
        errorElement={<ErrorPage />}
        loader={defaultLoader}
      />
      <Route
        path="/testing"
        element={<Testing />}
        errorElement={<ErrorPage />}
        loader={defaultLoader}
      />
    </Route>
  )
)

root.render(
  <I18nextProvider i18n={i18n}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </I18nextProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

// question={""} answer={""} answerWithMap={false} locations={undefined}
