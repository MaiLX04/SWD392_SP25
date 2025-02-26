import express from 'express'
import usersRouter from './routes/users.routers.js'
import databaseServices from './services/database.services.js'
import { defaultErrorHandler } from './middlewares/error.middlewares.js'

//dựng server
const app = express()
const port = 3000
//call server mongo chạy
databaseServices.connect()

app.use(express.json()) //cho server xài middleware biến đổi json
//cho server kết nối userRouter
app.use('/user', usersRouter)

//trở thành error handler cho cả app nên nó nằm cuối app để là điểm tập kết cuối cùng
//xử lí lỗi tổng
app.use(defaultErrorHandler)

//Cho server mở port ở 3000
app.listen(port, () => {
  console.log(`Project is running on port : ${port}`)
})
