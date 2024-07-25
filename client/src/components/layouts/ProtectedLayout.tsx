import { useAppSelector } from "@/store";
import { Outlet, useNavigate } from "react-router-dom";
import Spinner from "../spinners/Spinner";

export default function ProtectedLayout() {
    const { isAuth, isLoading } = useAppSelector((state) => state.authReducer);
    const navigate = useNavigate();

    if (isLoading) {
        return <Spinner isLoading={true} />;
    }

    if (!isAuth) {
        navigate("/login");
        return <p>No auth</p>;
    }

    return <Outlet />;
}
