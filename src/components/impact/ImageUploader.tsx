"use client";

import { useRef, useState } from "react";
import { addImpact } from "@/services/impacts";

export default function ImageUploader() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 1.5 * 1024 * 1024) {
      setError("Image must be under 1.5 MB.");
      return;
    }
    setError(null);
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  }

  async function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault();
    if (!preview) { setError("Please select an image."); return; }
    setLoading(true);
    setError(null);
    try {
      await addImpact({
        image: preview,
        caption: caption.trim() || "A moment of impact captured by SevaConnect.",
      });
      setPreview(null);
      setCaption("");
      if (fileRef.current) fileRef.current.value = "";
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch {
      setError("Failed to upload. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6 space-y-4"
    >
      <h2 className="text-lg font-semibold text-white">Share an Impact Moment</h2>

      {/* Image picker */}
      <div
        onClick={() => fileRef.current?.click()}
        className="relative cursor-pointer rounded-xl border-2 border-dashed border-white/20 hover:border-indigo-500/60 transition-colors overflow-hidden flex items-center justify-center"
        style={{ minHeight: "160px" }}
      >
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="preview" className="w-full h-48 object-cover rounded-xl" />
        ) : (
          <div className="text-center py-10 px-4 space-y-2">
            <div className="text-3xl">📷</div>
            <p className="text-sm text-gray-400">Click to upload a photo</p>
            <p className="text-xs text-gray-600">Max 1.5 MB</p>
          </div>
        )}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFile}
        />
      </div>

      {/* Caption */}
      <input
        type="text"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        placeholder="Add a caption (optional)…"
        className="w-full rounded-xl border border-white/10 bg-gray-900 px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
      />

      {error && (
        <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
          {error}
        </p>
      )}
      {success && (
        <p className="text-sm text-green-400 bg-green-500/10 border border-green-500/20 rounded-lg px-3 py-2">
          ✓ Impact shared successfully!
        </p>
      )}

      <button
        type="submit"
        disabled={loading || !preview}
        className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 py-2.5 text-sm font-semibold text-white transition shadow-lg shadow-indigo-500/20"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Uploading…
          </span>
        ) : "Share Impact"}
      </button>
    </form>
  );
}
