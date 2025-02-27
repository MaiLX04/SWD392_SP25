import { ObjectId } from 'mongodb'

export default class TradeProduct {
    constructor(product){
        this._id = product._id || new ObjectId()
        this.user = product.user
        this.description = product.description
        this.photo = product.photo
    }
}