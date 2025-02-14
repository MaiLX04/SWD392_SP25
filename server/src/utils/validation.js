import express from 'express'
import { validationResult } from 'express-validator'

export const validate = (validation) => {
  return async (req, res, next) => {
    await validation.run(req) //hàm tìm lỗi của middleware schema và đưa vào req

    const errors = validationResult(req) //funct này giúp ta lấy lỗi ra từ biến req
    if (errors.isEmpty()) {
      return next()
    }

    // res.status(400).json({ errors: errors.array() })
    res.status(400).json({ errors: errors.mapped() })
    //giúp gộp res về thành 1 object báo lỗi thôi, thay vì mảng
  }
}
