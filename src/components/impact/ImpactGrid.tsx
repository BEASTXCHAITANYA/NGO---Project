import { Timestamp } from "firebase/firestore";
import Image from "next/image";

interface Impact {
  id: string;
  image: string;
  caption: string;
  createdAt: Timestamp;
}

export default function ImpactGrid({ impacts }: { impacts: Impact[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {impacts.map((item) => (
        <div key={item.id} className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
          <div className="relative aspect-video bg-gray-100 dark:bg-gray-800">
            <Image src={item.image} alt={item.caption} fill className="object-cover" />
          </div>
          <div className="p-4">
            <p className="text-sm font-medium">{item.caption}</p>
            <p className="mt-1 text-xs text-gray-400">
              {item.createdAt?.toDate().toLocaleDateString("en-IN")}
            </p>
          </div>
        </div>
      ))}
      {impacts.length === 0 && (
        <p className="col-span-3 text-center py-12 text-gray-400">No impact stories yet.</p>
      )}
    </div>
  );
}
