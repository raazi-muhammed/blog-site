import { asyncErrorHandler } from "../../utils/asynErrroHandler.js";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../../utils/errorTypes.js";
import User from "../../models/user-model.js";

export const getUser = asyncErrorHandler(async (req, res) => {
    const user = await User.findOne({ email: req.user?.email });
    if (!user) throw new NotFoundError("User not found");

    return res.status(StatusCodes.OK).json({
        success: true,
        data: user,
    });
});
