import { body } from "express-validator";

export const loginSchema = [
    body("email").isEmail(),
    body("password").isLength({ min: 7 }),
];

export const registerSchema = [
    body("name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isLength({ min: 7 }),
];

export const verificationSchema = [
    body("code").isLength({ min: 6, max: 6 }).isNumeric(),
];

export type RegisterDto = {
    name: string;
    email: string;
    password: string;
};
export type LoginDto = {
    email: string;
    password: string;
};
export type VerificationDto = {
    email: string;
    code: number;
};
