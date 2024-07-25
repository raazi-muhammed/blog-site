import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { SERVER_URL } from "@/constants/server";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { generateFallbackAvatar } from "@/lib/utils";
import { Blog } from "@/types/entities";

export default function BlogCard({ blog }: { blog: Blog }) {
    return (
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
                            {generateFallbackAvatar(blog.writtenBy.name)}
                        </AvatarFallback>
                    </Avatar>
                    <p>{blog.writtenBy.name}</p>
                </CardFooter>
            </Card>
        </Link>
    );
}
