import React, { Suspense, lazy, ComponentType } from "react";
import { Navigate, useRoutes, useLocation } from "react-router-dom";
import GuestGuard from "../guards/GuestGuard";
import AuthGuard from "../guards/AuthGuard";
// layouts

// ----------------------------------------------------------------------

const Loadable = (Component: ComponentType<any>) => (props: any) => {
  return (
    <Suspense fallback={<>Loading ...</>}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: "register",
      element: (
        <GuestGuard>
          <Register />
        </GuestGuard>
      ),
    },
    {
      path: "login",
      element: (
        <GuestGuard>
          <Login />
        </GuestGuard>
      ),
    },
    {
      path: "/profile",
      element: (
        <AuthGuard>
          <Profile />
        </AuthGuard>
      ),
    },
    {
      path: "/",
      element: <HomePage />,
    },
    { path: "*", element: <NotFound /> },
  ]);
}

// MAIN
const HomePage = Loadable(lazy(() => import("../pages/Home")));
const Login = Loadable(lazy(() => import("../pages/Login")));
const Register = Loadable(lazy(() => import("../pages/Register")));
const Profile = Loadable(lazy(() => import("../pages/Profile")));
const NotFound = Loadable(lazy(() => import("../pages/Page404")));
