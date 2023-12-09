import z from 'zod'

export const updateProductSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Name is required',
        invalid_type_error: 'Name is required',
      })
      .optional(),
  }),
})

export const createProductSchema = z.object({
  body: z
    .object({
      name: z.string({
        required_error: 'Name is required',
        invalid_type_error: 'Name is required',
      }),
    })
    .strict(),
})

export const deleteProductSchema = z.object({
  params: z.object({
    id: z.string({
      required_error: 'Product identifier is required',
      invalid_type_error: 'Product identifier is required',
    }),
  }),
})
