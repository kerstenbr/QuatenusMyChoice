import mongoose from "mongoose";

const validId = (request, response, next) => {
  let idParam;
  if (!request.params.id) {
    request.params.id = request.userId;
    idParam = request.params.id;
  } else {
    idParam = request.params.id;
  }

  if (!mongoose.Types.ObjectId.isValid(idParam)) {
    return response.status(400).send({ message: "Mongo ID inválido" });
  }
  next();
};

export { validId };
