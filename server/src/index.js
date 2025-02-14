import express from 'express'
import usersRouter from './routes/users.routers.js'
import databaseServices from './services/database.services.js'

//dựng server
const app = express()
const port = 3000
//call server mongo chạy
databaseServices.connect()

app.use(express.json()) //cho server xài middleware biến đổi json
//cho server kết nối userRouter
app.use('/user', usersRouter)
//Cho server mở port ở 3000
app.listen(port, () => {
  console.log(`Project is running on port : ${port}`)
})
