import Usuario from "../models/usuarioModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

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

const login = async (request, response) => {
    try {
        const { email, password } = request.body

        const usuario = await Usuario.findOne({ email }).select("+password")
        if (!usuario) {
            return response.status(401).send({ message: "Credenciais inválidas" })
        }

        const passwordMatch = await bcrypt.compare(password, usuario.password)
        if (!passwordMatch) {
            return response.status(401).send({ message: "Credenciais inválidas" })
        }

        const token = jwt.sign({ usuarioId: usuario._id, email: usuario.email }, process.env.SECRET_JWT, {
            expiresIn: process.env.SECRET_JWT_EXP
        })

        return response.status(200).send({ token })

    } catch (error) {
        console.log(error)
        return response.status(500).send({ message: error.message })
    }
}

export { create, login }