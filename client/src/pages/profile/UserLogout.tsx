import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { LogOutIcon } from "lucide-react";
import { logout } from "@/store/features/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userTokenName } from "@/constants/tokens";
import { Button } from "@/components/ui/button";

export default function UserLogout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleLogOut() {
        document.cookie = `${userTokenName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        dispatch(logout());
        navigate("/login");
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive">
                    <LogOutIcon className="me-2 size-4" />
                    Log out
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <Button
                            className="border-destructive-border border bg-destructive"
                            onClick={handleLogOut}>
                            Log out
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
