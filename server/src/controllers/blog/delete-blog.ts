import { asyncErrorHandler } from "../../utils/asynErrroHandler.js";
import { StatusCodes } from "http-status-codes";
import Blog from "../../models/blog-model.js";

export const deleteBlog = asyncErrorHandler(async (req, res) => {
    await Blog.updateOne(
        { _id: req.params.id },
        {
            deletedAt: new Date(),
        }
    );

    return res.status(StatusCodes.OK).json({
        success: true,
        message: "Blog deleted",
    });
});
