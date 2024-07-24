import mongoose, { Model, ObjectId, Schema, model } from "mongoose";

interface IUser {
    title: string;
    content: string;
    writtenBy: ObjectId;
    id: string;
}

interface IUserMethods {
    getJwtToken: () => string;
    comparePassword: (enteredPassword: string) => Promise<boolean>;
}

type UserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        writtenBy: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
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

const Blog = model<IUser, UserModel>("Blog", userSchema);
export default Blog;
