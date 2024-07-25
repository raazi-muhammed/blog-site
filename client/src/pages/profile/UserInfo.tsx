import { SERVER_URL } from "@/constants/server";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { generateFallbackAvatar } from "@/lib/utils";
import { User } from "@/types/entities";

export default function UserInfo({ user }: { user: User }) {
    return (
        <section className="flex gap-2 align-middle">
            <Avatar className="size-16">
                <AvatarImage src={`${SERVER_URL}/public/${user?.avatar}`} />
                <AvatarFallback>
                    {generateFallbackAvatar(user?.name || "")}
                </AvatarFallback>
            </Avatar>
            <div className="my-auto">
                <p className="text-xl font-semibold">{user?.name}</p>
                <p>{user?.email}</p>
            </div>
        </section>
    );
}
