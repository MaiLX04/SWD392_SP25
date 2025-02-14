import User from '../models/schemas/User.schema.js'
import databaseServices from './database.services.js'
import { hashPassword } from '../utils/crypto.js'

class UsersService {
  async register(payload) {
    // const { email, password } = payload
    const result = await databaseServices.users.insertOne(
      new User({
        ...payload,
        date_of_birth: new Date(payload.date_of_birth),
        //vì User.schema.ts có date_of_birth là Date
        //nhưng mà người dùng gửi lên payload là string
        password: hashPassword(payload.password)
      })
    )
    return result
  }

  async checkEmailExist(email) {
    //vào database tìm xem có hông
    const user = await databaseServices.users.findOne({ email })
    return Boolean(user) //có true, k false
  }
}

const usersServices = new UsersService()
export default usersServices
