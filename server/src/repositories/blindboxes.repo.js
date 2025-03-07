// import database from '../configs/database.js'
// import dotenv from 'dotenv'
// dotenv.config()

// class BlindBoxRepo {
//   constructor() {
//     this.db = null
//   }

//   async init() {
//     await database.connect()
//     this.db = database.getInstance()
//   }

//   get collection() {
//     return this.db.collection('blind_boxes') // Or use process.env.DB_BLIND_BOXES_COLLECTION
//   }

//   async getAllBlindBoxes() {
//     return await this.collection.find().toArray()
//   }
// }

// const blindBoxRepo = new BlindBoxRepo()
// await blindBoxRepo.init()
// export default blindBoxRepo
