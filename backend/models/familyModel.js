import mongoose from "mongoose";
import { Schema } from "mongoose";

const familySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    qbmCode: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    bannerLink: String,
    links: Object,
    observations: String,
    canvaLink: String,
    addInfoLink: String,
    products: Object,
  },
  { timestamps: true }
);

const Family = mongoose.model("Family", familySchema);

export default Family;
