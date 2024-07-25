import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { UserProfileForm } from "@/components/forms/UserProfileForm";
import { Button } from "@/components/ui/button";
import { Pencil as EditIcon } from "lucide-react";
import { User } from "@/types/entities";

export default function EditProfile({ user }: { user: User }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <EditIcon className="me-2 size-4" />
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogDescription>
                        <UserProfileForm defaultValues={user} />
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
