import mongoose, { Model, ObjectId, Schema, model } from "mongoose";

interface IBlog {
    title: string;
    content: string;
    description: string;
    deletedAt?: Date;
    cover?: string;
    writtenBy: ObjectId;
    id: string;
}

interface IBlogMethods {
    getJwtToken: () => string;
    comparePassword: (enteredPassword: string) => Promise<boolean>;
}

type BlogModel = Model<IBlog, {}, IBlogMethods>;

const userSchema = new Schema<IBlog, BlogModel, IBlogMethods>(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        description: { type: String, required: true },
        deletedAt: { type: Date },
        cover: { type: String },
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

const Blog = model<IBlog, BlogModel>("Blog", userSchema);
export default Blog;
