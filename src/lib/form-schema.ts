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
  product_name: z.string({ required_error: "Product name is required." }),
  website: z.string({ required_error: "Website is required." }),
  description: z.string({ required_error: "Description is required." }),
  product_type: z.string().min(1, "Please select a product type."),
  what_are_you_selling: z.string({
    required_error: "Please describe what you are selling.",
  }),
  product_demo: z
    .array(z.string())
    .min(1, "Please upload at least one prototype or product demo."),
  product_delivery: z.string({
    required_error: "Product delivery details are required.",
  }),
  compliance_declaration: z
    .boolean()
    .refine((v) => v === true, {
      message: "Compliance declaration must be accepted.",
    }),
  merchant_agreement_policy: z
    .boolean()
    .refine((v) => v === true, {
      message: "Merchant Acceptance Policy (MAP) must be accepted.",
    }),
  social_media_links: z.string().optional(),
  current_payment_solution: z
    .string()
    .min(1, "Please select your current payment solution.")
    .optional(),
});