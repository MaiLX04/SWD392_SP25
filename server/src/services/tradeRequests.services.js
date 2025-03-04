import { ObjectId } from 'mongodb'
import databaseServices from './database.services.js'
import TradeRequest from '../models/schemas/Request.schema.js'
import mediasServices from './medias.sevices.js'

//lấy toàn bộ request lên để làm list
const getAllRequests = async () => {
  const tradeRequest = await databaseServices.tradeRequests.find().toArray()
  return tradeRequest
}

// tạo request mới
const createRequest = async (payload) => {
  let req_id = new ObjectId()
  const result = await databaseServices.tradeRequests.insertOne(
    new TradeRequest({
      _id: req_id,
      ...payload
    })
  )
  return result
}

export const tradeRequestServices = {
  getAllRequests,
  createRequest
}
