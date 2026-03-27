import { collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/services/firebase";
import type { Donation } from "@/types";

export async function getDonations(): Promise<Donation[]> {
  const snap = await getDocs(collection(db, "donations"));
  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Donation));
}

export async function addDonation(data: Omit<Donation, "id" | "createdAt">): Promise<string> {
  const ref = await addDoc(collection(db, "donations"), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}
