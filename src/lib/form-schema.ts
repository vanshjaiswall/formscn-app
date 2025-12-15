import * as z from "zod"

export interface ActionResponse<T = unknown> {
      success: boolean
      message: string
      errors?: {
          [K in keyof T]?: string[]
      }
      inputs?: T
  }
  export const formSchema = z.object({
"product_name": z.string({ error: 'This field is required' }).optional(),
"website": z.string({ error: 'This field is required' }).optional(),
"description": z.string({ error: 'This field is required' }).optional(),
"product_type": z.string().min(1, 'Please select an item').optional(),
"what_are_you_selling": z.string({ error: 'This field is required' }).optional(),
"product_demo": z.array(z.string()).optional(),
"product_delivery": z.string({ error: 'This field is required' }).optional(),
"compliance_declaration": z.boolean().default(false),
"merchant_agreement_policy": z.boolean().default(false),
"social_media_links": z.string({ error: 'This field is required' }).optional(),
"current_payment_solution": z.string().min(1, 'Please select an item').optional(),
"socialmediabuttons-95d": z.unknown().optional()
});