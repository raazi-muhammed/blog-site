import { getBlogs } from "@/services/BlogService";
import { Blog } from "@/types/entities";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { SERVER_URL } from "@/constants/server";
import { Link } from "react-router-dom";
import { useQuery } from "@/hooks/useQuery";
import Spinner from "@/components/spinners/Spinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { generateFallbackAvatar } from "@/lib/utils";

export default function HomeScreen() {
    const { data: blogs, loading } = useQuery<Blog[]>({
        service: () => getBlogs(),
        initial: [],
    });

    return (
        <main className="container">
            <Spinner type="normal" isLoading={loading} />
            <section className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
                {blogs.map((blog) => (
                    <Link to={`/blogs/${blog.id}`}>
                        <Card className="border shadow-none" key={blog.id}>
                            <CardHeader>
                                <img
                                    className="h-48 w-full rounded border object-cover shadow"
                                    src={`${SERVER_URL}/public/${blog.cover}`}
                                    alt=""
                                />
                            </CardHeader>
                            <CardContent>
                                <CardTitle>{blog.title}</CardTitle>
                                <p>{blog.description}</p>
                            </CardContent>
                            <CardFooter className="flex gap-2">
                                <Avatar className="size-8">
                                    <AvatarImage
                                        src={`${SERVER_URL}/public/${blog.writtenBy.avatar}`}
                                    />
                                    <AvatarFallback>
                                        {generateFallbackAvatar(
                                            blog.writtenBy.name
                                        )}
                                    </AvatarFallback>
                                </Avatar>
                                <p>{blog.writtenBy.name}</p>
                            </CardFooter>
                        </Card>
                    </Link>
                ))}
            </section>
        </main>
    );
}
