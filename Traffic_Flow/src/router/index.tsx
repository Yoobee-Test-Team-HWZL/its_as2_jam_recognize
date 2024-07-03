import React from "react";
import { ExRouteObject } from "./ExRouter";
import { Navigate } from "react-router-dom";
import BeforeEach from "./BeforeEach";
import ExRouter from "./ExRouter";

// Lazy load
const lazyload = (path: string) => {
  // Load element
  let Component = React.lazy(() => {
    return import(`@/${path}`);
  });
  //Back render
  return (
    <React.Suspense fallback={<>please waiting·····</>}>
      <Component />
    </React.Suspense>
  );
};

// Basic routing
const menuRoute: ExRouteObject = {
  path: "/layout",
  redirect: "/layout/home",
  element: lazyload("layouts/BaseLayout"),
  children: [
    {
      path: "/layout/home",
      redirect: "/layout/home/home1",
      element: lazyload("views/home"),
      children: [
        {
          path: "/layout/home/home1",
          element: lazyload("views/home"),
        },
      ],
    },
  ],
};
// Routing list
const routes: Record<string, any>[] = [
  menuRoute,
  {
    path: "/home",
    element: lazyload("views/home"),
  },
  {
    path: "/analyze",
    element: lazyload("views/analyze"),
  },
  {
    path: "/404",
    element: <>The page address does not exist</>,
  },
  { path: "/", element: <Navigate to="/home" /> },
  { path: "*", element: <Navigate to="/404" /> },
];

// Load the configured route
function Router() {
  return (
    <BeforeEach>
      <ExRouter routes={routes}></ExRouter>
    </BeforeEach>
  );
}

// export
export default Router;
