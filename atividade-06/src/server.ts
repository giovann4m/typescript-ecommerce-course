import express from 'express'
import { logger } from './logger.middleware'
import productsRouter from './routes/products.routes'
import ordersRouter from './routes/orders.routes'

const app = express()
const PORT = 3000

// Middlewares globais
app.use(express.json())
app.use(logger)

// Rotas
app.use('/products', productsRouter)
app.use('/orders', ordersRouter)

app.get('/', (req, res) => {
  res.json({ message: 'API Zentech rodando! 🚀' })
})

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})