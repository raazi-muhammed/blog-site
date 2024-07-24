import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email().min(2),
    password: z.string().min(7, {
        message: "Password must be at least 7 characters.",
    }),
});

export type LoginDto = z.infer<typeof loginSchema>;
