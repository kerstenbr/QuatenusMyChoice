import mongoose from "mongoose";
import { Schema } from "mongoose";

const familySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    qbmCode: String,
    bannerLink: String,
    desc: String,
    canvaLink: String,
    addInfoLink: String,
    products: Object,
    tecInfoLink: String,
}, { timestamps: true })

const Family = mongoose.model("Family", familySchema)

export default Family