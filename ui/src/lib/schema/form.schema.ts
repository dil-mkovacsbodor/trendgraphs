import { z } from 'zod'

export const formSchema = z.object({
  company: z.string().min(1, { message: 'Required' }),
  region: z.string().min(1, { message: 'Required' }),
  focus: z.string().min(1, { message: 'Required' }),
  industry: z.string().min(1, { message: 'Required' }),
  marketInsight: z.string().min(1, { message: 'Required' }),
  dashboardType: z.string().min(1, { message: 'Required' }),
  competitors: z.array(z.string()).min(1, { message: 'Required' }),
  partners: z.array(z.string()).min(1, { message: 'Required' }),
  timeframe: z
    .object({
      from: z.date({ required_error: 'Required' }),
      to: z.date({ required_error: 'Required' }),
    })
    .optional()
    .refine(
      data => {
        if (!data) return false;
        const now = new Date();
        return data.from <= now && data.to <= now && data.to >= data.from;
      },
      {
        message: 'Dates must be in the past and end date must be after start date',
        path: ['to'],
      }
    ),
})

export const queryPayloadSchema = formSchema.extend({
  timeframe: z.array(z.string().datetime()),
})

export type FormValues = z.infer<typeof formSchema>
export type QueryPayload = z.infer<typeof queryPayloadSchema>
