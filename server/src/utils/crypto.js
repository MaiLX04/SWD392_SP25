import { createHash } from 'crypto'
import dotenv from 'dotenv'
dotenv.config()
// chuẩn bị hàm mã hóa 1 nội dung nào đó theo mã SHA256
function sha256(content) {
  return createHash('sha256').update(content).digest('hex')
}

//viết hàm hashPassword(mã hóa password kèm 1 mật khẩu bí mật do mình tạo ra)
export function hashPassword(password) {
  return sha256(password + process.env.PASSWORD_SECRET)
}
