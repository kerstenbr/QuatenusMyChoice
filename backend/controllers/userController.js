import User from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const register = async (request, response) => {
    try {
        if (!request.body.name || !request.body.email || !request.body.password) {
            return response.status(400).json({ message: "Preencha todos os campos" })
        }

        const newUser = {
            name: request.body.name,
            email: request.body.email,
            password: request.body.password,
            admin: request.body.admin
        }
        
        const user = await User.create(newUser)
        return response.status(201).json({ message: `Usuário: ${user.name} - criado com sucesso. Entre com seu email e senha.` })

    } catch (error) {
        console.log(error)
        return response.status(500).json({ message: error.message })
    }
}

const login = async (request, response) => {
    try {
        const { email, password } = request.body

        const user = await User.findOne({ email }).select("+password")
        if (!user) {
            return response.status(401).json({ message: "Credenciais inválidas" })
        }

        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            return response.status(401).json({ message: "Credenciais inválidas" })
        }

        const token = jwt.sign({ userId: user._id, email: user.email }, process.env.SECRET_JWT, {
            expiresIn: process.env.SECRET_JWT_EXP
        })

        return response.status(200).json(token)

    } catch (error) {
        console.log(error)
        return response.status(500).json({ message: error.message })
    }
}

export { register, login }