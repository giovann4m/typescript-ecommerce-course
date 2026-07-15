import { z } from 'zod'

// Schema para criação de produto
export const createProductSchema = z.object({
  name: z.string().min(3, 'O nome do produto deve ter no mínimo 3 caracteres.'),
  price: z.number().positive('O preço deve ser um número positivo.'),
  categoryId: z.string().uuid('categoryId inválido. Deve ser um UUID.')
})

// Schema para validar o ID na URL
export const productParamsSchema = z.object({
  id: z.string().uuid('ID inválido. Deve ser um UUID.')
})

export type CreateProductInput = z.infer<typeof createProductSchema>