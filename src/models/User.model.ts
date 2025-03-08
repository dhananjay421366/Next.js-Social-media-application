
import bcrypt from "bcryptjs";
import mongoose, { Schema, model, models } from "mongoose";

export interface User {
    username: string,
    email: string,
    password: string,
    _id?: mongoose.Types.ObjectId,
    createdAt?: Date,
    updatedAt?: Date,
    verifyCode: string,
    verifyCodeExpiry: Date,
    isVerified: boolean,
}


const userSchema = new Schema<User>(
    {
        username: {
            type: String,
            required: [true, "Username is required"],
            trim: true,
            unique: true
        },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        verifyCode: {
            type: String,
            required: [true, "verifyCode is required"],
        },
        verifyCodeExpiry: {
            type: Date,
            required: [true, "verifyCodeExpiry is required"],
        },
        isVerified: {
            type: Boolean,
            default: false
        },
    },
    {
        timestamps: true
    }
)


// create hook for hash  the password
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next(); // Keep only this next()
});



const User = models?.User || model<User>("User", userSchema)

export default User;