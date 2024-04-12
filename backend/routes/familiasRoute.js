import express from 'express'
import { Familia } from '../models/familiaModel.js'
import { findAll } from "../controllers/familiaController.js"

const router = express.Router()

router.get("/", findAll)

router.get("/:id", async (request, response) => {
    try {
        const { id } = request.params
        const familia = await Familia.findById(id)
        return response.status(200).json(familia)
    } catch (error) {
        console.log(error)
        return response.status(500).send({ message: error.message })
    }
})

router.post("/", async (request, response) => {
    try {

        if (!request.body.nome) {
            return response.status(400).send({ message: "Preencha o NOME da família de produtos" })
        }

        const newFamilia = {
            nome: request.body.nome,
            bannerLink: request.body.bannerLink,
            codigoQBM: request.body.codigoQBM,
            desc: request.body.desc,
            canvaLink: request.body.canvaLink,
            infoAdicionalLink: request.body.infoAdicionalLink,
            produtos: request.body.produtos,
            infoTecnicaLink: request.body.infoTecnicaLink
        }
        console.log(newFamilia)
        const familia = await Familia.create(newFamilia)
        return response.status(201).send(familia)
    } catch (error) {
        console.log(error)
        return response.status(500).send({ message: error.message })
    }
})

router.put('/:id', async (request, response) => {
    try {

        if (!request.body.nome) {
            return response.status(400).send({ message: "Preencha o NOME da família de produtos" })
        }

        const { id } = request.params
        const result = await Familia.findByIdAndUpdate(id, request.body)

        if (!result) {
            return response.status(404).send({ message: "Família não encontrada" })
        }

        return response.status(200).send({ message: "Família atualizada com sucesso" })

    } catch (error) {
        console.log(error)
        return response.status(500).send({ message: error.message })
    }
})

router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params
        const result = await Familia.findByIdAndDelete(id)

        if (!result) {
            return response.status(404).send("Família não encontrada")
        }
        return response.status(200).json(result)
    } catch (error) {
        console.log(error)
        return response.status(500).send({ message: error.message })
    }
})

export default router