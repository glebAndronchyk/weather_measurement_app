import { createBrowserRouter, RouterProvider } from "react-router";
import { lazy } from "react";
const MapViewPage = lazy(() => import("../pages/MapViewPage"));

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: <MapViewPage />,
      },
      {
        path: "/map-view",
        element: <MapViewPage />,
        index: true,
      },
    ],
  },
]);

export const APPRoutingModule = () => {
  return <RouterProvider router={router} />;
};
