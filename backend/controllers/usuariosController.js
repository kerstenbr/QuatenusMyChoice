import Usuario from "../models/usuariosModel.js";

const create = async (request, response) => {
    try {
        if (!request.body.nome || !request.body.email || !request.body.password) {
            return response.status(400).send({ message: "Preencha todos os campos" })
        }

        const newUsuario = {
            nome: request.body.nome,
            email: request.body.email,
            password: request.body.password,
            admin: request.body.admin
        }
        // console.log(newUsuario)
        const usuario = await Usuario.create(newUsuario)
        return response.status(201).send({ message: `Usuário: ${usuario.nome} - criado com sucesso` })

    } catch (error) {
        console.log(error)
        return response.status(500).send({ message: error.message })
    }
}
export { create }