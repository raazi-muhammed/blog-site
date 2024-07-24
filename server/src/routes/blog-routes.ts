import express, { NextFunction, Request, Response } from "express";
import { validateHandler } from "../middlewares/validateHandler.js";
import { blogSchema } from "../dtos/post-dto.js";
import { addBlog } from "../controllers/blog/add-blog.js";
import { getBlogs } from "../controllers/blog/get-blogs.js";
const router = express.Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
    getBlogs(req, res, next);
});

router.post(
    "/",
    blogSchema,
    validateHandler,
    (req: Request, res: Response, next: NextFunction) => {
        addBlog(req, res, next);
    }
);

export const blogRoutes = router;
