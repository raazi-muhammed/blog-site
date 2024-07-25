import { z } from "zod";

export const userSchema = z.object({
    name: z.string().min(3, "Invalid"),
    avatar: z.any(),
});

export type UserDto = z.infer<typeof userSchema>;
