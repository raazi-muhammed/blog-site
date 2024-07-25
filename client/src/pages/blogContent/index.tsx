import { Separator } from "@/components/ui/separator";
import { SERVER_URL } from "@/constants/server";
import { getBlog } from "@/services/BlogService";
import { Blog } from "@/types/entities";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
                    <img
                        className="-mt-8 h-72 w-full object-cover"
                        src={`${SERVER_URL}/public/${blog?.cover}`}
                        alt=""
                    />
                    <section className="container mt-8">
                        <h3 className="font-display text-5xl font-bold">
                            {blog.title}
                        </h3>
                        <Separator className="my-4" />
                        <div
                            className="min-h-[50vh]"
                            dangerouslySetInnerHTML={{
                                __html: blog.content,
                            }}></div>
                    </section>
                    <section className="mt-12 border bg-card py-8">
                        <div className="container">
                            <p>Written by</p>
                            <p className="font-display text-2xl">
                                {blog.writtenBy.name}
                            </p>
                        </div>
                    </section>
                </>
            )}
        </main>
    );
}
