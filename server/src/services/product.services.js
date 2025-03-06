import databaseServices from './database.services.js'
// import { productModel } from '../models/productModel.js'
import { productModel } from '../models/productModel.js'

const postAccessories = async (reqBody) => {
  try {
    // process logic base on each project
    const newProduct = {
      ...reqBody
    }
    // call model layer to save into DB
    return await productModel.postAccessories(newProduct)
  } catch (error) { throw error }
}

const createCategories = async (reqBody) => {
  try {
    // process logic base on each project
    const newCat = {
      ...reqBody
    }
    // call model layer to save into DB
    return await productModel.createCategories(newCat)
  } catch (error) { throw error }
}

export const productServices = {
  postAccessories,
  createCategories
}