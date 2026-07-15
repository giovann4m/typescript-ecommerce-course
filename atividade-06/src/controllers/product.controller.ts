import { Request, Response } from 'express'
import { v4 as uuid } from 'uuid'
import { categories } from './category.controller'
import { CreateProductInput } from '../schemas/product.schema'

// Dados simulados (mock) em memória
const products = [
  { id: uuid(), name: 'Mouse Gamer Pro', price: 120, categoryId: categories[0].id },
  { id: uuid(), name: 'Caneca Zentech',  price: 35,  categoryId: categories[1].id }
]

export const productController = {

  // GET /products
  list(req: Request, res: Response) {
    const { category } = req.query

    if (category) {
      const filtered = products.filter(p => p.categoryId === category)
      return res.status(200).json(filtered)
    }

    res.status(200).json(products)
  },

  // POST /products
  create(req: Request, res: Response) {
    const data = req.body as CreateProductInput

    const newProduct = {
      id: uuid(),
      name: data.name,
      price: data.price,
      categoryId: data.categoryId
    }

    products.push(newProduct)

    res.status(201).json(newProduct)
  },

  // DELETE /products/:id
  remove(req: Request, res: Response) {
    const { id } = req.params

    const index = products.findIndex(p => p.id === id)

    if (index === -1) {
      return res.status(404).json({ error: 'Produto não encontrado.' })
    }

    products.splice(index, 1)

    res.status(204).send()
  }
}