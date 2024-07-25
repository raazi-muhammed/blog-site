import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import AuthLayout from "./components/layouts/AuthLayout";
import HomeScreen from "./pages/homeScreen";
import NavBarLayout from "./components/layouts/NavBarLayout";
import Profile from "./pages/profile/Profile";
import "./lib/interseptor";

const router = createBrowserRouter([
    {
        element: <NavBarLayout />,
        path: "/",
        children: [
            {
                index: true,
                element: <HomeScreen />,
            },
            {
                path: "/profile",
                element: <Profile />,
            },
        ],
    },
    {
        path: "/",
        element: <AuthLayout />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
        ],
    },
]);

export default function App() {
    return <RouterProvider router={router} />;
}
