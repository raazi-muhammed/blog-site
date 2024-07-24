import User from "../../models/user-model.js";
import { asyncErrorHandler } from "../../utils/asynErrroHandler.js";
import { StatusCodes } from "http-status-codes";
import { BlogDto } from "../../dtos/post-dto.js";
import Blog from "../../models/blog-model.js";

export const addBlog = asyncErrorHandler(async (req, res) => {
    const input = req.body as BlogDto;

    const user = await User.findOne();

    await Blog.create({
        title: input.title,
        content: input.content,
        writtenBy: user?.id,
    });

    return res.status(StatusCodes.OK).json({
        success: true,
        message: "Blog created",
    });
});
