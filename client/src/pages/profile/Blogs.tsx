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
import { useQuery } from "@/hooks/useQuery";
import Spinner from "@/components/spinners/Spinner";
import { Pencil as EditIcon, Trash2 as DeleteIcon } from "lucide-react";
import { SERVER_URL } from "@/constants/server";

export default function Blogs() {
    const { data: blogs, loading } = useQuery<Blog[]>({
        service: () => getUserBlogs(),
        initial: [],
    });

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
            <CardTitle className="my-4 text-primary">My blogs</CardTitle>
            <Spinner isLoading={loading} />
            {blogs.map((blog) => (
                <Card className="mb-4 flex flex-col gap-6 border p-6 shadow-none md:flex-row">
                    <CardHeader className="flex-shrink-0 p-0">
                        <img
                            className="aspect-square w-32 rounded border object-cover shadow"
                            src={`${SERVER_URL}/public/${blog.cover}`}
                            alt=""
                        />
                    </CardHeader>
                    <CardContent className="my-auto p-0">
                        <CardTitle className="text-xl">{blog.title}</CardTitle>
                        <p>{blog.description}</p>
                    </CardContent>
                    <CardFooter className="my-auto ms-auto grid grid-cols-2 gap-2 p-0 md:grid-cols-1">
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
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-destructive text-destructive">
                                    <DeleteIcon className="me-2 size-4" />
                                    Delete
                                </Button>
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
