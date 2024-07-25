import { z } from "zod";

export const blogSchema = z.object({
    title: z.string().min(2),
    description: z.string().min(7, {
        message: "Description must be at least 7 characters.",
    }),
    content: z.string().min(7, {
        message: "Content must be at least 7 characters.",
    }),
    cover: z.any(),
});

export type BlogDto = z.infer<typeof blogSchema>;
