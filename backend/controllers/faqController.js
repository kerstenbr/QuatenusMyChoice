import Faq from "../models/faqModel.js";
import mongoose from "mongoose";

const createFaq = async (request, response) => {
  try {
    if (!request.body.question || !request.body.answer) {
      return response.status(400).send({ message: "Preencha os campos obrigatórios" });
    }

    const newFaq = {
      question: request.body.question,
      answer: request.body.answer,
    };

    const faq = await Faq.create(newFaq);
    return response.status(201).json(faq);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: error.message });
  }
};

const findAll = async (request, response) => {
  try {
    const allFaqs = await Faq.find({});
    return response.status(200).json(allFaqs);
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

    const faq = await Faq.findById(id);

    if (!faq) {
      return response.status(404).json({ message: "Nenhuma F.A.Q encontrada" });
    }

    return response.status(200).json(faq);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: error.message });
  }
};

const editFaq = async (request, response) => {
  try {
    const { id } = request.params;
    const faq = await Faq.findByIdAndUpdate(id, request.body);

    if (!faq) {
      return response.status(404).json({ message: "F.A.Q não encontrada" });
    }

    return response.status(200).json({ message: "F.A.Q editada" });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: error.message });
  }
};

const deleteFaq = async (request, response) => {
  try {
    const { id } = request.params;
    const faq = await Faq.findByIdAndDelete(id);

    if (!faq) {
      return response.status(404).json({ message: "F.A.Q não encontrada" });
    }
    return response.status(200).json({ message: `A F.A.Q ID: ${faq.id} foi excluida com sucesso` });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: error.message });
  }
};

export { createFaq, findAll, findById, editFaq, deleteFaq };
