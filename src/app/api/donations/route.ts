import { NextRequest, NextResponse } from "next/server";
import { db } from "@/services/firebase";
import { collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore";

export async function GET() {
  try {
    const snap = await getDocs(collection(db, "donations"));
    const donations = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json(donations);
  } catch {
    return NextResponse.json({ error: "Failed to fetch donations" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, amount } = body;

    if (!name || typeof name !== "string" || name.trim() === "") {
      return NextResponse.json({ error: "Invalid name" }, { status: 400 });
    }
    if (!amount || typeof amount !== "number" || amount <= 0) {
      return NextResponse.json({ error: "Amount must be a positive number" }, { status: 400 });
    }

    const ref = await addDoc(collection(db, "donations"), {
      name: name.trim(),
      amount,
      createdAt: serverTimestamp(),
    });

    return NextResponse.json({ id: ref.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to add donation" }, { status: 500 });
  }
}
