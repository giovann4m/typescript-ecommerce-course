import { Router, Request, Response } from 'express'

const router = Router()

// Dados simulados (mock)
const products = [
  { id: 1, name: 'Mouse Gamer Pro',     price: 120,  category: 'eletronicos' },
  { id: 2, name: 'Teclado Mecânico RGB', price: 350,  category: 'eletronicos' },
  { id: 3, name: 'Monitor 144Hz',        price: 1200, category: 'eletronicos' },
  { id: 4, name: 'Caneca Zentech',       price: 35,   category: 'acessorios' },
]

// GET /products  -> lista todos, com filtro opcional por categoria
router.get('/', (req: Request, res: Response) => {
  const { category } = req.query

  if (category) {
    const filtered = products.filter(p => p.category === category)
    return res.json(filtered)
  }

  res.json(products)
})

// GET /products/:id -> busca um produto específico
router.get('/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id)

  if (id < 0) {
    return res.status(400).json({ error: 'ID inválido. Não pode ser negativo.' })
  }

  const product = products.find(p => p.id === id)

  if (!product) {
    return res.status(404).json({ error: 'Produto não encontrado.' })
  }

  res.json(product)
})

export default router