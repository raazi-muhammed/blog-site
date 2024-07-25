import { getBlogs } from "@/services/BlogService";
import { Blog } from "@/types/entities";
import { useQuery } from "@/hooks/useQuery";
import Spinner from "@/components/spinners/Spinner";
import BlogCard from "./BlogCard";
import BlogContainer from "./BlogContainer";
import Container from "@/components/layouts/Container";

export default function HomeScreen() {
    const { data: blogs, loading } = useQuery<Blog[]>({
        service: () => getBlogs(),
        initial: [],
    });

    return (
        <Container>
            <Spinner type="normal" isLoading={loading} />
            <BlogContainer>
                {blogs.map((blog) => (
                    <BlogCard blog={blog} />
                ))}
            </BlogContainer>
        </Container>
    );
}
