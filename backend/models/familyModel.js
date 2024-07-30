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
    bannerLink: String,
    desc: {
      type: String,
      required: true,
    },
    links: Object,
    canvaLink: String,
    addInfoLink: String,
    products: Object,
  },
  { timestamps: true }
);

const Family = mongoose.model("Family", familySchema);

export default Family;
