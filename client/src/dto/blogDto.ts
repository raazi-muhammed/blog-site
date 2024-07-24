import { z } from "zod";

export const blogSchema = z.object({
    title: z.string().min(2),
    content: z.string().min(7, {
        message: "Password must be at least 7 characters.",
    }),
});

export type BlogDto = z.infer<typeof blogSchema>;
