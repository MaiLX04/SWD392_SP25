import { Router } from 'express'
import { accessoriesController } from '../controllers/accessories.controller.js'
import { wrapAsync } from '../utils/handler.js'
import { productValidator } from '../middlewares/product.middlewares.js'
//tạo Router
const accessoriesRouter = Router()

/*
    description: Post a new Accessories
    path: /postAccessories
    method: POST
    body: {
        type: accessories_categories,
        name: string,
        description: String,
        price: double,
        photo: string,
        status: string,
        date_added: string (ISO8601 format),
        owner: user
    }
 */
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

accessoriesRouter.get('/:id/reviews', accessoriesController.getAllReview)

accessoriesRouter.post('/:id/purchase', accessoriesController.buyAccessory)

export default accessoriesRouter