import { asyncErrorHandler } from "../../utils/asynErrroHandler.js";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../../utils/errorTypes.js";
import User, { IUser } from "../../models/user-model.js";

export const editUser = asyncErrorHandler(async (req, res) => {
    const input = req.body as IUser;

    const user = await User.updateOne(
        { email: req.user?.email },
        {
            name: input.name,
            avatar: req.file?.filename,
        }
    );

    if (!user) throw new NotFoundError("User not found");

    return res.status(StatusCodes.OK).json({
        success: true,
        data: user,
    });
});
