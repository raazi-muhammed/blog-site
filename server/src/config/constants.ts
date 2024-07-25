export const JWT_SECRET_KEY: string = process.env.JWT_SECRET_KEY || "test";
export const JWT_EXPIRES: string = process.env.JWT_EXPIRES || "24h";

export const tokenName: string = "__blog-user-token";
export const tokenOptions = {
    expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    secure: false,
    httpOnly: false,
};
