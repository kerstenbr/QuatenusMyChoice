import mongoose from "mongoose";
import { Schema } from "mongoose";

const roleSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  active: {
    type: Boolean,
    required: true,
  },
});

const Role = mongoose.model("Role", roleSchema);

export default Role;
