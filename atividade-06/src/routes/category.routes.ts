import { Router } from 'express'
import { categoryController } from '../controllers/category.controller'
import { validateData } from '../middlewares/validateData'
import {
  createCategorySchema,
  categoryParamsSchema,
  categoryQueryPaginationSchema
} from '../schemas/category.schema'

const router = Router()

router.get(
  '/',
  validateData(categoryQueryPaginationSchema, 'query'),
  categoryController.list
)

router.get(
  '/:id',
  validateData(categoryParamsSchema, 'params'),
  categoryController.getById
)

router.post(
  '/',
  validateData(createCategorySchema, 'body'),
  categoryController.create
)

router.put(
  '/:id',
  validateData(categoryParamsSchema, 'params'),
  validateData(createCategorySchema, 'body'),
  categoryController.update
)

router.delete(
  '/:id',
  validateData(categoryParamsSchema, 'params'),
  categoryController.remove
)

export default router