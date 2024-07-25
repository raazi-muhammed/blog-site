import User from "../../models/user-model.js";
import { asyncErrorHandler } from "../../utils/asynErrroHandler.js";
import { StatusCodes } from "http-status-codes";
import { BlogDto } from "../../dtos/post-dto.js";
import Blog from "../../models/blog-model.js";

export const editBlog = asyncErrorHandler(async (req, res) => {
    const input = req.body as BlogDto;

    await Blog.updateOne(
        { _id: req.params.id },
        {
            title: input.title,
            content: input.content,
            description: input.description,
            cover: req.file?.filename,
        }
    );

    return res.status(StatusCodes.OK).json({
        success: true,
        message: "Blog edited",
    });
});
