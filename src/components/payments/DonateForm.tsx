"use client";

import { useState } from "react";

export default function DonateForm() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault();
    setError(null);

    const parsedAmount = parseFloat(amount);
    if (!name.trim()) { setError("Please enter your name."); return; }
    if (!parsedAmount || parsedAmount <= 0) { setError("Please enter a valid amount."); return; }

    setLoading(true);
    try {
      const res = await fetch("/api/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), amount: parsedAmount }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");

      setSuccess(true);
      setName("");
      setAmount("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="rounded-2xl border border-green-500/30 bg-green-500/10 p-10 text-center space-y-4">
        <div className="text-5xl">🙏</div>
        <h2 className="text-xl font-bold text-green-400">Thank you for your donation!</h2>
        <p className="text-sm text-gray-400">Your generosity helps us build stronger communities across India.</p>
        <button
          onClick={() => setSuccess(false)}
          className="mt-2 px-5 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-sm text-gray-300 transition"
        >
          Donate Again
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-8">
      {error && (
        <div className="rounded-lg bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <div className="space-y-1.5">
        <label htmlFor="name" className="block text-sm font-medium text-gray-300">Your name</label>
        <input
          id="name" type="text" required
          value={name} onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-gray-900 px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          placeholder="Jane Doe"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="amount" className="block text-sm font-medium text-gray-300">Amount (₹)</label>
        <input
          id="amount" type="number" min="1" step="1" required
          value={amount} onChange={(e) => setAmount(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-gray-900 px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          placeholder="500"
        />
      </div>

      <button
        type="submit" disabled={loading}
        className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Processing…
          </span>
        ) : "Donate Now"}
      </button>

      <p className="flex items-center justify-center gap-1.5 text-xs text-yellow-500/70">
        <span>⚠️</span>
        Demo mode — no real payments are processed.
      </p>
    </form>
  );
}
