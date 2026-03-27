import { Timestamp } from "firebase/firestore";

interface Donation {
  id: string;
  name: string;
  amount: number;
  createdAt: Timestamp;
}

export default function DonationList({ donations }: { donations: Donation[] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-800">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400 uppercase text-xs">
          <tr>
            <th className="px-6 py-3 text-left">Name</th>
            <th className="px-6 py-3 text-left">Amount</th>
            <th className="px-6 py-3 text-left">Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-800 bg-white dark:bg-gray-950">
          {donations.map((d) => (
            <tr key={d.id} className="hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
              <td className="px-6 py-4 font-medium">{d.name}</td>
              <td className="px-6 py-4 text-green-600 dark:text-green-400">₹{d.amount.toLocaleString()}</td>
              <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                {d.createdAt?.toDate().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
              </td>
            </tr>
          ))}
          {donations.length === 0 && (
            <tr>
              <td colSpan={3} className="px-6 py-8 text-center text-gray-400">No donations yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
