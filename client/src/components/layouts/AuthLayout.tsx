import { Outlet } from "react-router-dom";

export default function AuthLayout() {
    return (
        <main className="min-h-screen grid place-items-center container">
            <Outlet />
        </main>
    );
}
