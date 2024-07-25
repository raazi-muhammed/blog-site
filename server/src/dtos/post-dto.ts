import { body, check } from "express-validator";

export const blogSchema = [
    check("title").isLength({ min: 3 }),
    check("content").isLength({ min: 10 }),
];

export type BlogDto = {
    title: string;
    content: string;
    description: string;
    cover?: string;
};
