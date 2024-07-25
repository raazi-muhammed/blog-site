import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { authRoutes } from "./routes/auth-routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { blogRoutes } from "./routes/blog-routes.js";
import { userRoutes } from "./routes/user-routes.js";

dotenv.config();
const app: Express = express();

const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use("/public", express.static("./public"));
app.use(
    express.json({
        limit: "50mb",
    })
);

app.use("/users", userRoutes);
app.use("/blogs", blogRoutes);
app.use(authRoutes);
app.use(errorHandler);

app.all("", (req: Request, res: Response) => {
    res.json({ message: "Hello world" });
});

export default app;
