import { useEffect, useState } from "react";
import { getBlogs } from "@/services/BlogService";
import { Blog } from "@/types/entities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
                <Card key={blog.id} className="mb-4 border">
                    <CardHeader>
                        <CardTitle>{blog.title}</CardTitle>
                    </CardHeader>
                    <CardContent>{blog.content}</CardContent>
                </Card>
            ))}
        </main>
    );
}
