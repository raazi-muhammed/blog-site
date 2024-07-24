import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/login";

const router = createBrowserRouter([
    {
        path: "/",
        element: <div>Hello world!</div>,
        errorElement: <h1>Not found</h1>,
    },
    {
        path: "/login",
        element: <Login />,
    },
]);

export default function App() {
    return <RouterProvider router={router} />;
}
