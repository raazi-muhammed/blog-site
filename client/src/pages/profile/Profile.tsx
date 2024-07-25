import { Button } from "@/components/ui/button";
import { getProfile } from "@/services/UserService";
import { User } from "@/types/entities";
import { useEffect, useState } from "react";
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

export default function Profile() {
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        getProfile().then((res) => {
            setUser(res.data.data);
        });
    }, []);

    return (
        <main className="container">
            <header className="flex justify-between">
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
            </header>
        </main>
    );
}
