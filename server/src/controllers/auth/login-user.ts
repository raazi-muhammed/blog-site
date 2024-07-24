import { LoginDto } from "../../dtos/auth-dto.js";
import User from "../../models/user-model.js";
import { asyncErrorHandler } from "../../utils/asynErrroHandler.js";
import { StatusCodes } from "http-status-codes";

export const loginUser = asyncErrorHandler(async (req, res) => {
    const userInput = req.body as LoginDto;

    const user = await User.find({
        email: userInput.email,
        password: userInput.password,
    });

    return res.status(StatusCodes.OK).json({
        success: true,
        user,
    });
});
