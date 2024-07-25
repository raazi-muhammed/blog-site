import AddBlog from "@/pages/addBlog";
import { Link, Outlet } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { generateFallbackAvatar } from "@/lib/utils";
import { SERVER_URL } from "@/constants/server";
import { useAppSelector } from "@/store";
import { Button } from "../ui/button";

export default function NavBarLayout() {
    const user = useAppSelector((state) => state.authReducer.userData);
    return (
        <>
            <header className="sticky top-0 mb-6 bg-accent py-4 shadow">
                <div className="container flex justify-between">
                    <Link to="/">
                        <p className="mb-0 mt-auto text-3xl font-bold">
                            Blogs
                        </p>
                    </Link>
                    <nav className="flex gap-4 align-middle">
                        <AddBlog />
                        {user ? (
                            <Link to="/profile">
                                <Avatar className="size-10">
                                    <AvatarImage
                                        src={`${SERVER_URL}/public/${user.avatar}`}
                                    />
                                    <AvatarFallback>
                                        {generateFallbackAvatar(user.name)}
                                    </AvatarFallback>
                                </Avatar>
                            </Link>
                        ) : (
                            <Link to="/login">
                                <Button>Login</Button>
                            </Link>
                        )}
                    </nav>
                </div>
            </header>
            <Outlet />
        </>
    );
}
