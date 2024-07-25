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
import { toast } from "@/components/ui/use-toast";
import { BlogDto } from "@/dto/blogDto";
import { addBlog } from "@/services/BlogService";
import { AxiosError } from "axios";

export default function AddBlog() {
    async function onSubmit(values: BlogDto) {
        const data = new FormData();
        data.append("title", values.title);
        data.append("description", values.description);
        data.append("content", values.content);

        if (values.cover) {
            data.append("cover", values.cover[0]);
        }

        try {
            await addBlog(data);
            toast({
                description: "Blog created",
            });
        } catch (error) {
            let errorMessage = "Blog adding failed";
            if (error instanceof AxiosError)
                errorMessage = error.response?.data.errors[0].message;
            toast({
                description: errorMessage,
            });
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button> Create new</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a blog</DialogTitle>
                    <DialogDescription>
                        <BlogForm onSubmit={onSubmit} />
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
