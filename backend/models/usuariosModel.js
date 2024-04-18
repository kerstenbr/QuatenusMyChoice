import mongoose from "mongoose";
import { Schema } from "mongoose";
import bcrypt from "bcrypt"

const usuarioSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    admin: {
        type: Boolean,
        default: false
    }
})

usuarioSchema.pre("save", async function(next) {
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

const Usuario = mongoose.model("Usuario", usuarioSchema)

export default Usuario