import { useEffect, useState, useSyncExternalStore } from "react";

export type Kind = "articles" | "news";
export type Comment = { id: string; name: string; text: string; ts: number };
export type Metrics = { views: number; likes: number; liked: boolean; comments: Comment[] };

const KEY = (kind: Kind, id: string) => `rsic.metrics.${kind}.${id}`;
const VIEW_FLAG = (kind: Kind, id: string) => `rsic.metrics.viewed.${kind}.${id}`;

// Deterministic seed from id so both languages agree
function seed(id: string): Metrics {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  const views = 40 + (h % 360);
  const likes = 3 + ((h >>> 4) % 38);
  return { views, likes, liked: false, comments: [] };
}

function read(kind: Kind, id: string): Metrics {
  if (typeof localStorage === "undefined") return seed(id);
  try {
    const raw = localStorage.getItem(KEY(kind, id));
    if (raw) return JSON.parse(raw) as Metrics;
  } catch {}
  const s = seed(id);
  try {
    localStorage.setItem(KEY(kind, id), JSON.stringify(s));
  } catch {}
  return s;
}

function write(kind: Kind, id: string, m: Metrics) {
  try {
    localStorage.setItem(KEY(kind, id), JSON.stringify(m));
  } catch {}
  bus.dispatchEvent(new CustomEvent(`m:${kind}:${id}`));
}

const bus = typeof window !== "undefined" ? new EventTarget() : new EventTarget();

function subscribe(kind: Kind, id: string, cb: () => void) {
  const evt = `m:${kind}:${id}`;
  bus.addEventListener(evt, cb);
  return () => bus.removeEventListener(evt, cb);
}

export function useMetrics(kind: Kind, id: string) {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  const snap = useSyncExternalStore(
    (cb) => subscribe(kind, id, cb),
    () => (hydrated ? JSON.stringify(read(kind, id)) : ""),
    () => "",
  );
  const m: Metrics = hydrated && snap ? JSON.parse(snap) : seed(id);

  const toggleLike = () => {
    const cur = read(kind, id);
    const next: Metrics = {
      ...cur,
      liked: !cur.liked,
      likes: Math.max(0, cur.likes + (cur.liked ? -1 : 1)),
    };
    write(kind, id, next);
  };

  const addComment = (name: string, text: string) => {
    const cur = read(kind, id);
    const c: Comment = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: name.trim() || "Anonymous",
      text: text.trim(),
      ts: Date.now(),
    };
    if (!c.text) return;
    write(kind, id, { ...cur, comments: [c, ...cur.comments] });
  };

  const registerView = () => {
    if (typeof sessionStorage === "undefined") return;
    const flag = VIEW_FLAG(kind, id);
    if (sessionStorage.getItem(flag)) return;
    sessionStorage.setItem(flag, "1");
    const cur = read(kind, id);
    write(kind, id, { ...cur, views: cur.views + 1 });
  };

  return {
    views: m.views,
    likes: m.likes,
    liked: m.liked,
    comments: m.comments,
    commentCount: m.comments.length,
    toggleLike,
    addComment,
    registerView,
  };
}
