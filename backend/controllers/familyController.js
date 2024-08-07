import Family from "../models/familyModel.js";
import mongoose from "mongoose";

const createFamily = async (request, response) => {
  try {
    if (!request.body.name || !request.body.qbmCode || !request.body.desc) {
      return response.status(400).send({ message: "Preencha os campos obrigatórios" });
    }

    const newFamily = {
      name: request.body.name,
      qbmCode: request.body.qbmCode,
      bannerLink: request.body.bannerLink,
      desc: request.body.desc,
      links: request.body.links,
      canvaLink: request.body.canvaLink,
      addInfoLink: request.body.addInfoLink,
      products: request.body.products,
    };

    const family = await Family.create(newFamily);
    return response.status(201).json(family);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: error.message });
  }
};

const findAll = async (request, response) => {
  try {
    const allFamilies = await Family.find({});
    return response.status(200).json(allFamilies);
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

    const family = await Family.findById(id);

    if (!family) {
      return response.status(404).json({ message: "Nenhuma família encontrada" });
    }

    return response.status(200).json(family);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: error.message });
  }
};

// const findByName = async (request, response) => {
//     try {
//         const { name } = request.query

//         const families = await Family.find({ name: { $regex: `${name || ""}`, $options: "i" } })

//         if (!families) {
//             return response.status(404).json({ message: "Nenhuma família encontrada" })
//         }

//         return response.status(200).json(families)
//     } catch (error) {
//         console.log(error)
//         return response.status(500).json({ message: error.message })
//     }
// }

// Essa função pesquisa pelo nome do field do products
const findByName = async (request, response) => {
  try {
    const { name } = request.query;

    if (!name) {
      return response.status(400).json({ message: "Nome do produto não fornecido" });
    }

    const regex = new RegExp(name, "i");

    const families = await Family.find();

    const filteredFamilies = families.filter((family) => {
      const keys = Object.keys(family.products);
      return keys.some((key) => regex.test(key));
    });

    if (filteredFamilies.length === 0) {
      return response.status(404).json({ message: "Nenhuma família encontrada" });
    }

    return response.status(200).json(filteredFamilies);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: error.message });
  }
};

const editFamily = async (request, response) => {
  try {
    // TODO: É possível atualizar a família e deixar o nome com uma string vazia.
    // if (!request.body.name) {
    //     return response.status(400).json({ message: "O nome da família é obrigátorio" })
    // }

    const { id } = request.params;
    const family = await Family.findByIdAndUpdate(id, request.body);

    if (!family) {
      return response.status(404).json({ message: "Família não encontrada" });
    }

    return response.status(200).json({ message: "Família Editada" });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: error.message });
  }
};

const deleteFamily = async (request, response) => {
  try {
    const { id } = request.params;
    const family = await Family.findByIdAndDelete(id);

    if (!family) {
      return response.status(404).json({ message: "Família não encontrada" });
    }
    return response
      .status(200)
      .json({ message: `A família ${family.name.toLocaleUpperCase()} foi excluida com sucesso` });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: error.message });
  }
};

export { findAll, findById, findByName, createFamily, editFamily, deleteFamily };
