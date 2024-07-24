import { body } from "express-validator";

export const blogSchema = [
    body("title").isLength({ min: 3 }),
    body("content").isLength({ min: 10 }),
];

export type BlogDto = {
    title: string;
    content: string;
};
