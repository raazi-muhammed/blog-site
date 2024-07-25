import { Separator } from "@/components/ui/separator";
import { getBlog } from "@/services/BlogService";
import { Blog } from "@/types/entities";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CoverImage from "./CoverImage";
import BlogHtml from "./BlogHtml";
import AboutAuthor from "./AboutAuthor";
import Container from "@/components/layouts/Container";

export default function BlogContent() {
    const params = useParams();
    const [blog, setBlog] = useState<Blog | null>(null);

    useEffect(() => {
        getBlog(params.id || "").then((res) => {
            setBlog(res.data.data);
        });
    });

    return (
        <main>
            {blog && (
                <>
                    <CoverImage coverUrl={blog.cover} />
                    <Container className="mt-8">
                        <h3 className="font-display text-5xl font-bold">
                            {blog.title}
                        </h3>
                        <Separator className="my-4" />
                        <BlogHtml content={blog.content} />
                    </Container>
                    <AboutAuthor user={blog.writtenBy} />
                </>
            )}
        </main>
    );
}
