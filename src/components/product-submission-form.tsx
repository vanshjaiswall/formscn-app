"use client"
import * as z from "zod"
import { formSchema } from '@/lib/form-schema'
import { serverAction } from '@/actions/server-action'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"
import { useAction } from "next-safe-action/hooks"
import { motion } from "motion/react"
import { Check } from "lucide-react"
import { Field, FieldGroup, FieldContent, FieldLabel, FieldError, FieldSeparator } from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { FileUpload } from '@/components/form-fields/file-upload'
import { Switch } from "@/components/ui/switch"
import Image from "next/image"

const socialMediaButtons = [{"src":"https://cdn.brandfetch.io/id6O2oGzv-/theme/dark/symbol.svg?c=1bxid64Mup7aczewSAYMX&t=1755835725776","label":"Continue with Google"},{"src":"https://cdn.brandfetch.io/idZAyF9rlg/theme/dark/symbol.svg?c=1bxid64Mup7aczewSAYMX&t=1719469980739","label":"Continue with GitHub"}]

// Use the input type of the schema so optional fields (with defaults) align
// with what react-hook-form expects from the resolver.
type Schema = z.input<typeof formSchema>;

export function DraftForm() {

const form = useForm<Schema>({
  resolver: zodResolver(formSchema),
})
const formAction = useAction(serverAction, {
  onSuccess: () => {
    // TODO: show success message
    form.reset();
  },
  onError: () => {
  // TODO: show error message
  },
});
const handleSubmit = form.handleSubmit(async (data: Schema) => {
    formAction.execute(data);
  });

const { isExecuting, hasSucceeded } = formAction;
  if (hasSucceeded) {
    return (<div className="p-2 sm:p-5 md:p-8 w-full rounded-md gap-2 border">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, stiffness: 300, damping: 25 }}
          className="h-full py-6 px-3"
        >
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.3,
              type: "spring",
              stiffness: 500,
              damping: 15,
            }}
            className="mb-4 flex justify-center border rounded-full w-fit mx-auto p-2"
          >
            <Check className="size-8" />
          </motion.div>
          <h2 className="text-center text-2xl text-pretty font-bold mb-2">
            Thank you
          </h2>
          <p className="text-center text-lg text-pretty text-muted-foreground">
            Form submitted successfully, we will get back to you soon
          </p>
        </motion.div>
      </div>)
  }
