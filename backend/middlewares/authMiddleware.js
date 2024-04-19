import 'dotenv/config'
import jwt from 'jsonwebtoken'

const authenticateUser = (request, response, next) => {
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

        console.log(token)

        const decoded = jwt.verify(token, process.env.SECRET_JWT)

        request.userId = decoded.userId
        request.email = decoded.email

        // console.log(decoded.userId)
        // console.log(decoded.email)

        next()
    } catch (error) {
        console.log(error)
        return response.status(500).send({ message: error.message })
    }
}

export { authenticateUser }