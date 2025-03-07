import { ObjectId } from 'mongodb'
import databaseServices from '../services/database.services.js'

const postAccessories = async (data) => {
    try {
        return await databaseServices.accessories.insertOne(data) 
    } catch (error) { throw new Error(error) }
}

const getAccessory = async (Acid) => {
    try{ 
        return await databaseServices.accessories.findOne({ _id: new ObjectId(Acid) })
    } catch (error) { throw new Error(error) }
}

const getAllAccessories = async () => {
    try{ 
        return await databaseServices.accessories.find().toArray()
    } catch (error) { throw new Error(error) }
}

const deleteAccessory = async (Acid) => {
    try{ 
        return await databaseServices.accessories.deleteOne({ _id: new ObjectId(Acid)})
    } catch (error) { throw new Error(error) }
}

const createCategories = async (data) => {
    try {
        return await databaseServices.accessories_categories.insertOne(data) 
    } catch (error) { throw new Error(error) }
}

const getAllCategories = async ( ) => {
    try{ 
        return await databaseServices.accessories_categories.find().toArray()
    } catch (error) { throw new Error(error) }
} 

const getCategory = async (Catid) => {
    try{ 
        return await databaseServices.accessories_categories.findOne(({ _id: new ObjectId(Catid) }))
    } catch (error) { throw new Error(error) }
} 

const checkCatExistByType = async (type) => {
    try{ //exist = true     
        return Boolean(await databaseServices.accessories_categories.findOne({ type }))
    } catch (error) { throw new Error(error) }
}
export const productModel = {
    postAccessories,
    createCategories,
    getAccessory,
    getAllCategories,
    checkCatExistByType,
    getCategory,
    getAllAccessories,
    deleteAccessory
}