return (
      <form
        onSubmit={handleSubmit}
        className="p-6 sm:p-8 w-full max-w-3xl mx-auto rounded-xl border border-slate-200 bg-white text-slate-900 shadow-xl"
      >
        <FieldGroup className="grid md:grid-cols-6 gap-4 mb-6">
        <h2 className="mt-4 mb-1 font-bold text-2xl tracking-tight col-span-full text-black">
          Intro
        </h2>
        <Controller
          name="product_name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1 col-span-full">
            <FieldLabel htmlFor="product_name">
              Product Name <span className="text-red-500">*</span>
            </FieldLabel>
              <Input
                {...(field as any)}
                id="product_name"
                type="text"
                onChange={(e) => {
                field.onChange(e.target.value)
                }}
                aria-invalid={fieldState.invalid}
                placeholder="Tell us about your product name"
                className="bg-white text-black placeholder:text-black border-slate-200"
              />
              
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="website"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1 col-span-full">
            <FieldLabel htmlFor="website">
              Website <span className="text-red-500">*</span>
            </FieldLabel>
              <Input
                {...(field as any)}
                id="website"
                type="text"
                onChange={(e) => {
                field.onChange(e.target.value)
                }}
                aria-invalid={fieldState.invalid}
                placeholder="If you don't have a website, submit vercel or netlify"
                className="bg-white text-black placeholder:text-black border-slate-200"
              />
              
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <h2 className="mt-4 mb-1 font-bold text-2xl tracking-tight col-span-full text-black">
          Product Details
        </h2>
        <Controller
          name="what_are_you_selling"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1 col-span-full">
            <FieldLabel htmlFor="what_are_you_selling">
              What are you selling? <span className="text-red-500">*</span>
            </FieldLabel>
              <Textarea
                {...(field as any)}
                aria-invalid={fieldState.invalid}
                id="what_are_you_selling"
                placeholder="We are building a SaaS platform that allows founders to create subscriptions, accept global payments, manage customers, and automate billing. The product helps teams launch faster by handling compliance, payments, and payouts."
                className="bg-white text-black placeholder:text-black border-slate-200 min-h-[120px]"
              />
              
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="product_type"
          control={form.control}
          render={({ field, fieldState }) => {
          const options = [
            {"label":"SaaS","value":"saas"},
            {"label":"AI Tools","value":"ai_tools"},
            {"label":"Productized Service","value":"productized_service"},
            {"label":"Course","value":"course"},
            {"label":"Templates/e-Books/3rd Party Extensions/Apps","value":"templates_ebooks_extensions"},
            {"label":"Others","value":"others"}
          ];
          return (
            <Field data-invalid={fieldState.invalid} className="gap-1 col-span-full">
            <FieldLabel htmlFor="product_type">
              Product Type <span className="text-red-500">*</span>
            </FieldLabel>
              
              <Select
                value={field.value as string}
                onValueChange={field.onChange}
              >
                <SelectTrigger className="w-full bg-white text-black border-slate-200">
                  <SelectValue placeholder="Select product type" />
                </SelectTrigger>
                <SelectContent>
                  {options.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}}
        />

        <Controller
          name="product_demo"
          control={form.control}
          render={({ field, fieldState }) => (
            <div>
              <Field data-invalid={fieldState.invalid} className="gap-1 col-span-full">
                <FieldLabel htmlFor="product_demo">
                  Product Demo
                </FieldLabel>
                <p className="text-sm text-black mb-2">
                  Upload anything that helps us understand the product better
                </p>
                <FileUpload
                  {...field}
                  setValue={form.setValue}
                  name="product_demo"
                  maxFiles={1}
                  maxSize={1048576}
                />
              </Field>
              {Array.isArray(fieldState.error) ? (
                fieldState.error?.map((error, i) => (
                  <p
                    key={i}
                    role="alert"
                    data-slot="field-error"
                    className="text-destructive text-sm"
                  >
                    {error.message}
                  </p>
                ))
              ) : (
                <FieldError errors={[fieldState.error]} />
              )}
            </div>
          )}
        />

        <Controller
          name="product_delivery"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1 col-span-full">
            <FieldLabel htmlFor="product_delivery">
              How will customers receive the product after purchase?{" "}
              <span className="text-red-500">*</span>
            </FieldLabel>
              <Input
                {...(field as any)}
                id="product_delivery"
                type="text"
                onChange={(e) => {
                field.onChange(e.target.value)
                }}
                aria-invalid={fieldState.invalid}
                placeholder="Describe how customers receive access (e.g. instant web access, download link, email delivery)."
                className="bg-white text-black placeholder:text-black border-slate-200"
              />
              
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="compliance_declaration" 
          control={form.control}
          render={({ field, fieldState }) => (
            <Field orientation="horizontal" data-invalid={fieldState.invalid} className="col-span-full">
              <FieldContent>  
                <FieldLabel htmlFor="compliance_declaration">
                  I confirm my product complies with applicable laws and platform
                  policies. <span className="text-red-500">*</span>
                </FieldLabel>
                
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </FieldContent>
              <Switch
                aria-invalid={fieldState.invalid}
                id="compliance_declaration"
                checked={field.value as boolean}
                onCheckedChange={field.onChange}
                
              />
            </Field>
          )}
        />

        <Controller
          name="merchant_agreement_policy" 
          control={form.control}
          render={({ field, fieldState }) => (
            <Field orientation="horizontal" data-invalid={fieldState.invalid} className="col-span-full">
              <FieldContent>  
                <FieldLabel htmlFor="merchant_agreement_policy">
                  Have you read the merchant acceptance policy?{" "}
                  <a
                    href="/merchant-acceptance-policy"
                    className="text-black underline underline-offset-4"
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Policy
                  </a>{" "}
                  <span className="text-red-500">*</span>
                </FieldLabel>
                
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </FieldContent>
              <Switch
                aria-invalid={fieldState.invalid}
                id="merchant_agreement_policy"
                checked={field.value as boolean}
                onCheckedChange={field.onChange}
                
              />
            </Field>
          )}
        />

<h2 className="mt-4 mb-1 font-bold text-2xl tracking-tight col-span-full text-black">
  Additional Queries
</h2>

        <Controller
          name="social_media_links"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1 col-span-full">
            <FieldLabel htmlFor="social_media_links">Social Media Links </FieldLabel>
              <Input
                id="social_media_links"
                type="text"
                onChange={(e) => {
                field.onChange(e.target.value)
                }}
                aria-invalid={fieldState.invalid}
                placeholder="Product or founder links (X, LinkedIn, GitHub, etc.)."
                className="bg-white text-slate-900 placeholder:text-slate-500 border-slate-200"
              />
              
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="current_payment_solution"
          control={form.control}
          render={({ field, fieldState }) => {
          const options = [{"label":"Paddle","value":"paddle"},{"label":"Stripe","value":"stripe"},{"label":"LemonSqueezy","value":"lemon_squeezy"},{"label":"Razorpay","value":"razorpay"},{"label":"Others","value":"others"}];
          return (
            <Field data-invalid={fieldState.invalid} className="gap-1 col-span-full">
              <FieldLabel htmlFor="current_payment_solution">Current Payment Solution </FieldLabel>
              
              <Select
                value={field.value as string}
                onValueChange={field.onChange}
              >
                <SelectTrigger className="w-full bg-white text-slate-900 border-slate-200">
                  <SelectValue  />
                </SelectTrigger>
                <SelectContent>
                  {options.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}}
        />
          </FieldGroup>
          <div className="flex justify-end items-center w-full mt-6">
            <Button
              type="submit"
              className="border border-slate-300 bg-white text-black shadow-[0_0_0_1px_rgba(148,163,184,0.9),0_10px_30px_rgba(15,23,42,0.16)] hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-0"
              aria-label="Submit product submission form"
            >
              {isExecuting ? "Submitting..." : "Submit"}
            </Button>
          </div>
      </form>
)}
