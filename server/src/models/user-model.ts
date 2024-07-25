import { Model, Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config/constants.js";

export interface IUser {
    email: string;
    name: string;
    password: string;
    isVerified: boolean;
    avatar?: string;
}

// Put all user instance methods in this interface:
interface IUserMethods {
    getJwtToken: () => string;
    comparePassword: (enteredPassword: string) => Promise<boolean>;
}

// Create a new Model type that knows about IUserMethods...
type UserModel = Model<IUser, {}, IUserMethods>;

// And a schema that knows about IUserMethods
const userSchema = new Schema<IUser, UserModel, IUserMethods>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        isVerified: { type: Boolean, default: false },
        password: { type: String, required: true },
        avatar: { type: String },
    },
    {
        timestamps: true,
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
            },
        },
    }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);
});
userSchema.method(
    "comparePassword",
    async function comparePassword(enteredPassword: string) {
        return await bcrypt.compare(enteredPassword, this.password);
    }
);
userSchema.method("getJwtToken", function getJwtToken() {
    return jwt.sign({ sub: this.id }, JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES,
    });
});

const User = model<IUser, UserModel>("User", userSchema);
export default User;
