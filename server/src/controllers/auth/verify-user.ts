import { StatusCodes } from "http-status-codes";
import { asyncErrorHandler } from "../../utils/asynErrroHandler.js";
import User from "../../models/user-model.js";
import { VerificationDto } from "../../dtos/auth-dto.js";
import VerificationCode from "../../models/verfication-code-model.js";
import { BadRequestError, UnauthorizedError } from "../../utils/errorTypes.js";

export const verifyUser = asyncErrorHandler(async (req, res) => {
    const userInput = req.body as VerificationDto;

    const user = await User.find({ email: userInput.email });

    const code = await VerificationCode.findOne({ user: user });
    if (!code) throw new BadRequestError("Try sending code again");

    if (code.code != userInput.code)
        throw new UnauthorizedError("Incorrect verification code");

    await User.updateOne({ email: userInput.email }, { isVerified: true });

    return res.status(StatusCodes.CREATED).json({
        success: true,
        message: "Account verified",
    });
});
