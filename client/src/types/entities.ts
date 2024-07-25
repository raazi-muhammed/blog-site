export type Blog = {
    id: string;
    title: string;
    description: string;
    content: string;
    cover?: string;
    writtenBy: User;
};
export type User = {
    name: string;
    avatar?: string;
    email: string;
};
