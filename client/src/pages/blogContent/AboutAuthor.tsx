import { User } from "@/types/entities";

export default function AboutAuthor({ user }: { user: User }) {
    return (
        <section className="mt-12 border bg-card py-8">
            <div className="container">
                <p>Written by</p>
                <p className="font-display text-2xl">{user.name}</p>
            </div>
        </section>
    );
}
