import { asyncErrorHandler } from "../../utils/asynErrroHandler.js";
import { StatusCodes } from "http-status-codes";
import Blog from "../../models/blog-model.js";

export const getBlogs = asyncErrorHandler(async (req, res) => {
    const blogs = await Blog.find().populate("writtenBy");

    return res.status(StatusCodes.OK).json({
        success: true,
        data: blogs,
    });
});
