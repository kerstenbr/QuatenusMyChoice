import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET_JWT, {
    expiresIn: process.env.SECRET_JWT_EXP,
  });
};

const register = async (request, response) => {
  try {
    const { email, password, role } = request.body;

    if (!email || !password) {
      return response.status(400).json({ message: "Preencha todos os campos" });
    }

    const alreadyExists = await User.findOne({ email });
    if (alreadyExists) {
      return response.status(400).json({ message: "Este email já está em uso" });
    }

    const user = await User.create({ email, password, role });

    const token = createToken(user._id);
    // console.log(user._id)

    return response.status(201).json(token);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: error.message });
  }
};

const login = async (request, response) => {
  try {
    const { email, password } = request.body;

    const user = await User.findOne({ email }).select("+password");
    // const user = await User.findOne({ email })
    if (!user) {
      return response.status(401).json({ message: "Credenciais inválidas" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return response.status(401).json({ message: "Credenciais inválidas" });
    }

    const token = createToken(user._id);

    return response.status(200).json(token);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: error.message });
  }
};

const findAllUsers = async (request, response) => {
  try {
    const allUsers = await User.find({});
    return response.status(200).json(allUsers);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: error.message });
  }
};

const findUser = async (request, response) => {
  try {
    // console.log(request.userId)
    const { id } = request.params;
    // console.log("controller id: ", id)

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(404).json({ message: "Mongo ID inválido" });
    }

    const user = await User.findById(id);

    if (!user) {
      return response.status(404).json({ message: "Usuário não encontrado" });
    }

    return response.status(200).json(user);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: error.message });
  }
};

const editUser = async (request, response) => {
  try {
    const { id } = request.params;
    const user = await User.findByIdAndUpdate(id, request.body);

    if (!user) {
      return response.status(404).json({ message: "Usuário não encontrado" });
    }

    return response.status(200).json({ message: "Usuário Editado" });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: error.message });
  }
};

const deleteUser = async (request, response) => {
  try {
    const { id } = request.params;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return response.status(404).json({ message: "Usuário não encontrada" });
    }
    return response
      .status(200)
      .json({ message: `${user.email} foi excluido com sucesso` });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: error.message });
  }
};

export { register, login, findAllUsers, findUser, editUser, deleteUser };
