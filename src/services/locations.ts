import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "@/services/firebase";
import type { Location } from "@/types";

export async function getLocations(): Promise<Location[]> {
  const snap = await getDocs(collection(db, "locations"));
  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Location));
}

export async function addLocation(data: Omit<Location, "id">): Promise<string> {
  const ref = await addDoc(collection(db, "locations"), data);
  return ref.id;
}
