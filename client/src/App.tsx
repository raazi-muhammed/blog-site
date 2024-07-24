import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import AuthLayout from "./components/layouts/AuthLayout";
import HomeScreen from "./pages/homeScreen";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeScreen />,
        errorElement: <h1>Not found</h1>,
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
