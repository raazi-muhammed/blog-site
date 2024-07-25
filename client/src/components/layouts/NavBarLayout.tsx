import AddBlog from "@/pages/addBlog";
import { Link, Outlet } from "react-router-dom";
import { UserProfileIcon } from "../others/UserProfileIcon";

export default function NavBarLayout() {
    return (
        <>
            <header className="sticky top-0 mb-6 bg-accent py-4 shadow">
                <div className="container flex justify-between">
                    <Link to="/" className="mt-auto">
                        <p className="mb-0 mt-auto font-display text-3xl font-bold">
                            Blogs
                        </p>
                    </Link>
                    <nav className="flex gap-4 align-middle">
                        <AddBlog />
                        <UserProfileIcon />
                    </nav>
                </div>
            </header>
            <Outlet />
        </>
    );
}
