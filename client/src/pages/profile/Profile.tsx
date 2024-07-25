import { Button } from "@/components/ui/button";
import { getProfile } from "@/services/UserService";
import { Blog, User } from "@/types/entities";
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
import { deleteBlog, editBlog, getUserBlogs } from "@/services/BlogService";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { BlogForm } from "@/components/forms/BlogForm";
import { BlogDto } from "@/dto/blogDto";
import { toast } from "@/components/ui/use-toast";
import { AxiosError } from "axios";
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

export default function Profile() {
    const [user, setUser] = useState<User | null>(null);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        getProfile().then((res) => {
            setUser(res.data.data);
        });
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
            <section>
                <h3>My blogs</h3>
                {blogs.map((blog) => (
                    <Card className="mb-4">
                        <CardHeader>
                            <p>{blog.title}</p>
                        </CardHeader>
                        <CardContent>
                            <p>{blog.description}</p>
                        </CardContent>
                        <CardFooter>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button>Edit</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Create a blog</DialogTitle>
                                        <DialogDescription>
                                            <BlogForm
                                                onSubmit={onSubmitCreator(
                                                    blog.id
                                                )}
                                                defaultValues={blog}
                                            />
                                        </DialogDescription>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>
                            <AlertDialog>
                                <AlertDialogTrigger>Delete</AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>
                                            Are you absolutely sure?
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This
                                            will permanently delete your account
                                            and remove your data from our
                                            servers.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>
                                            Cancel
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={() =>
                                                handleDelete(blog.id)
                                            }>
                                            Delete
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </CardFooter>
                    </Card>
                ))}
            </section>
        </main>
    );
}
