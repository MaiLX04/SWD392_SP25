export default class Blindbox {
    constructor(blindbox) {
        this._id = blindbox._id || new ObjectId();
        this._name = blindbox.name || '';
        this.image = blindbox.image || '';
        this.description = blindbox.description || '';
        this.ownerId = blindbox.ownerId || null;
        this.createdAt = blindbox.createdAt || new Date();
        this.updatedAt = blindbox.updatedAt || new Date();
    }
}