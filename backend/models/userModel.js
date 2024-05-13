import mongoose from "mongoose";
import { Schema } from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new Schema({
    // name: {
    //     type: String,
    //     required: true
    // },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        // A linha abaixo faz com que o Mongodb não retorne a senha, desativei por enquanto por não tenho um GET de user
        // select: false
    },
    admin: {
        type: Boolean,
        default: false
    }
})

userSchema.pre("save", async function(next) {
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

const User = mongoose.model("User", userSchema)

export default User