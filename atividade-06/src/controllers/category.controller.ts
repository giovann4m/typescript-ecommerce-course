import { Request, Response } from 'express'
import { v4 as uuid } from 'uuid'
import { CreateCategoryInput } from '../schemas/category.schema'

// Dados simulados (mock) em memória
export const categories = [
  { id: uuid(), name: 'Eletrônicos' },
  { id: uuid(), name: 'Acessórios' }
]

export const categoryController = {

  // GET /category
  list(req: Request, res: Response) {
    const { page, size } = req.query as unknown as { page: number; size: number }

    const start = (page - 1) * size
    const end = start + size
    const paginated = categories.slice(start, end)

    res.status(200).json({
      page,
      size,
      total: categories.length,
      data: paginated
    })
  },

  // GET /category/:id
  getById(req: Request, res: Response) {
    const { id } = req.params

    const category = categories.find(c => c.id === id)

    if (!category) {
      return res.status(404).json({ error: 'Categoria não encontrada.' })
    }

    res.status(200).json(category)
  },

  // POST /category
  create(req: Request, res: Response) {
    const data = req.body as CreateCategoryInput

    const newCategory = {
      id: uuid(),
      name: data.name
    }

    categories.push(newCategory)

    res.status(201).json(newCategory)
  },

  // PUT /category/:id
  update(req: Request, res: Response) {
    const { id } = req.params
    const data = req.body as CreateCategoryInput

    const category = categories.find(c => c.id === id)

    if (!category) {
      return res.status(404).json({ error: 'Categoria não encontrada.' })
    }

    category.name = data.name

    res.status(200).json(category)
  },

  // DELETE /category/:id
  remove(req: Request, res: Response) {
    const { id } = req.params

    const index = categories.findIndex(c => c.id === id)

    if (index === -1) {
      return res.status(404).json({ error: 'Categoria não encontrada.' })
    }

    categories.splice(index, 1)

    res.status(204).send()
  }
}