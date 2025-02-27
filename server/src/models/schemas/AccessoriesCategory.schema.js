import { ObjectId } from 'mongodb'

export default class category {
    constructor(accessories){
        this._id = accessories._id || new ObjectId()
        this.type = accessories.type
    }
}

