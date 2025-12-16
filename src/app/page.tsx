import { DraftForm } from "@/components/product-submission-form";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:px-8 lg:px-12">
        <div className="max-w-2xl">
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-black">
            Product submission
          </h1>
          <p className="mt-3 text-base text-black">
            Submit your product details so our team can review and get back to you.
          </p>
        </div>
        <DraftForm />
      </div>
    </main>
  );
}
