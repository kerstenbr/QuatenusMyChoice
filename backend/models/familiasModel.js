import mongoose from "mongoose";
import { Schema } from "mongoose";

const familiaModel = new Schema({
    nome: {
        type: String,
        required: true,
        unique: true
    },
    bannerLink: String,
    codigoQBM: String,
    desc: String,
    canvaLink: String,
    infoAdicionalLink: String,
    produtos: Object,
    infoTecnicaLink: String,
}, { timestamps: true })

export const Familia = mongoose.model("Familia", familiaModel)