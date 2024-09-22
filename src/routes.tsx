import { createBrowserRouter } from "react-router-dom";

import AnimeDetailsPage from "./pages/datalis/detalis";
import { App } from "./App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "details/:id",
    element: <AnimeDetailsPage />,
  },
]);
