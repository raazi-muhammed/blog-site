import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

const app: Express = express();
app.all("", (req: Request, res: Response) => {
    res.json({ message: "Hello world" });
});

export default app;
