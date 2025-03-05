import { ObjectId } from 'mongodb';

export default class BlindBox {
  constructor(blindbox) {
        this._id = blindbox._id || new ObjectId();
        this.user_id = blindbox.user_id; // Assuming user_id is an ObjectId
        this.item = blindbox.item;
        this.image = blindbox.image;
        this.description = blindbox.description;
        this.createdAt = blindbox.createdAt || new Date();
        this.updatedAt = blindbox.updatedAt || new Date();
    }
}