## Product Submission Form (Next.js + shadcn)

Next.js 16 app using the shadcn product submission form package, wired to Google Sheets via a service account.

## Stack
- Next.js 16, React 19, TypeScript, Tailwind v4
- shadcn/ui package: `@formcn/product-submission-form-7748583b-d70d`
- next-safe-action for server actions
- Google Sheets API (service account)

## Local setup
1) Install deps
```bash
npm install
```
2) Create `.env.local` with:
```
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-sa@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=your_sheet_id
# Optional: override target range (default Sheet1!A1)
GOOGLE_SHEET_RANGE=Sheet1!A1
```
Notes:
- Keep the literal `\n` characters in the private key or wrap in quotes to preserve newlines.
- Share the Google Sheet with the service account email as Editor.

3) Run the app
```bash
npm run dev
```
Visit http://localhost:3000 and submit the form to append rows to your sheet.

## Google Sheet headers
Ensure the first row matches this order:
```
product_name | website | description | product_type | what_are_you_selling | product_demo | product_delivery | compliance_declaration | merchant_agreement_policy | social_media_links | current_payment_solution | socialmediabuttons-95d
```
- `product_demo` stores uploaded file names.
- Boolean fields are written as `Yes/No`.

## Deploy to Vercel
1) Push this project to a Git repo.
2) One-click deploy (replace `repository-url` with your repo):
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-org/formscn-app&env=GOOGLE_SERVICE_ACCOUNT_EMAIL,GOOGLE_PRIVATE_KEY,GOOGLE_SHEET_ID,GOOGLE_SHEET_RANGE)
3) In Vercel, add the same env vars as `.env.local`.
4) Deploy. Keep the sheet shared with the service account.

## Scripts
- `npm run dev` – start dev server
- `npm run lint` – run ESLint
- `npm run build` – production build
- `npm run start` – run production build
