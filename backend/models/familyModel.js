import mongoose from "mongoose";
import { Schema } from "mongoose";

const familySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    alias: String,
    bannerLink: String,
    qbmCode: String,
    desc: String,
    canvaLink: String,
    addInfoLink: String,
    products: Object,
    tecInfoLink: String,
}, { timestamps: true })

const Family = mongoose.model("Family", familySchema)

export default Family