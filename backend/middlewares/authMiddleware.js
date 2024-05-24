import 'dotenv/config'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

const authenticateUser = async (request, response, next) => {
    try {
        const { authorization } = request.headers

        if (!authorization) {
            return response.status(401).send({ message: "Sem permissão" })
        }

        const parts = authorization.split(' ')
        const [schema, token] = parts

        if (parts.length !== 2) {
            return response.status(401).send({ message: "Sem permissão" })
        }

        if (schema !== "Bearer") {
            return response.status(401).send({ message: "Sem permissão" })
        }

        const decoded = jwt.verify(token, process.env.SECRET_JWT)
        // console.log(decoded._id)
        const user = await User.findById(decoded._id)

        request.userId = user._id
        // console.log(request.userId)
        request.email = user.email
        // // console.log(request.email)
        request.admin = user.admin
        // // console.log(request.admin)
        // console.log(request)

        next()
    } catch (error) {
        console.log(error)
        return response.status(500).send({ message: error.message })
    }
}

const isAdmin = (request, response, next) => {
    try {
        response.json({ message: "Lembre-se de reativar essa função" })
        // if (request.admin !== true) {
        //     return response.status(401).send({ message: "Sem permissão" })
        // }

        next()
    } catch (error) {
        console.log(error)
        return response.status(500).send({ message: error.message })
    }
}

export { authenticateUser, isAdmin }