import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { authRoutes } from "./routes/authRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

dotenv.config();

const app: Express = express();

const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(
    express.json({
        limit: "50mb",
    })
);

app.use(authRoutes);
app.use(errorHandler);

app.all("", (req: Request, res: Response) => {
    res.json({ message: "Hello world" });
});

export default app;
