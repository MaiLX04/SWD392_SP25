import { productServices } from "../services/product.services.js"
import HTTP_STATUS from '../constants/httpStatus.js'

const postAccessories = async(req, res) => {
    // try {
        const posted = await productServices.postAccessories(req.body)
        res.status(HTTP_STATUS.CREATED).json(posted)
    // } catch (error) { next(error) }
}

const newCategory = async(req, res) => {
    // try {
        const newCat = await productServices.createCategories(req.body)
        res.status(HTTP_STATUS.CREATED).json(newCat)
    // } catch (error) { next(error) }
}
export const accessoriesController = {
    postAccessories,
    newCategory
}