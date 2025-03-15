import { ObjectId } from 'mongodb'
import { USER_ROLE, UserVerifyStatus } from '../../constants/enums.js'

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginBody:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           example: example@gmail.com
 *         password:
 *           type: string
 *           example: 123456
 * 
 *     SuccessAuthentication:
 *       type: object
 *       properties:
 *         access_token:
 *           type: string
 *           example: eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9
 *         refresh_token:
 *           type: string
 *           example: eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9
 * 
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: MongoId
 *           example: "67c556ff00a7db27ac1ce54b"
 *         name:
 *           type: string
 *           example: "Bá Thắng"
 *         email:
 *           type: string
 *           format: email
 *           example: "bathangzed@gmail.com"
 *         date_of_birth:
 *           type: string
 *           format: date-time
 *           example: "2004-03-17T17:00:00.000Z"
 * 
 */


//tạo ra class User để mô tả 1 user sẽ có các thuộc tính gì
export default class User {
  constructor(user) {
    const date = new Date() //tạo này cho ngày created_at updated_at bằng nhau
    this._id = user._id || new ObjectId() // tự tạo id
    this.name = user.name || '' // nếu người dùng tạo mà k truyền ta sẽ để rỗng
    this.email = user.email
    this.date_of_birth = user.date_of_birth || new Date()
    this.password = user.password
    this.created_at = user.created_at || date
    this.updated_at = user.updated_at || date
    this.email_verify_token = user.email_verify_token || ''
    this.forgot_password_token = user.forgot_password_token || ''
    this.verify = user.verify || UserVerifyStatus.Unverified

    this.bio = user.bio || ''
    this.location = user.location || ''
    this.website = user.website || ''
    this.username = user.username || ''
    this.avatar = user.avatar || ''
    this.cover_photo = user.cover_photo || ''
    this.role = user.role || USER_ROLE.User
  }
}
