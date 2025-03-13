import { ObjectId } from "mongodb"
import database from "../configs/database.js"
import dotenv from 'dotenv'
import { ORDER_MESSAGE } from "../constants/messages.js"

dotenv.config()

class OrdersRepo {
    constructor() {
        this.db = database.db.collection(process.env.DB_ORDER_COLLECTION)
    }

    async createOrder(product) {
        return await this.db.insertOne(product)
    }

    async getAllOrders() {
        return await this.db.find().toArray()
    }

    async getOrder(id) {
        return await this.db.findOne({ _id: new ObjectId(id)})
    }

    async setStatus(newStatus, orderID) {
        return await this.db.updateOne(
            {_id: orderID},
            {status: newStatus}
        )
    }
}

const ordersRepo = new OrdersRepo()

export default ordersRepo