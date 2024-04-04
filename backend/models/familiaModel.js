import mongoose from "mongoose";
import { Schema } from "mongoose";

const familiaModel = new Schema({
    banner: String,
    nome: {
        type: String,
        required: true,
        unique: true
    },
    codigo: String,
    desc: String,
    canva: String,
    infoAdicional: String,
    segmentosDoProduto: Object,
    infoTecnica: String
}, { timestamps: true })

export const Familia = mongoose.model("Familia", familiaModel)