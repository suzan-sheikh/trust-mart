import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Root from "./pages/Root.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login/Login.jsx";
import Home from "./pages/Home/Home.jsx";
import Signup from "./pages/Registration/Signup.jsx";
import AuthProvider from "./Firebase/AuthProvider.jsx";
import Products from "./pages/Products/Products.jsx";
import Errorpage from "./pages/Errorpage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement:<Errorpage></Errorpage>,
    children: [
      {
      index:true,
      element: <Home/>,
       },
      {
      path:"/products",
      element: <Products/>,
       },
      
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/Signup",
    element: <Signup />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
  <AuthProvider>
    <RouterProvider router={router}>
      <Root />
    </RouterProvider>
    </AuthProvider>
  </StrictMode>
);
