import { Wrapper } from "../components/wrapper";
import { RootLayout } from "../layout/root-layout";
import ErrorPage from "../pages/error-page";
import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "../pages/home-page";
import { CharacterPage } from "../pages/character-page";

export const router = createBrowserRouter([
  {
    element: <Wrapper />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <RootLayout />,
        path: "/",
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: "character/:id",
            element: <CharacterPage />,
          },
        ],
      },
    ],
  },
]);
