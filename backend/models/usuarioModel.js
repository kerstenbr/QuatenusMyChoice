import mongoose from "mongoose";

const usuarioModel = new mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },
    password: {
        type: mongoose.Schema.Types.String,
        password: mongoose.Schema.Types.String
    }
})

export const Usuario = mongoose.model("Usuario", usuarioModel)