import Role from "../models/roleModel.js";

const createRole = async (request, response) => {
  try {
    if (!request.body.name) {
      return response.status(400).send({ message: "O nome do setor é obrigatório" });
    }

    const newRole = {
      name: request.body.name,
      active: request.body.active,
    };

    const role = await Role.create(newRole);
    return response.status(201).json(role);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: error.message });
  }
};

const findAll = async (request, response) => {
  try {
    const roles = await Role.find({});
    return response.status(200).json(roles);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: error.message });
  }
};

export { createRole, findAll };
