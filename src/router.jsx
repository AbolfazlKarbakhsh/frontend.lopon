import { createBrowserRouter } from "react-router-dom";

// Auth Routing Components
import Page404 from "@pages/Page404";
import IdentityLayout from "@layouts/Identity/IdentityLayout";
import LoginMainNumber from "@features/auth/main/LoginMainNumber";
import LoginMainOtp from "./features/auth/main/LoginMainOtp";

// Layout main
import MainLayout from "@layouts/main/MainLayout";

// pages
import Home from "@pages/app/Home";
import Business from "@pages/app/Business";
import Cart from "@pages/app/Cart";
import Orders from "@pages/app/Orders";
import Profile from "@pages/app/Profile";
import PayList from "@pages/app/PayList";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    path: "/",
    children: [
      {
        element: <Home />,
        errorElement: <Home />,
        index: true,
      },
      {
        element: <Business />,
        errorElement: <Business />,
        path: "/business/:id",
      },
      {
        element: <Cart />,
        errorElement: <Cart />,
        path: "/cart",
      },
      {
        element: <Orders />,
        errorElement: <Orders />,
        path: "/orders",
      },
      {
        element: <Orders />,
        errorElement: <Orders />,
        path: "/profile/orders",
      },
      {
        element: <Profile />,
        errorElement: <Profile />,
        path: "/profile",
      },
      {
        element: <PayList />,
        errorElement: <PayList />,
        path: "/profile/myPaymentList",
      },
    ],
  },
  {
    element: <IdentityLayout />,
    children: [
      {
        path: "login",
        element: <LoginMainNumber />,
        errorElement: <LoginMainNumber />,
      },
      {
        path: 'login/otp/:phone',
        element: <LoginMainOtp />,
        errorElement: <LoginMainOtp />,
      }
    ],
  },
  {
    path: "*",
    element: <Page404 />,
  },
]);

export default router;
