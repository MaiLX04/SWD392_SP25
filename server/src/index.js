import express from 'express'
import cors from 'cors' // Import cors
import usersRouter from './routes/users.routers.js'
import { defaultErrorHandler } from './middlewares/error.middlewares.js'
import accessoriesRouter from './routes/accessories.routes.js'
import offersRouter from './routes/offers.routers.js'
import tradeRequestsRouter from './routes/tradeRequests.routers.js'
import { initFolder } from './utils/file.js'
import database from './configs/database.js'


import YAML from 'yaml'
// import fs from 'fs'
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
// import path from 'path'


// const file  = fs.readFileSync(path.resolve('swd-swagger.yaml'), 'utf8')

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Accessories Buying And Blindbox Trading',
      version: '1.0.0',
    },

    // components: {
    //   securitySchemes: {
    //     BearerAuth: {
    //       type: 'http',
    //       scheme: 'bearer',
    //       bearerFormat: 'JWT'
    //     }
    //   }
    // }
  },
  // apis: ['./src/routes/*.routers.js', './src/models/schemas/*.schema.js'], // files containing annotations as above
  // apis: ['./swd-swagger.yaml'], // files containing annotations as above
  apis: ['./openapi/*.yaml'], // files containing annotations as above
};
const openapiSpecification = swaggerJsdoc(options);

// const swaggerDocument = YAML.parse(file)

//dựng server
const app = express()
const port = 3000

// Connect to database
database.connect()
initFolder()

app.use(express.json()) //cho server xài middleware biến đổi json
//cho server kết nối các Router
// app.use('/', console.log('Hello World'))

// Enable CORS
app.use(cors({
  origin: '*', // Allow all origins (for testing). Change this to your frontend URL in production.
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}))


// Enable JSON middleware
app.use(express.json())

// const openapiSpecification = './swagger-output.json';
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

// Serve Swagger UI
// const swaggerDocument = require('./swagger-output.json'); // Đường dẫn đến tệp JSON
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

// Setup routes
app.use('/user', usersRouter)
app.use('/accessories', accessoriesRouter)
app.use('/trade_requests', tradeRequestsRouter)
app.use('/offer', offersRouter)

// Error handling middleware (should be at the end)
app.use(defaultErrorHandler)

// Start server
app.listen(port, () => {
  console.log(`Project is running on port: ${port}`)
})