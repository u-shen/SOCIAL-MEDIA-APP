import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { Auth } from "./pages/Auth/Auth";
import { Layout } from "./pages/Layout/Layout";
import { Home } from "./pages/Home/Home";
import { Chat } from "./pages/Chat/Chat";
import { ChatContextProvider } from "../src/context/ChatContext";

function App() {
  const [isAuth, setIsAuth] = useState(
    window.localStorage.getItem("userSignInInfo"),
  );
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout setIsAuth={setIsAuth} isAuth={isAuth} />,
      children: [
        {
          index: true,
          element: <Auth setIsAuth={setIsAuth} />,
        },
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/chat",
          element: <Chat />,
        },
      ],
    },
  ]);
  return (
    <>
      <ChatContextProvider>
        <RouterProvider router={router}></RouterProvider>
      </ChatContextProvider>
    </>
  );
}

export default App;
