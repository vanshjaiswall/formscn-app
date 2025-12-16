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
  product_name: z.string().min(1, "Product name is required."),
  website: z.string().min(1, "Website is required."),
  description: z.string().min(1, "Description is required."),
  product_type: z.string().min(1, "Please select a product type."),
  what_are_you_selling: z
    .string()
    .min(1, "Please describe what you are selling."),
  // Optional prototype / demo upload
  product_demo: z.array(z.string()).optional(),
  product_delivery: z
    .string()
    .min(1, "Product delivery details are required."),
  compliance_declaration: z
    .boolean()
    .refine((v) => v === true, {
      message: "Compliance declaration must be accepted.",
    }),
  social_media_links: z.string().optional(),
  current_payment_solution: z
    .string()
    .min(1, "Please select your current payment solution.")
    .optional(),
});