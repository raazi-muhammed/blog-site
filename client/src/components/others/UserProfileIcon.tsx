import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { generateFallbackAvatar } from "@/lib/utils";
import { SERVER_URL } from "@/constants/server";
import { Button } from "../ui/button";
import { useAppSelector } from "@/store";

export function UserProfileIcon() {
    const user = useAppSelector((state) => state.authReducer.userData);

    return (
        <>
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
        </>
    );
}
