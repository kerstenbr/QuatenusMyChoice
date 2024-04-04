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

export default router