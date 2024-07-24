import mongoose, { HydratedDocument, Model } from "mongoose";

type IUser = {
    email: string;
    name: string;
    password: string;
    isVerified: boolean;
    avatar?: string;
};

const userSchema = new mongoose.Schema<IUser>(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        avatar: {
            type: String,
        },
    },
    {
        timestamps: true,
        toJSON: {
            transform(_, ret) {
                ret.id = ret._id;
                delete ret._id;
            },
        },
    }
);

export type IDBUser = HydratedDocument<
    IUser,
    { createdAt: Date; updatedAt: Date }
>;

export type IUserModel = Model<IUser>;

const User = mongoose.model<IUser>("User", userSchema);
export default User;
