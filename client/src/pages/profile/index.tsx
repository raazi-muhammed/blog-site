import { Button } from "@/components/ui/button";
import { getProfile } from "@/services/UserService";
import { User } from "@/types/entities";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { UserProfileForm } from "@/components/forms/UserProfileForm";
import { SERVER_URL } from "@/constants/server";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { generateFallbackAvatar } from "@/lib/utils";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Separator } from "@/components/ui/separator";
import Blogs from "./Blogs";
import { logout } from "@/store/features/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userTokenName } from "@/constants/tokens";
import { useQuery } from "@/hooks/useQuery";
import Spinner from "@/components/spinners/Spinner";

export default function Profile() {
    const { data: user, loading } = useQuery<User | null>({
        service: () => getProfile(),
        initial: null,
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleLogOut() {
        document.cookie = `${userTokenName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        dispatch(logout());
        navigate("/login");
    }

    return (
        <main className="container">
            <header className="flex justify-between">
                <Spinner isLoading={loading} />
                <div className="flex gap-2 align-middle">
                    <Avatar className="size-16">
                        <AvatarImage
                            src={`${SERVER_URL}/public/${user?.avatar}`}
                        />
                        <AvatarFallback>
                            {generateFallbackAvatar(user?.name || "")}
                        </AvatarFallback>
                    </Avatar>
                    <div className="my-auto">
                        <p className="text-xl font-semibold">{user?.name}</p>
                        <p>{user?.email}</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline">Edit</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Edit Profile</DialogTitle>
                                <DialogDescription>
                                    <UserProfileForm
                                        defaultValues={user || undefined}
                                    />
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive">Log out</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will
                                    permanently delete your account and remove
                                    your data from our servers.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleLogOut}>
                                    Delete
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </header>
            <Separator className="my-4" />
            <Blogs />
        </main>
    );
}
