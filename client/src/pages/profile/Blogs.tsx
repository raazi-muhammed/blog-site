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
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { BlogForm } from "@/components/forms/BlogForm";
import { useEffect, useState } from "react";
import { Blog } from "@/types/entities";
import { getUserBlogs } from "@/services/BlogService";
import { deleteBlog, editBlog } from "@/services/BlogService";
import { BlogDto } from "@/dto/blogDto";
import { toast } from "@/components/ui/use-toast";
import { AxiosError } from "axios";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function Blogs() {
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        getUserBlogs().then((res) => {
            setBlogs(res.data.data);
        });
    }, []);

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
    async function handleDelete(id: string) {
        try {
            await deleteBlog(id).then(() => {
                toast({ description: "Deleted" });
            });
        } catch (error) {}
    }

    return (
        <section>
            <h3 className="my-2 text-2xl font-bold">My blogs</h3>
            {blogs.map((blog) => (
                <Card className="mb-4 flex justify-between">
                    <div>
                        <CardHeader>
                            <CardTitle>{blog.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="-mt-2">
                            <p>{blog.description}</p>
                        </CardContent>
                    </div>
                    <CardFooter className="mt-auto flex gap-2">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button>Edit</Button>
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
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive">Delete</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        Are you absolutely sure?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will
                                        permanently delete your account and
                                        remove your data from our servers.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={() => handleDelete(blog.id)}>
                                        Delete
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </CardFooter>
                </Card>
            ))}
        </section>
    );
}
