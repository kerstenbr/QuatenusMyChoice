import express from 'express'
import { Familia } from '../models/familiaModel.js'

const router = express.Router()

router.get("/", async (request, response) => {
    try {
        const familias = await Familia.find({})
        return response.status(200).json({ familias })
    } catch (error) {
        console.log(error)
        return response.status(500).send({ message: error.message })
    }
})

router.post("/", async (request, response) => {
    try {

        if (!request.body.nome) {
            return response.status(400).send({ message: "Preencha o NOME da família de produtos!"})
        }

        const newFamilia = {
            nome: request.body.nome,
            banner: request.body.banner,
            codigo: request.body.codigo,
            desc: request.body.desc,
            canva: request.body.canva,
            infoAdicional: request.body.infoAdicional,
            segmentosDoProduto: request.body.segmentosDoProduto,
            infoTecnica: request.body.infoTecnica
        }
        console.log(newFamilia)
        const familia = await Familia.create(newFamilia)
        return response.status(201).send(familia)
    } catch (error) {
        console.log(error)
        return response.status(400).send({ message: error.message })
    }
})

export default router