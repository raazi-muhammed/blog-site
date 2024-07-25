import mongoose, { Model, ObjectId, Schema, model } from "mongoose";

interface ICode {
    expiresAt: Date;
    user: ObjectId;
    code: number;
}

type CodeModel = Model<ICode, {}>;

const codeSchema = new Schema<ICode, CodeModel>(
    {
        code: { type: Number, required: true },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        expiresAt: {
            type: Date,
            default: Date.now,
            index: { expires: "5m" },
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

const VerificationCode = model<ICode, CodeModel>(
    "VerificationCode",
    codeSchema
);
export default VerificationCode;
