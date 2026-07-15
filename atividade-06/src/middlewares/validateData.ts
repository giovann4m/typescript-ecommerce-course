import { Request, Response, NextFunction } from 'express'
import { ZodSchema } from 'zod'

// target define onde estão os dados a validar: body, params ou query
type ValidationTarget = 'body' | 'params' | 'query'

export function validateData(schema: ZodSchema, target: ValidationTarget = 'body') {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[target])

    if (!result.success) {
      return res.status(400).json({
        error: 'Dados inválidos.',
        details: result.error.format()
      })
    }

    // Substitui os dados originais pelos já validados/convertidos (ex: page como number)
    req[target] = result.data
    next()
  }
}