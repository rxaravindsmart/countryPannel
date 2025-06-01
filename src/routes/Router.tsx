import { Navigate } from "react-router-dom";
import LoginPage from "../Authetication/LoginPage";
import SignUpPage from "../Authetication/SignupPage";
import DashBoard from "../Dashboard/Dashboard";
import PageNotFound from "../Shared/PageNotFound";
import { CheckAuth } from "./RouterGuard";

const routes = (isUserLoggedIn: boolean): any => [
  { path: "", element: <Navigate to="sign-in" /> },
  { path: "sign-in", element: <LoginPage /> },
  { path: "dashboard", element: CheckAuth(isUserLoggedIn, <DashBoard />) },
  { path: "sign-up", element: <SignUpPage /> },
  { path: "*", element: <PageNotFound /> },
];

export default routes;
