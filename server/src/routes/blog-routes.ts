import express, { NextFunction, Request, Response } from "express";
import { validateHandler } from "../middlewares/validateHandler.js";
import { addBlog } from "../controllers/blog/add-blog.js";
import { getBlogs } from "../controllers/blog/get-blogs.js";
import { upload } from "../utils/storage.js";
import { getBlog } from "../controllers/blog/get-blog.js";
import { getUserBlogs } from "../controllers/blog/get-user-blogs.js";
import { verifyUser } from "../middlewares/verifyUser.js";
import { editBlog } from "../controllers/blog/edit-blog.js";
import { deleteBlog } from "../controllers/blog/delete-blog.js";
const router = express.Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
    getBlogs(req, res, next);
});
router.get(
    "/users",
    verifyUser,
    (req: Request, res: Response, next: NextFunction) => {
        getUserBlogs(req, res, next);
    }
);

router.get("/:id", (req: Request, res: Response, next: NextFunction) => {
    getBlog(req, res, next);
});

router.post(
    "/",
    verifyUser,
    validateHandler,
    upload.single("cover"),
    (req: Request, res: Response, next: NextFunction) => {
        addBlog(req, res, next);
    }
);

router.put(
    "/:id",
    verifyUser,
    validateHandler,
    upload.single("cover"),
    (req: Request, res: Response, next: NextFunction) => {
        editBlog(req, res, next);
    }
);
router.delete(
    "/:id",
    verifyUser,
    (req: Request, res: Response, next: NextFunction) => {
        deleteBlog(req, res, next);
    }
);

export const blogRoutes = router;
