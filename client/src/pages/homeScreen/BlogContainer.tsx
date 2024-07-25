import { ReactNode } from "react";

export default function BlogContainer({ children }: { children: ReactNode }) {
    return (
        <section className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
            {children}
        </section>
    );
}
