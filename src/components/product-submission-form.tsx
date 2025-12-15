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
    className="p-6 sm:p-8 w-full max-w-3xl mx-auto rounded-xl border border-slate-700 bg-slate-900 text-slate-50"
  >
        <FieldGroup className="grid md:grid-cols-6 gap-4 mb-6">
          <h2 className="mt-4 mb-1 font-bold text-2xl tracking-tight col-span-full">Intro</h2>

        <Controller
          name="product_name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1 col-span-full">
            <FieldLabel htmlFor="product_name">Product Name </FieldLabel>
              <Input
                {...field}
                id="product_name"
                type="text"
                onChange={(e) => {
                field.onChange(e.target.value)
                }}
                aria-invalid={fieldState.invalid}
                placeholder="Working name of your product."
                
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
            <FieldLabel htmlFor="website">Website </FieldLabel>
              <Input
                {...field}
                id="website"
                type="text"
                onChange={(e) => {
                field.onChange(e.target.value)
                }}
                aria-invalid={fieldState.invalid}
                placeholder="Provide a working website (e.g. .vercel.app, .netlify.app)."
                
              />
              
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1 col-span-full">
            <FieldLabel htmlFor="description">Description </FieldLabel>
              <Input
                {...field}
                id="description"
                type="text"
                onChange={(e) => {
                field.onChange(e.target.value)
                }}
                aria-invalid={fieldState.invalid}
                placeholder="A SaaS tool that helps businesses manage subscriptions and accept global payments."
                
              />
              
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="product_type"
          control={form.control}
          render={({ field, fieldState }) => {
          const options = [{"label":"SaaS","value":"saas"},{"label":"e-Books","value":"ebooks"},{"label":"AI Tools","value":"ai_tools"},{"label":"Productized Service","value":"productized_service"},{"label":"Course","value":"course"},{"label":"3rd Party Extensions / Apps","value":"third_party"},{"label":"Templates","value":"templates"},{"label":"Others","value":"others"}];
          return (
            <Field data-invalid={fieldState.invalid} className="gap-1 col-span-full">
              <FieldLabel htmlFor="product_type">Product Type </FieldLabel>
              
              <Select
                value={field.value}
                onValueChange={field.onChange}
                
              >
                <SelectTrigger className="w-full">
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
<h2 className="mt-4 mb-1 font-bold text-2xl tracking-tight col-span-full">What You’re Selling</h2>

          <Controller
              name="what_are_you_selling"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1 col-span-full">
                <FieldLabel htmlFor="what_are_you_selling">What are you selling? </FieldLabel>
                  <Textarea
                    {...field}
                    aria-invalid={fieldState.invalid}
                    id="what_are_you_selling"
                    placeholder="We are building a SaaS platform that allows founders to create subscriptions, accept global payments, manage customers, and automate billing. The product helps teams launch faster by handling compliance, payments, and payouts."
                    
                  />
                  
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

        <Controller
          name="product_demo"
          control={form.control}
          render={({ field, fieldState }) => (
            <div>
              <Field data-invalid={fieldState.invalid} className="gap-1 col-span-full">
                <FieldLabel htmlFor="product_demo">Product Demo </FieldLabel>
                
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
            <FieldLabel htmlFor="product_delivery">Product Delivery </FieldLabel>
              <Input
                {...field}
                id="product_delivery"
                type="text"
                onChange={(e) => {
                field.onChange(e.target.value)
                }}
                aria-invalid={fieldState.invalid}
                placeholder="Instant access via web app after payment, enterprise sales over email, or manual selling via social media."
                
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
                <FieldLabel htmlFor="compliance_declaration">Compliance Declaration </FieldLabel>
                
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </FieldContent>
              <Switch
                aria-invalid={fieldState.invalid}
                id="compliance_declaration"
                checked={field.value}
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
                <FieldLabel htmlFor="merchant_agreement_policy">Merchant Agreement Policy (MAP) </FieldLabel>
                
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </FieldContent>
              <Switch
                aria-invalid={fieldState.invalid}
                id="merchant_agreement_policy"
                checked={field.value}
                onCheckedChange={field.onChange}
                
              />
            </Field>
          )}
        />
<h2 className="mt-4 mb-1 font-bold text-2xl tracking-tight col-span-full">Additional Queries</h2>

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
                value={field.value}
                onValueChange={field.onChange}
                
              >
                <SelectTrigger className="w-full">
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
<FieldSeparator className="my-4" />
<div className="flex gap-3 justify-center w-full items-center flex-wrap pb-3 col-span-full">
          {socialMediaButtons.map((o) => (
            <Button key={o.label} variant="outline" type="button"
              className="text-sm gap-2 px-2 h-10 grow ">
              <div className="place-items-center grid rounded-full bg-white size-6 p-0.5">
                <Image src={o.src} alt={o.label} width={16} height={16} />
              </div>
              {o.label}
            </Button>
          ))}
        </div>
          </FieldGroup>
          <div className="flex justify-end items-center w-full">
            <Button>
              {isExecuting ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
      </form>
)}
