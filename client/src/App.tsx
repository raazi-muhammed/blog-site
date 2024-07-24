import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import AuthLayout from "./components/layouts/AuthLayout";
import HomeScreen from "./pages/homeScreen";
import NavBarLayout from "./components/layouts/NavBarLayout";

const router = createBrowserRouter([
    {
        element: <NavBarLayout />,
        path: "/",
        children: [
            {
                index: true,
                element: <HomeScreen />,
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
