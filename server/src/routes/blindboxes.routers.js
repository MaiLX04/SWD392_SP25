import { Router } from "express"
import { createBlindBoxValidator } from "../middlewares/blindboxes.middleware.js"
import { wrapAsync } from "../utils/handler.js"
import { blindboxController } from "../controllers/blindboxes.controllers.js"

const blindboxRouter = Router()

// blindboxRouter.post('/', createBlindBoxValidator, wrapAsync(blindboxController.createBlindBox))
blindboxRouter.post('/', wrapAsync(blindboxController.createBlindBox))

export default blindboxRouter 