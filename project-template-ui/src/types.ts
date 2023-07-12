import * as z from 'zod'

export const CurrentUser = z.object({
  id: z.string(),
  fullName: z.string(),
  permissions: z.record(z.boolean()),
})
export type CurrentUser = z.infer<typeof CurrentUser>
