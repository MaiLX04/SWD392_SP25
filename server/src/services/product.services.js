import databaseServices from './database.services.js'
import { productModel } from '../models/productModel.js'

const postAccessories = async (reqBody) => {
  try {
    // process logic base on each project
    const newProduct = {
      ...reqBody
    }
    // call model layer to save into DB
    const newAccessories = await productModel.postAccessories(newProduct)
    return newAccessories
  } catch (error) { throw error }
}

const postTradeProduct = async (reqBody) => {
  try {
    // process logic base on each project
    const newProduct = {
      ...reqBody
    }
    // call model layer to save into DB
    const newTradeProduct = await productModel.postTradeProduct(newProduct)
    return newAccessories
  } catch (error) { throw error }
}

export const productServices = {
  postAccessories,
  postTradeProduct
}