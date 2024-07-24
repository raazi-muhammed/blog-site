import express, { NextFunction, Request, Response } from "express";
import { loginUser } from "../controllers/auth/login-user.js";
import { validateHandler } from "../middlewares/validateHandler.js";
import { loginSchema, registerSchema } from "../dtos/auth-dto.js";
import { registerUser } from "../controllers/auth/register-user.js";
const router = express.Router();

router.post(
    "/login",
    loginSchema,
    validateHandler,
    (req: Request, res: Response, next: NextFunction) => {
        loginUser(req, res, next);
    }
);

router.post(
    "/register",
    registerSchema,
    validateHandler,
    (req: Request, res: Response, next: NextFunction) => {
        registerUser(req, res, next);
    }
);

export const authRoutes = router;
