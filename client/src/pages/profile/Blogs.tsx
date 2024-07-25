import { CardTitle } from "@/components/ui/card";
import { Blog } from "@/types/entities";
import { getUserBlogs } from "@/services/BlogService";
import { useQuery } from "@/hooks/useQuery";
import Spinner from "@/components/spinners/Spinner";

import BlogCard from "./BlogCard";

export default function Blogs() {
    const { data: blogs, loading } = useQuery<Blog[]>({
        service: () => getUserBlogs(),
        initial: [],
    });

    return (
        <section>
            <CardTitle className="my-4 text-primary">My blogs</CardTitle>
            <Spinner isLoading={loading} />
            {blogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
            ))}
        </section>
    );
}
