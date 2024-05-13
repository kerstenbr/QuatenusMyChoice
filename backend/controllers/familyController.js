import Family from '../models/familyModel.js'
import mongoose from 'mongoose'

const createFamily = async (request, response) => {
    try {

        if (!request.body.name) {
            return response.status(400).send({ message: "O nome da família é obrigátorio" })
        }

        const newFamily = {
            name: request.body.name,
            alias: request.body.alias,
            bannerLink: request.body.bannerLink,
            qbmCode: request.body.qbmCode,
            desc: request.body.desc,
            canvaLink: request.body.canvaLink,
            addInfoLink: request.body.addInfoLink,
            products: request.body.products,
            tecInfoLink: request.body.tecInfoLink
        }

        const family = await Family.create(newFamily)
        return response.status(201).json(family)
    } catch (error) {
        console.log(error)
        return response.status(500).json({ message: error.message })
    }
}

const findAll = async (request, response) => {
    try {
        const allFamilies = await Family.find({})
        return response.status(200).json(allFamilies)
    } catch (error) {
        console.log(error)
        return response.status(500).json({ message: error.message })
    }
}

const findById = async (request, response) => {
    try {
        const { id } = request.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return response.status(404).json({ message: "Mongo ID inválido" })
        }

        const family = await Family.findById(id)

        if (!family) {
            return response.status(404).json({ message: "Nenhuma família encontrada" })
        }

        return response.status(200).json(family)
    } catch (error) {
        console.log(error)
        return response.status(500).json({ message: error.message })
    }
}

const findByName = async (request, response) => {
    try {
        const { name } = request.query

        const families = await Family.find({ name: { $regex: `${name || ""}`, $options: "i" } })

        if (!families) {
            return response.status(404).json({ message: "Nenhuma família encontrada" })
        }

        return response.status(200).json(families)

        // return response.send({
        //     total: families.length,
        //     results: families.map(family => ({
        //         id: family._id,
        //         name: family.name,
        //         alias: family.alias,
        //         bannerLink: family.bannerLink,
        //         qbmCode: family.qbmCode,
        //         desc: family.desc,
        //         canvaLink: family.canvaLink,
        //         addInfoLink: family.addInfoLink,
        //         products: family.products,
        //         tecInfoLink: family.tecInfoLink
        //     })),
        // })
    } catch (error) {
        console.log(error)
        return response.status(500).json({ message: error.message })
    }
}

const editFamily = async (request, response) => {
    try {

        // TODO: É possível atualizar a família e deixar o nome com uma string vazia. De primeiro vou forçar a verificação no front, mas preciso pensar em algo depois pra impedir este comportamento no backend. Talvez algo no schema?
        // if (!request.body.name) {
        //     return response.status(400).json({ message: "O nome da família é obrigátorio" })
        // }

        const { id } = request.params
        const family = await Family.findByIdAndUpdate(id, request.body)

        if (!family) {
            return response.status(404).json({ message: "Família não encontrada" })
        }

        return response.status(200).json(family)

    } catch (error) {
        console.log(error)
        return response.status(500).json({ message: error.message })
    }
}

const deleteFamily = async (request, response) => {
    try {
        const { id } = request.params
        const family = await Family.findByIdAndDelete(id)

        if (!family) {
            return response.status(404).json("Família não encontrada")
        }
        return response.status(200).json({ message: `${family.name}: excluido com sucesso` })
    } catch (error) {
        console.log(error)
        return response.status(500).json({ message: error.message })
    }
}

export { findAll, findById, findByName, createFamily, editFamily, deleteFamily }