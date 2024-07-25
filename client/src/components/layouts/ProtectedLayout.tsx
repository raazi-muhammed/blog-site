import { useAppSelector } from "@/store";
import { Outlet, useNavigate } from "react-router-dom";

export default function ProtectedLayout() {
    const { isAuth, isLoading } = useAppSelector((state) => state.authReducer);
    const navigate = useNavigate();

    if (isLoading) {
        return <p>Loading</p>;
    }

    if (!isAuth) {
        navigate("/login");
        return <p>No auth</p>;
    }

    return <Outlet />;
}
