import Bom from "../models/bomModel.js";
import mongoose from "mongoose";
import diacritics from "diacritics";
// import XLSX from "xlsx";
// import Fuse from "fuse.js";
// import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const createBom = async (request, response) => {
  try {
    if (!request.body.qbmCode) {
      return response.status(400).send({ message: "Preencha os campos obrigatórios" });
    }

    const newBom = {
      qbmCode: request.body.qbmCode,
      car: request.body.car,
      motorcycle: request.body.motorcycle,
      vessel: request.body.vessel,
      truck: request.body.truck,
      machine: request.body.machine,
    };

    const bom = await Bom.create(newBom);
    return response.status(201).json(bom);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: error.message });
  }
};

const findAll = async (request, response) => {
  try {
    const bom = await Bom.find({});
    return response.status(200).json(bom);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: error.message });
  }
};

const findById = async (request, response) => {
  try {
    const { id } = request.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(404).json({ message: "Mongo ID inválido" });
    }

    const bom = await Bom.findById(id);

    if (!bom) {
      return response.status(404).json({ message: "Nenhum BOM encontrado" });
    }

    return response.status(200).json(bom);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: error.message });
  }
};

const findByName = async (request, response) => {
  try {
    const { name } = request.query;

    if (!name) {
      return response.status(400).json({ message: "Nome do produto não fornecido" });
    }

    // Normalizar o termo de busca
    const normalizedSearchTerm = diacritics.remove(name).toLowerCase();

    // Buscar os BOMs que correspondem ao qbmCode
    const boms = await Bom.find({
      qbmCode: { $regex: normalizedSearchTerm, $options: "i" },
    });

    if (boms.length === 0) {
      return response.status(404).json({ message: "Nenhum BOM encontrado" });
    }

    return response.status(200).json(boms);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: error.message });
  }
};

const editBom = async (request, response) => {
  try {
    if (!request.body.qbmCode) {
      return response.status(400).json({ message: "O código do QBM é obrigátorio" });
    }

    const { id } = request.params;
    const bom = await Bom.findByIdAndUpdate(id, request.body);

    if (!bom) {
      return response.status(404).json({ message: "Bom não encontrado" });
    }

    return response.status(200).json({ message: "Bom editado" });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: error.message });
  }
};

const deleteBom = async (request, response) => {
  try {
    const { id } = request.params;
    const bom = await Bom.findByIdAndDelete(id);

    if (!bom) {
      return response.status(404).json({ message: "Produto não encontrado" });
    }
    return response.status(200).json({ message: `O produto ${bom.qbmCode} foi excluido com sucesso` });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: error.message });
  }
};

export { createBom, findAll, findById, findByName, editBom, deleteBom };
