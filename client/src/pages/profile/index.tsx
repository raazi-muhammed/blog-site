import { getProfile } from "@/services/UserService";
import { User } from "@/types/entities";

import { Separator } from "@/components/ui/separator";
import Blogs from "./Blogs";

import { useQuery } from "@/hooks/useQuery";
import Spinner from "@/components/spinners/Spinner";
import UserInfo from "./UserInfo";
import EditProfile from "./EditProfile";
import UserLogout from "./UserLogout";

export default function Profile() {
    const { data: user, loading } = useQuery<User | null>({
        service: () => getProfile(),
        initial: null,
    });

    return (
        <main className="container">
            <Spinner isLoading={loading} />
            {!!user && (
                <header className="flex flex-col justify-between gap-6 md:flex-row">
                    <UserInfo user={user} />
                    <section className="flex gap-4">
                        <EditProfile user={user} />
                        <UserLogout />
                    </section>
                </header>
            )}
            <Separator className="my-4" />
            <Blogs />
        </main>
    );
}
