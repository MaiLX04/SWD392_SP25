import { ObjectId } from 'mongodb'

export default class accessories {
    constructor(accessories){
        this._id = accessories._id || new ObjectId()
        this.type = accessories.type
        this.description = accessories.description
        this.price = accessories.price
        this.photo = accessories.photo
        this.status = accessories.status
        this.date_added = accessories.date_added
    }
}