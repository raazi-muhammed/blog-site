import { BlogForm } from "@/components/forms/BlogForm";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export default function AddBlog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button> Create new</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a blog</DialogTitle>
                    <DialogDescription>
                        <BlogForm />
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
