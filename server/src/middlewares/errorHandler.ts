import { NextFunction, Request, Response } from "express";
import { Error } from "mongoose";

export const errorHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(error);
    res.status(500).json({
        errors: [{ message: error.message || "Something went wrong" }],
    });
};
