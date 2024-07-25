import { asyncErrorHandler } from "../../utils/asynErrroHandler.js";
import { StatusCodes } from "http-status-codes";
import Blog from "../../models/blog-model.js";
import { BadRequestError, NotFoundError } from "../../utils/errorTypes.js";

export const getBlog = asyncErrorHandler(async (req, res) => {
    const blogId = req.params.id;
    if (!blogId) throw new BadRequestError("Blog id invalid");

    const blog = await Blog.findOne({ _id: req.params.id }).populate(
        "writtenBy"
    );

    if (!blog) throw new NotFoundError("Blog not found");

    return res.status(StatusCodes.OK).json({
        success: true,
        data: blog,
    });
});
