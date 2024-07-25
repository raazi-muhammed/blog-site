import { SERVER_URL } from "@/constants/server";

export default function CoverImage({ coverUrl = "" }: { coverUrl?: string }) {
    return (
        <img
            className="-mt-8 h-72 w-full object-cover"
            src={`${SERVER_URL}/public/${coverUrl}`}
            alt=""
        />
    );
}
