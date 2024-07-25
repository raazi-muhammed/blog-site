import express, { NextFunction, Request, Response } from "express";
import { verifyUser } from "../middlewares/verifyUser.js";
import { getUser } from "../controllers/user/get-user.js";
import { upload } from "../utils/storage.js";
import { editUser } from "../controllers/user/edit-user.js";

const router = express.Router();

router.get(
    "/current",
    verifyUser,
    (req: Request, res: Response, next: NextFunction) => {
        getUser(req, res, next);
    }
);

router.put(
    "/current",
    verifyUser,
    upload.single("avatar"),
    (req: Request, res: Response, next: NextFunction) => {
        editUser(req, res, next);
    }
);

export const userRoutes = router;
