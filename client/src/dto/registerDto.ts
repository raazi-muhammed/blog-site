import { z } from "zod";

export const registerSchema = z.object({
    name: z.string().min(2, {
        message: "Password must be at least 2 characters.",
    }),
    email: z.string().email(),
    password: z.string().min(7, {
        message: "Password must be at least 7 characters.",
    }),
});

export type RegisterDto = z.infer<typeof registerSchema>;
