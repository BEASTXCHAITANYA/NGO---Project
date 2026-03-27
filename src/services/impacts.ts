import { collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/services/firebase";
import type { Impact } from "@/types";

export async function getImpacts(): Promise<Impact[]> {
  const snap = await getDocs(collection(db, "impacts"));
  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Impact));
}

export async function addImpact(data: Omit<Impact, "id" | "createdAt">): Promise<string> {
  const ref = await addDoc(collection(db, "impacts"), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}
