import { z } from "zod";

export const verifySchema = z.object({
    code: z.string(),
    email: z.string().email(),
});

export type VerifyDto = z.infer<typeof verifySchema>;
