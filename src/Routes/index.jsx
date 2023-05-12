import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import HomeLayout from "../layouts/HomeLayout";
import ProfileLayout from "../layouts/ProfileLayout";
import ConnectionLayout from "../layouts/ConnectionLayout";
import ChatLayout from "../layouts/ChatLayout";
import JobLayout from "../layouts/JobLayout";
// import CategoryComponent from "../components/CategoryComponent";
import CategoryLayout from "../layouts/CategoryLayout";
import App from "../Landing/sample-react-mui-introduction/src/App"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/home",
    element: <HomeLayout />,
  },
  {
    path: "/profile",
    element: <ProfileLayout />,
  },
  {
    path: "/connections",
    element: <ConnectionLayout />,
  },
  { 
    path: "/chat",
    element: <ChatLayout />,
  },
  {
    path: "/category",
    element: <CategoryLayout />,
  },
  {
    path: "/jobs",
    element: <JobLayout />,
  },
]);
