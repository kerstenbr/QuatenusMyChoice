import Bom from "../models/bomModel.js";
import mongoose from "mongoose";

const findAll = async (request, response) => {
  try {
    const bom = await Bom.find({});
    return response.status(200).json(bom);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: error.message });
  }
};

export {findAll}