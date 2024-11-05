import mongoose from "mongoose";
import { Schema } from "mongoose";

const itensSchema = new Schema(
  {
    observation: [String],
    starsoftCode: [String],
    itens: [String],
    unit: [String],
    quantity: [Number],
  },
  { _id: false }
);

const billOfMaterialsSchema = new Schema(
  {
    qbmCode: {
      type: String,
      required: true,
      unique: true,
    },
    car: itensSchema,
    motorcycle: itensSchema,
    vessel: itensSchema,
    truck: itensSchema,
    machine: itensSchema,
  },
  { timestamps: true }
);

// Criar índice textual no campo products.name
billOfMaterialsSchema.index({ qbmCode: "text" });

const Bom = mongoose.model("Bom", billOfMaterialsSchema);

export default Bom;
