import { NextRequest, NextResponse } from "next/server";
import { db } from "@/services/firebase";
import { collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore";

export async function GET() {
  try {
    const snap = await getDocs(collection(db, "impacts"));
    const impacts = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json(impacts);
  } catch {
    return NextResponse.json({ error: "Failed to fetch impacts" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { image, caption } = body;

    if (!image || typeof image !== "string" || image.trim() === "") {
      return NextResponse.json({ error: "Invalid image URL" }, { status: 400 });
    }
    if (!caption || typeof caption !== "string" || caption.trim() === "") {
      return NextResponse.json({ error: "Invalid caption" }, { status: 400 });
    }

    const ref = await addDoc(collection(db, "impacts"), {
      image: image.trim(),
      caption: caption.trim(),
      createdAt: serverTimestamp(),
    });

    return NextResponse.json({ id: ref.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to add impact" }, { status: 500 });
  }
}
