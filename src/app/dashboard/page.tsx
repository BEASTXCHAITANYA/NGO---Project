"use client";

import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import StatsCard from "@/components/dashboard/StatsCard";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Donation {
  id: string;
  name: string;
  amount: number;
}

export default function DashboardPage() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/donations")
      .then((r) => r.json())
      .then((data) => { setDonations(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const total = donations.reduce((sum, d) => sum + d.amount, 0);

  const chartData = {
    labels: donations.map((d) => d.name),
    datasets: [
      {
        label: "Amount (₹)",
        data: donations.map((d) => d.amount),
        backgroundColor: "rgba(99, 102, 241, 0.7)",
        borderRadius: 6,
      },
    ],
  };

  return (
    <main className="max-w-5xl mx-auto px-4 py-12 space-y-10">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {loading ? (
        <div className="flex items-center justify-center h-40">
          <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <StatsCard title="Total Raised" value={`₹${total.toLocaleString("en-IN")}`} />
            <StatsCard title="Total Donors" value={donations.length} unit="donors" />
            <StatsCard title="Avg. Donation" value={donations.length ? `₹${Math.round(total / donations.length).toLocaleString("en-IN")}` : "—"} />
          </div>

          {donations.length > 0 && (
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
              <h2 className="text-lg font-semibold mb-4">Donations by Donor</h2>
              <Bar data={chartData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
            </div>
          )}
        </>
      )}
    </main>
  );
}
