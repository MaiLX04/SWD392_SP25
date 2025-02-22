//controllers là tầng xử lí logic và call database thông qua services

import User from '../models/schemas/User.schema.js'
import databaseServices from '../services/database.services.js'
import usersServices from '../services/users.services.js'

//route này nhận vào email và password để tạo tài khoản cho mình
//nhưng trong lúc tạo tài khoản ta dùng insertOne(là 1 promise)
//nên ta sẽ dùng async await để xử lý bất đồng bộ
//và rất có thể trong quá trình get data từ database mình sẽ gặp lỗi, nên phải try catch
export const registerController = async (req, res) => {
  // lấy email và password từ req.body mà người dùng muốn đăng kí tài khoản
  const { email, password } = req.body
  try {
    //kiểm tra email đc gửi lên có tồn tại chưa
    const isDub = await usersServices.checkEmailExist(req.body.email)
    if (isDub) {
      //sẽ không hiện được message vì Error có message là enumerable: false
      const errorCustom = new Error('Email already exists') //ta phải set lại enumerable: true
      Object.defineProperty(errorCustom, 'message', {
        enumerable: true
      })
      throw errorCustom
    }

    const result = await usersServices.register(req.body)
    // console.log(result)
    return res.status(200).json({
      message: 'Register success', //chỉnh lại thông báo
      result: result
    })
  } catch (err) {
    return res.status(400).json({
      message: 'Register failed', //chỉnh lại thông báo
      err: err
    })
  }
}

export const loginController = (req, res) => {
  //thêm tý logic vào đây trước khi trả kết quả cho người dùng
  const { email, password } = req.body
  //mình xà lơ, vì mình chưa có database
  //nếu có thì mình phải tách nhỏ xuống 1 tầng nữa là service thay vì viết ở đây
  if (email === 'anh123@gmail.com' && password === '123456') {
    res.json({
      data: {
        fname: 'Điệp',
        yob: 1999
      }
    })
  } else {
    res.status(400).json({
      error: 'Invalid email or password'
    })
  }
}
