import { ObjectId } from 'mongodb'
import databaseServices from '../services/database.services.js'

const postAccessories = async (data) => {
    try {
        return databaseServices.accessories.insertOne(data) 
    } catch (error) { throw new Error(error) }
}

const createCategories = async (data) => {
    try {
        return databaseServices.accessories_categories.insertOne(data) 
    } catch (error) { throw new Error(error) }
}

export const productModel = {
    postAccessories,
    createCategories
}