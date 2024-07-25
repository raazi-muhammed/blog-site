import { StatusCodes } from "http-status-codes";
import { asyncErrorHandler } from "../../utils/asynErrroHandler.js";
import User from "../../models/user-model.js";
import { RegisterDto } from "../../dtos/auth-dto.js";
import { sendMail } from "../../utils/sendMail.js";
import { generateVerificationCode } from "../../utils/codeGenerator.js";
import VerificationCode from "../../models/verfication-code-model.js";

export const registerUser = asyncErrorHandler(async (req, res) => {
    const userInput = req.body as RegisterDto;
    const data = await User.create(userInput);

    const code = generateVerificationCode();
    await VerificationCode.create({
        user: data.id,
        code,
    });

    sendMail({
        email: data.email,
        message: `Your verification code is ${code}`,
        subject: "Verification Code for Blog",
    });

    return res.status(StatusCodes.CREATED).json({
        success: true,
        message: "Verification mail send",
    });
});
