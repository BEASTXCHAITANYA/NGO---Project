import DonateForm from "@/components/payments/DonateForm";

export default function DonatePage() {
  return (
    <main className="max-w-lg mx-auto px-4 py-16 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-white">Make a Donation</h1>
        <p className="text-sm text-gray-400">Every contribution goes directly to communities in need.</p>
      </div>
      <DonateForm />
    </main>
  );
}
