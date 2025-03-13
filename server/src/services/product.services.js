import { ObjectId } from 'mongodb'
import { PRODUCT_MESSAGE } from '../constants/messages.js'
import accessoriesRepo from '../repositories/accessories.repo.js'
import categoriesRepo from '../repositories/categories.repo.js'
import orderDetailsRepo from '../repositories/orderDetail.repo.js'
import ordersRepo from '../repositories/orders.repo.js'
import { usersServices } from './users.services.js'
const postAccessories = async (reqBody) => {
  try {
    // process logic base on each project
    const newProduct = {
      ...reqBody
    }
    // call model layer to save into DB
    return await accessoriesRepo.postAccessories(newProduct)
  } catch (error) { throw error }
}

const getAccessory = async (ID) => {
  try {
    return await accessoriesRepo.getAccessorybyID(ID)
  } catch (error) {
    throw error
  }
}

const deleteAccessory = async (ID) => {
  try {
    return await accessoriesRepo.deleteAccessoryByID(ID)
  } catch (error) {
    throw error
  }
}

const getAllAccessories = async () => {
  try {
    const list = await accessoriesRepo.getAllAccessories()
    // console.log('service: ', list)
    return list
  } catch (error) {
    throw error
  }
}

const createCategories = async (reqBody) => {
  try {
    // process logic base on each project
    const { type } = reqBody
    const exist = await categoriesRepo.checkCatExistByType(type)
    if (exist) {
      throw new Error('Category already exists');
    } else { //no category exist
      const newCat = {
        ...reqBody
      }
      // call model layer to save into DB
      return await categoriesRepo.createCategories(newCat)
    }
  } catch (error) { throw error }
}

const getCategory = async (ID) => {
  try {
    return await categoriesRepo.getCategory(ID)
  } catch (error) {
    throw error
  }
}

const getAllCategories = async (ID) => {
  try {
    return await categoriesRepo.getAllCategories(ID)
  } catch (error) {
    throw error
  }
}

const getAllReview = async (ID) => {
  try {
    return await accessoriesRepo.getAllReview(ID)
  } catch (error) {
    throw new Error(error.message)
  }
}

const buyAccessory = async (reqBody, accessoryID) => {
  try {
    const { userID } = reqBody
    const buyer = await usersServices.findUserById(userID)
    if (!buyer) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json(ORDER_MESSAGE.NO_PERMISSION)
    }

    const accessories = accessoriesRepo.getAccessorybyID(accessoryID)
    if (!accessories) {
      throw new Error(PRODUCT_MESSAGE.NOT_FOUND)
    }

    const { quantity } = reqBody
    const orderData = {
      _id: new ObjectId(),
      buyer: buyer._id,
      total_price: quantity * accessories.price
    }
    const newOrder = await ordersRepo.createOrder(orderData)

    const detailData = {
      _id: new ObjectId(),
      order: orderData._id,
      quantity: quantity,
      accessories: new ObjectId(accessoryID),
      price: accessories.price,
      review: null
    }
    const newOrderDetail = await orderDetailsRepo.createOrdersDetail(detailData)

    return {
      order: newOrder,
      orderDetail: newOrderDetail
    }
  } catch (error) {
    throw new Error(error.message)
  }
}

export const productServices = {
  postAccessories,
  createCategories,
  getAccessory,
  getCategory,
  getAllAccessories,
  getAllCategories,
  deleteAccessory,
  getAllReview,
  buyAccessory
}