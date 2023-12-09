import z from 'zod'

export const createChangelogSchema = z.object({
  body: z.object({
    updateId: z.string({
      required_error: 'Update identifier is required',
      invalid_type_error: 'Update identifier is required',
    }),
    name: z.string({
      required_error: 'Name is required',
      invalid_type_error: 'Name is required',
    }),
    description: z.string({
      required_error: 'Description is required',
      invalid_type_error: 'Description is required',
    }),
  }),
})

export const updateChangelogSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Name is required',
        invalid_type_error: 'Name is required',
      })
      .optional(),
    description: z
      .string({
        required_error: 'Description is required',
        invalid_type_error: 'Description is required',
      })
      .optional(),
  }),
})

export const deleteChangelogSchema = z.object({
  params: z.object({
    id: z.string({
      required_error: 'Changelog identifier is required',
      invalid_type_error: 'Changelog identifier is required',
    }),
  }),
})
