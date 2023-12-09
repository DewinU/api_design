import z from 'zod'

export const createUpdateSchema = z.object({
  body: z.object({
    productId: z.string({
      required_error: 'Product identifier is required',
      invalid_type_error: 'Product identifier is required',
    }),
    title: z.string({
      required_error: 'Title is required',
      invalid_type_error: 'Title is required',
    }),
    status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'SHIPPED'], {
      description: 'Status of the update',
      required_error: 'Status is required',
      invalid_type_error: 'Status is required',
    }),
    description: z.string({
      required_error: 'Description is required',
      invalid_type_error: 'Description is required',
    }),
    version: z
      .string({
        required_error: 'Version is required',
        invalid_type_error: 'Version is required',
      })
      .optional(),
    media: z.string({}).optional(),
  }),
})

export const updateUpdateSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
      invalid_type_error: 'Title is required',
    }),
    status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'SHIPPED'], {
      description: 'Status of the update',
      required_error: 'Status is required',
      invalid_type_error: 'Status is required',
    }),
    description: z.string({
      required_error: 'Description is required',
      invalid_type_error: 'Description is required',
    }),
    version: z
      .string({
        required_error: 'Version is required',
        invalid_type_error: 'Version is required',
      })
      .optional(),
    media: z.string({}).optional(),
  }),
})

export const deleteUpdateSchema = z.object({
  params: z.object({
    id: z.string({
      required_error: 'Update identifier is required',
      invalid_type_error: 'Update identifier is required',
    }),
  }),
})
