import { LoginDto } from "../../dtos/auth-dto.js";
import User from "../../models/user-model.js";
import { asyncErrorHandler } from "../../utils/asynErrroHandler.js";
import { StatusCodes } from "http-status-codes";
import { NotFoundError, UnauthorizedError } from "../../utils/errorTypes.js";
import { tokenOptions, tokenName } from "../../config/constants.js";

export const loginUser = asyncErrorHandler(async (req, res) => {
    const userInput = req.body as LoginDto;

    const user = await User.findOne({
        email: userInput.email,
    });

    if (!user) throw new NotFoundError("User not found");

    const isPasswordCorrect = await user.comparePassword(userInput.password);
    if (!isPasswordCorrect) throw new UnauthorizedError("Password incorrect");

    if (!user.isVerified) throw new UnauthorizedError("Account not verified");

    const token = user.getJwtToken();

    return res
        .status(StatusCodes.OK)
        .cookie(tokenName, token, tokenOptions)
        .json({
            success: true,
            user,
        });
});
