import { z } from 'zod'

// Schema para criação de categoria
export const createCategorySchema = z.object({
  name: z.string().min(3, 'O nome da categoria deve ter no mínimo 3 caracteres.')
})

// Schema para validar o ID na URL (deve ser um UUID)
export const categoryParamsSchema = z.object({
  id: z.string().uuid('ID inválido. Deve ser um UUID.')
})

// Schema para a paginação na query string
export const categoryQueryPaginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  size: z.coerce.number().int().min(1).max(100).default(10)
})

export type CreateCategoryInput = z.infer<typeof createCategorySchema>