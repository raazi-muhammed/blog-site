import express, { NextFunction, Request, Response } from "express";
import { validateHandler } from "../middlewares/validateHandler.js";
import { addBlog } from "../controllers/blog/add-blog.js";
import { getBlogs } from "../controllers/blog/get-blogs.js";
import { upload } from "../utils/storage.js";
import { getBlog } from "../controllers/blog/get-blog.js";
const router = express.Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
    getBlogs(req, res, next);
});

router.get("/:id", (req: Request, res: Response, next: NextFunction) => {
    getBlog(req, res, next);
});

router.post(
    "/",
    validateHandler,
    upload.single("cover"),
    (req: Request, res: Response, next: NextFunction) => {
        addBlog(req, res, next);
    }
);

export const blogRoutes = router;
