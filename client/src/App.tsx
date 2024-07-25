import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import AuthLayout from "./components/layouts/AuthLayout";
import HomeScreen from "./pages/homeScreen";
import NavBarLayout from "./components/layouts/NavBarLayout";
import Profile from "./pages/profile";
import "./lib/interseptor";
import BlogContent from "./pages/blogContent";

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
                path: "/blogs/:id",
                element: <BlogContent />,
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
