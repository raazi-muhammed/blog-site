import AddBlog from "@/pages/addBlog";
import { Link, Outlet } from "react-router-dom";

export default function NavBarLayout() {
    return (
        <>
            <header className="sticky top-0 mb-6 bg-accent py-4 shadow">
                <div className="container flex justify-between">
                    <p className="text-2xl">Blogs</p>
                    <nav>
                        <div>
                            <AddBlog />
                            <Link to="/profile">Porilfe</Link>
                        </div>
                    </nav>
                </div>
            </header>
            <Outlet />
        </>
    );
}
