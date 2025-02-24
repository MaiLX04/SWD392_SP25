import User from '../models/schemas/User.schema.js'
import databaseServices from './database.services.js'
import { hashPassword } from '../utils/crypto.js'

//viết hàm dùng jwt để ký access_token
const signAccessToken = async (user_id) => {
  return signToken({
    payload: { user_id, token_type: TokenType.AccessToken },
    privateKey: process.env.JWT_SECRET_ACCESS_TOKEN,
    options: { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_IN }
  })
}

//viết hàm dùng jwt để ký refresh_token
const signRefreshToken = async (user_id) => {
  return signToken({
    payload: { user_id, token_type: TokenType.RefreshToken },
    privateKey: process.env.JWT_SECRET_REFRESH_TOKEN,
    options: { expiresIn: process.env.REFRESH_TOKEN_EXPIRE_IN }
  })
}

//viết hàm dùng jwt để kí email_verify_token
const signEmailVerifyToken = async (user_id) => {
  return signToken({
    payload: { user_id, token_type: TokenType.EmailVerificationToken },
    privateKey: process.env.JWT_SECRET_EMAIL_VERIFY_TOKEN,
    options: { expiresIn: process.env.EMAIL_VERIFY_TOKEN_EXPIRED_IN }
  })
}

const signForgotPasswordToken = async (user_id) => {
  return signToken({
    payload: { user_id, token_type: TokenType.ForgotPasswordToken },
    privateKey: process.env.JWT_SECRET_FORGOT_PASSWORD_TOKEN,
    options: { expiresIn: process.env.EMAIL_FORGOT_PASSWORD_TOKEN_EXPIRED_IN }
  })
}

const checkEmailExist = async (email) => {
  //vào database tìm xem có hông
  const user = await databaseServices.users.findOne({ email })
  return Boolean(user) //có true, k false
}

const register = async (payload) => {
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
  //insertOne sẽ trả về 1 object, trong đó có thuộc tính insertedId là user_id của user vừa tạo
  //vì vậy ta sẽ lấy user_id đó ra để tạo token
  const user_id = result.insertedId.toString()
  // const access_token = await this.signAccessToken(user_id)
  // const refresh_token = await this.signRefreshToken(user_id)
  //nên viết là thì sẽ giảm thời gian chờ 2 cái này tạo ra
  const [access_token, refresh_token] = await Promise.all([
    this.signAccessToken(user_id),
    this.signRefreshToken(user_id)
  ]) //đây cũng chính là lý do mình chọn xử lý bất đồng bộ, thay vì chọn xử lý đồng bộ
  //Promise.all giúp nó chạy bất đồng bộ, chạy song song nhau, giảm thời gian
  return { access_token, refresh_token }
  //ta sẽ return 2 cái này về cho client
  //thay vì return user_id về cho client
}

export const usersServices = {
  signAccessToken,
  signRefreshToken,
  signEmailVerifyToken,
  signForgotPasswordToken,
  checkEmailExist,
  register
}