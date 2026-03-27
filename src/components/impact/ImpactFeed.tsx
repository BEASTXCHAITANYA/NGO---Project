"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/services/firebase";

interface ImpactPost {
  id: string;
  image: string;
  caption: string;
  createdAt: { seconds: number } | null;
}

function timeAgo(seconds: number) {
  const diff = Math.floor(Date.now() / 1000) - seconds;
  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function ImpactFeed() {
  const [posts, setPosts] = useState<ImpactPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "impacts"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setPosts(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() } as ImpactPost)));
      setLoading(false);
    });
    return () => unsub();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden animate-pulse">
            <div className="aspect-video bg-white/10" />
            <div className="p-4 space-y-2">
              <div className="h-3 bg-white/10 rounded-full w-4/5" />
              <div className="h-3 bg-white/10 rounded-full w-2/5" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-16 space-y-2">
        <div className="text-4xl">🌱</div>
        <p className="text-gray-500 text-sm">No impact stories yet. Be the first to share one!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {posts.map((post) => (
        <div
          key={post.id}
          className="group rounded-2xl border border-white/10 bg-white/5 overflow-hidden hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300"
        >
          {/* Image */}
          <div className="relative aspect-video overflow-hidden bg-gray-900">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.image}
              alt={post.caption}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Caption + time */}
          <div className="p-4 space-y-1">
            <p className="text-sm text-gray-200 leading-snug">{post.caption}</p>
            {post.createdAt && (
              <p className="text-xs text-gray-600">{timeAgo(post.createdAt.seconds)}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
