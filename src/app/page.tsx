import { DraftForm } from "@/components/product-submission-form";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:px-8 lg:px-12">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-wide text-slate-400">
            Product submission
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-50">
            Share your product details
          </h1>
          <p className="mt-3 text-base text-slate-200">
            Provide product context, payment setup, and demo assets. Submissions
            sync directly to Google Sheets so your team can triage quickly.
          </p>
        </div>
        <DraftForm />
      </div>
    </main>
  );
}
