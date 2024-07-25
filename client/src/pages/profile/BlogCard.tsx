import { Blog } from "@/types/entities";
import { SERVER_URL } from "@/constants/server";
import EditBlog from "./EditBlog";
import DeleteBlog from "./DeleteBlog";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function BlogCard({ blog }: { blog: Blog }) {
    return (
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
                <EditBlog blog={blog} />
                <DeleteBlog blog={blog} />
            </CardFooter>
        </Card>
    );
}
