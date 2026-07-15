import { Router } from 'express'
import { productController } from '../controllers/product.controller'
import { validateData } from '../middlewares/validateData'
import { createProductSchema, productParamsSchema } from '../schemas/product.schema'

const router = Router()

router.get('/', productController.list)

router.post(
  '/',
  validateData(createProductSchema, 'body'),
  productController.create
)

router.delete(
  '/:id',
  validateData(productParamsSchema, 'params'),
  productController.remove
)

export default router