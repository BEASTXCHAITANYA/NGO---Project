interface StatsCardProps {
  title: string;
  value: string | number;
  unit?: string;
}

export default function StatsCard({ title, value, unit }: StatsCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
      <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
      <p className="mt-1 text-3xl font-bold">
        {value}
        {unit && <span className="ml-1 text-lg font-normal text-gray-400">{unit}</span>}
      </p>
    </div>
  );
}
