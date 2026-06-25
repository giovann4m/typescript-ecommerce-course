import { Router, Request, Response } from 'express'

const router = Router()

// POST /orders -> cria um novo pedido
router.post('/', (req: Request, res: Response) => {
  const body = req.body

  // Validação: body vazio
  if (!body || Object.keys(body).length === 0) {
    return res.status(400).json({ error: 'O corpo da requisição não pode estar vazio.' })
  }

  // Validação básica dos campos esperados
  if (!body.customerName || !body.productIds) {
    return res.status(400).json({ error: 'Envie customerName e productIds.' })
  }

  const newOrder = {
    id: Date.now(),
    customerName: body.customerName,
    productIds: body.productIds,
    status: 'pendente'
  }

  res.status(201).json(newOrder)
})

// PATCH /orders/:id -> atualiza o status do pedido
router.patch('/:id', (req: Request, res: Response) => {
  const { id } = req.params
  const { status } = req.body

  if (!status) {
    return res.status(400).json({ error: 'Envie o novo status no body.' })
  }

  res.json({
    id: Number(id),
    status,
    message: `Pedido ${id} atualizado para status "${status}".`
  })
})

// DELETE /orders/:id -> cancela o pedido
router.delete('/:id', (req: Request, res: Response) => {
  res.status(204).send()
})

export default router