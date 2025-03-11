import express from 'express'
import { Router } from 'express'
import { wrapAsync } from '../utils/handler.js'
import { tradeRequestsController } from '../controllers/tradeRequests.controllers.js'
import { createTradeRequestsValidate, updateTradeRequestsValidate } from '../middlewares/tradeRequest.middlewares.js'
//tạo Router
const tradeRequestsRouter = Router()

/*
    description: get all trade requests
    path: /trades
    method: GET
*/
tradeRequestsRouter.get('/list', wrapAsync(tradeRequestsController.getAllRequests))

/*
    description: create a trade request
    path: /create
    method: POST
    body: {
        user_id
        request_item
        description
        image
    }
*/
tradeRequestsRouter.post('/create', createTradeRequestsValidate, wrapAsync(tradeRequestsController.createRequest))

/*
    description: update a trade request
    path: /update/{reqId}
    method: PUT
    body: {
        offer_id
        user_id
        request_item
        description
        image
        status
    }
*/
tradeRequestsRouter.put('/update/:reqId', updateTradeRequestsValidate, wrapAsync(tradeRequestsController.updateRequest))

/*
    description: update a trade request status
    path: /update/{reqId}
    method: Patch
    body: {
        status
    }
*/
tradeRequestsRouter.patch('/update/:reqId/status', wrapAsync(tradeRequestsController.updateStatus))
export default tradeRequestsRouter
