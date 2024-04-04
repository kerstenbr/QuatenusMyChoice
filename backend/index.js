import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import routes from './routes/index.js'

const app = express()

app.use(express.json())
app.use(routes)

mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log("Conectado ao banco de dados com sucesso")
        app.listen(process.env.PORT || 5555, () => {
            console.log(`Servidor rodando na porta ${process.env.PORT}`)
        })
    })
    .catch((error) => {
        console.log(`Não foi possivel conectar ao banco de dados: ${error}`)
    })
