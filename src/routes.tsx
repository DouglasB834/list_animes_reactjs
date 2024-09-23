import { createBrowserRouter } from "react-router-dom";

import AnimeDetailsPage from "./pages/datalis/detalis";
import { MainLayout } from "./pages/mainLayout";
import { App } from "./App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "details/:id",
        element: <AnimeDetailsPage />,
      },
    ],
  },
]);
