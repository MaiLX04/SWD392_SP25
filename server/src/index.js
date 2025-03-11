import express from 'express'
import cors from 'cors' // Import cors
import usersRouter from './routes/users.routers.js'
import databaseServices from './services/database.services.js'
import { defaultErrorHandler } from './middlewares/error.middlewares.js'
import accessoriesRouter from './routes/accessories.routes.js'
import offersRouter from './routes/offers.routers.js'
import tradeRequestsRouter from './routes/tradeRequests.routers.js'
import { initFolder } from './utils/file.js'
import database from './configs/database.js'
import YAML from 'yaml'
import fs from 'fs'
import swaggerUi from 'swagger-ui-express'
import path from 'path'


const file  = fs.readFileSync(path.resolve('swd-swagger.yaml'), 'utf8')
const swaggerDocument = YAML.parse(file)



const app = express()
const port = 3000

// Connect to database
database.connect()
initFolder()

// Enable CORS
app.use(cors({
  origin: '*', // Allow all origins (for testing). Change this to your frontend URL in production.
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}))

// Enable JSON middleware
app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// Setup routes
app.use('/user', usersRouter)
app.use('/accessories', accessoriesRouter)
app.use('/trade_requests', tradeRequestsRouter)
app.use('/offers', offersRouter)

// Error handling middleware (should be at the end)
app.use(defaultErrorHandler)

// Start server
app.listen(port, () => {
  console.log(`Project is running on port: ${port}`)
})