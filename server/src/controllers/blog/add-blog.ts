import User from "../../models/user-model.js";
import { asyncErrorHandler } from "../../utils/asynErrroHandler.js";
import { StatusCodes } from "http-status-codes";
import { BlogDto } from "../../dtos/post-dto.js";
import Blog from "../../models/blog-model.js";
import { NotFoundError } from "../../utils/errorTypes.js";

export const addBlog = asyncErrorHandler(async (req, res) => {
    const input = req.body as BlogDto;

    const user = await User.findOne({ _id: req.user?.id });
    if (!user) throw new NotFoundError("User not found");

    await Blog.create({
        title: input.title,
        content: input.content,
        description: input.description,
        cover: req.file?.filename,
        writtenBy: user?.id,
    });

    return res.status(StatusCodes.OK).json({
        success: true,
        message: "Blog created",
    });
});
