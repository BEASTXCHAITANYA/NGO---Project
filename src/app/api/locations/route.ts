import { NextRequest, NextResponse } from "next/server";
import { db } from "@/services/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

export async function GET() {
  try {
    const snap = await getDocs(collection(db, "locations"));
    const locations = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json(locations);
  } catch {
    return NextResponse.json({ error: "Failed to fetch locations" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { lat, lng, type, description } = body;

    if (typeof lat !== "number" || typeof lng !== "number") {
      return NextResponse.json({ error: "lat and lng must be numbers" }, { status: 400 });
    }
    if (type !== "need" && type !== "helped") {
      return NextResponse.json({ error: "type must be 'need' or 'helped'" }, { status: 400 });
    }
    if (!description || typeof description !== "string" || description.trim() === "") {
      return NextResponse.json({ error: "Invalid description" }, { status: 400 });
    }

    const ref = await addDoc(collection(db, "locations"), {
      lat,
      lng,
      type,
      description: description.trim(),
    });

    return NextResponse.json({ id: ref.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to add location" }, { status: 500 });
  }
}
