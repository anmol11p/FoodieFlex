import { createHashRouter, RouterProvider } from "react-router-dom";
import Applayout from "./layout/Applayout";
import ErrorPage from "./Error/Error";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Menu from "./pages/Menu";
import MyOrder from "./pages/MyOrder";

function App() {
  const Router = createHashRouter([
    {
      path: "/",
      element: <Applayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "menu",
          element: <Menu />,
        },
        { path: "signup", element: <SignUp /> },
        { path: "login", element: <Login /> },
        {
          path: "orders",
          element: <MyOrder />,
        },
      ],
    },
  ]);

  return <RouterProvider router={Router} />;
}

export default App;
