import express from 'express'
import usersRouter from './routes/users.routers.js'
import databaseServices from './services/database.services.js'
import { defaultErrorHandler } from './middlewares/error.middlewares.js'
import tradeRequestsRouter from './routes/tradeRequests.routers.js'
import { initFolder } from './utils/file.js'
import blindboxRouter from './routes/blindboxes.routers.js'
import offersRouter from './routes/offers.routers.js'
import database from './configs/database.js'

//dựng server
const app = express()
const port = 3000
//call server mongo chạy
database.connect()
initFolder()
app.use(express.json()) //cho server xài middleware biến đổi json
//cho server kết nối các Router
app.use('/user', usersRouter)
app.use('/trade_requests', tradeRequestsRouter)
app.use('/blindbox', blindboxRouter)
app.use('/offers', offersRouter)

//trở thành error handler cho cả app nên nó nằm cuối app để là điểm tập kết cuối cùng
//xử lí lỗi tổng
app.use(defaultErrorHandler)

//Cho server mở port ở 3000
app.listen(port, () => {
  console.log(`Project is running on port : ${port}`)
})
