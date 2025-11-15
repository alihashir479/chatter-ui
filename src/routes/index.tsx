import { createBrowserRouter } from "react-router-dom";
import Login from "../components/auth/Login";
import SignUp from "../components/auth/SignUp";
import Home from "../components/home/Home";
import UnAuthLayout from "../components/layouts/UnAuthLayout";
import DefaultLayout from "../components/layouts/defaultLayout";
import Chat from "../components/chat/chat";
import Profile from "../components/profile/profile";

const router = createBrowserRouter([
  {
    path: '/auth',
    element: <UnAuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />
      },
    ]
  },
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: 'chats/:id',
        element: <Chat />
      },
      {
        path: 'profile',
        element: <Profile />
      }
    ]
  }
]);

export default router