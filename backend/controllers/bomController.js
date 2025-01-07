import Bom from "../models/bomModel.js";
import mongoose from "mongoose";
import diacritics from "diacritics";
import XLSX from "xlsx";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    const { qbmCode } = request.query;

    if (!qbmCode) {
      return response.status(400).json({ message: "Nome do produto não fornecido" });
    }

    // Normalizar o termo de busca
    const normalizedSearchTerm = diacritics.remove(qbmCode).toLowerCase();

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

const downloadBoms = async (request, response) => {
  try {
    const boms = await Bom.find({});

    // Transformando os dados para o formato que será exportado
    const data = boms.flatMap((bom) => {
      const vehicles = ["car", "motorcycle", "vessel", "truck", "machine"];
      const maxLength = Math.max(
        ...vehicles.map((vehicle) => (bom[vehicle]?.starsoftCode?.length || 0))
      );

      // Criar uma linha para cada índice até o maior número de itens
      return Array.from({ length: maxLength }).map((_, index) => {
        const row = { qbmCode: bom.qbmCode };

        vehicles.forEach((vehicle) => {
          const vehicleData = bom[vehicle] || {};
          row[`${vehicle}StarsoftCode`] = vehicleData.starsoftCode?.[index] || "";
          row[vehicle] = vehicleData.itens?.[index] || "";
          row[`${vehicle}Unit`] = vehicleData.unit?.[index] || "";
          row[`${vehicle}Quantity`] = vehicleData.quantity?.[index] || "";
          row[`${vehicle}Observation`] = index === 0 ? vehicleData.observation || "" : "";
        });

        return row;
      });
    });

    // Criando uma nova planilha Excel
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "BOMs");

    // Definindo o caminho para salvar o arquivo temporário
    const filePath = path.join(__dirname, "boms.xlsx");
    XLSX.writeFile(workbook, filePath);

    // Enviando o arquivo como resposta
    response.download(filePath, "boms.xlsx", (error) => {
      if (error) {
        console.error("Erro ao fazer o download do arquivo:", error);
      }
      fs.unlinkSync(filePath); // Remove o arquivo temporário após o download
    });
  } catch (error) {
    console.error("Erro ao gerar o arquivo Excel:", error);
    response.status(500).json({ message: "Erro ao gerar o arquivo Excel" });
  }
};

const uploadBoms = async (request, response) => {
  const filePath = request.file.path; // Caminho do arquivo temporário

  try {
    // Verificar a extensão do arquivo
    const fileExtension = path.extname(request.file.originalname);
    if (fileExtension !== ".xls" && fileExtension !== ".xlsx") {
      return response.status(400).json({ message: "Formato de arquivo inválido. Apenas arquivos xls ou xlsx são permitidos." });
    }

    // Lendo o arquivo Excel
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    // Verificar se todos os campos obrigatórios estão presentes
    for (const row of worksheet) {
      if (!row.qbmCode) {
        return response.status(400).json({
          message: "Certifique-se de que qbmCode esteja presente em todas as linhas.",
        });
      }
    }

    // Agrupando as linhas pelo qbmCode
    const bomsMap = worksheet.reduce((acc, row) => {
      if (!acc[row.qbmCode]) {
        acc[row.qbmCode] = {
          qbmCode: row.qbmCode,
          car: {
            observation: row.carObservation || "",
            starsoftCode: [],
            itens: [],
            unit: [],
            quantity: [],
          },
          motorcycle: {
            observation: row.motorcycleObservation || "",
            starsoftCode: [],
            itens: [],
            unit: [],
            quantity: [],
          },
          vessel: {
            observation: row.vesselObservation || "",
            starsoftCode: [],
            itens: [],
            unit: [],
            quantity: [],
          },
          truck: {
            observation: row.truckObservation || "",
            starsoftCode: [],
            itens: [],
            unit: [],
            quantity: [],
          },
          machine: {
            observation: row.machineObservation || "",
            starsoftCode: [],
            itens: [],
            unit: [],
            quantity: [],
          },
        };
      }

      const vehicleTypes = ["car", "motorcycle", "vessel", "truck", "machine"];
      vehicleTypes.forEach((vehicle) => {
        if (row[`${vehicle}StarsoftCode`]) {
          acc[row.qbmCode][vehicle].starsoftCode.push(row[`${vehicle}StarsoftCode`]);
          acc[row.qbmCode][vehicle].itens.push(row[vehicle] || "");
          acc[row.qbmCode][vehicle].unit.push(row[`${vehicle}Unit`] || "");
          acc[row.qbmCode][vehicle].quantity.push(row[`${vehicle}Quantity`] || "");
        }
      });

      return acc;
    }, {});

    // Iterando sobre os BOMs agrupados e criando ou atualizando os documentos no MongoDB
    for (const qbmCode in bomsMap) {
      const bomData = bomsMap[qbmCode];
      await Bom.findOneAndUpdate({ qbmCode }, bomData, { upsert: true, new: true });
    }

    response.status(200).json({ message: `Sucesso ao fazer upload` });
  } catch (error) {
    console.error("Erro ao processar o arquivo Excel:", error);
    response.status(500).json({ message: "Erro ao processar o arquivo Excel" });
  } finally {
    fs.unlinkSync(filePath); // Remove o arquivo temporário
  }
};

export { createBom, findAll, findById, findByName, editBom, deleteBom, downloadBoms, uploadBoms };
