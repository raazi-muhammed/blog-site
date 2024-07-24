import { StatusCodes } from "http-status-codes";
import { asyncErrorHandler } from "../../utils/asynErrroHandler.js";
import User from "../../models/user-model.js";
import { RegisterDto } from "../../dtos/auth-dto.js";

export const registerUser = asyncErrorHandler(async (req, res) => {
    const userInput = req.body as RegisterDto;

    const data = await User.create(userInput);

    return res.status(StatusCodes.CREATED).json({
        success: true,
        data,
    });
});
