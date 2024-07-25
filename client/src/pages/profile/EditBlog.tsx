import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { BlogForm } from "@/components/forms/BlogForm";
import { Button } from "@/components/ui/button";
import { Pencil as EditIcon } from "lucide-react";
import { editBlog } from "@/services/BlogService";
import { toast } from "@/components/ui/use-toast";
import { AxiosError } from "axios";
import { BlogDto } from "@/dto/blogDto";
import { Blog } from "@/types/entities";

export default function EditBlog({ blog }: { blog: Blog }) {
    function onSubmitCreator(id: string) {
        return async function onSubmit(values: BlogDto) {
            const data = new FormData();
            data.append("title", values.title);
            data.append("description", values.description);
            data.append("content", values.content);

            if (values.cover) {
                data.append("cover", values.cover[0]);
            }

            try {
                await editBlog({ id, values: data });
                toast({
                    description: "Blog edited",
                });
            } catch (error) {
                let errorMessage = "Blog edited failed";
                if (error instanceof AxiosError)
                    errorMessage = error.response?.data.errors[0].message;
                toast({
                    description: errorMessage,
                });
            }
        };
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    size="sm"
                    variant="outline"
                    className="border-primary text-primary">
                    <EditIcon className="me-2 size-4" />
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a blog</DialogTitle>
                    <DialogDescription>
                        <BlogForm
                            onSubmit={onSubmitCreator(blog.id)}
                            defaultValues={blog}
                        />
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
