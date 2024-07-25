import { useEffect, useState } from "react";
import { getBlogs } from "@/services/BlogService";
import { Blog } from "@/types/entities";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { SERVER_URL } from "@/constants/server";
import { Link } from "react-router-dom";

export default function HomeScreen() {
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        getBlogs().then((res) => {
            setBlogs(res.data.data);
        });
    }, []);

    return (
        <main className="container">
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
