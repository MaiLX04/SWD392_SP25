import express from 'express'
import { Router } from 'express'
import { accessoriesController } from '../controllers/accessories.controller.js'
import { wrapAsync } from '../utils/handler.js'
import { productValidator } from '../middlewares/product.middlewares.js'
import databaseServices from '../services/database.services.js'
//tạo Router
const accessoriesRouter = Router()

// router.post('/postAccessories', productValidator.AccessoriesValidator, accessoriesController.postAccessories);
accessoriesRouter.post('/postAccessories', productValidator.AccessoriesValidator,
    wrapAsync(accessoriesController.postAccessories))

/*
    description: create new categories
    path: /newCategory
    method: POST
    body: {
        type: string,
        description: string
    }
*/
accessoriesRouter.post('/newCategory', productValidator.CategoriesValidator,
    wrapAsync(accessoriesController.newCategory))

accessoriesRouter.get('/allAccessories', wrapAsync(accessoriesController.getAllAccessories))   

accessoriesRouter.get('/allCategories', wrapAsync(accessoriesController.getAllCategories))   

accessoriesRouter.get('/:id', accessoriesController.getAccessory)

accessoriesRouter.get('/categories/:id', accessoriesController.getCategory)

accessoriesRouter.delete('/:id', accessoriesController.deleteAccessory)

export default accessoriesRouter