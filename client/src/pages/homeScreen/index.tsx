import { getBlogs } from "@/services/BlogService";
import { Blog } from "@/types/entities";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { SERVER_URL } from "@/constants/server";
import { Link } from "react-router-dom";
import { useQuery } from "@/hooks/useQuery";
import Spinner from "@/components/spinners/Spinner";

export default function HomeScreen() {
    const { data: blogs, loading } = useQuery<Blog[]>({
        service: () => getBlogs(),
        initial: [],
    });

    return (
        <main className="container">
            <Spinner type="normal" isLoading={loading} />
            {blogs.map((blog) => (
                <Link to={`/blogs/${blog.id}`}>
                    <Card
                        key={blog.id}
                        style={{
                            backgroundImage: `url(${SERVER_URL}/public/${blog?.cover})`,
                            backgroundSize: "cover",
                        }}
                        className={`relative mb-4 min-h-44 border`}>
                        <CardContent className="absolute inset-0 flex w-full flex-col justify-end rounded bg-gradient-to-t from-foreground text-background">
                            <CardTitle>{blog.title}</CardTitle>
                            <p>{blog.description}</p>
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </main>
    );
}
