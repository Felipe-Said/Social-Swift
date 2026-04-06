import { Play } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Post } from "@/stores/feed";
import type { Snap } from "@/stores/snaps";

export type MediaGridItem =
  | {
      id: string;
      kind: "post";
      mediaType: "image" | "video";
      imageUrl: string;
      label: string;
      count?: number;
    }
  | {
      id: string;
      kind: "snap";
      mediaType: "image" | "video";
      imageUrl: string;
      label: string;
      count?: number;
    };

export function buildPostGridItems(posts: Post[]): MediaGridItem[] {
  return posts
    .filter((post) => post.media?.url)
    .map((post) => ({
      id: post.id,
      kind: "post" as const,
      mediaType: post.media?.type || "image",
      imageUrl: post.media?.thumbnail || post.media?.url || "",
      label: post.content,
      count: post.likes,
    }));
}

export function buildSnapGridItems(snaps: Snap[]): MediaGridItem[] {
  return snaps.map((snap) => ({
    id: snap.id,
    kind: "snap" as const,
    mediaType: snap.media.type,
    imageUrl: snap.media.url,
    label: snap.description,
    count: snap.likes,
  }));
}

interface ProfileMediaGridProps {
  items: MediaGridItem[];
  onSelect?: (item: MediaGridItem) => void;
}

export function ProfileMediaGrid({ items, onSelect }: ProfileMediaGridProps) {
  return (
    <div className="grid grid-cols-3 gap-1 md:gap-1.5">
      {items.map((item) => (
        <button
          type="button"
          key={`${item.kind}-${item.id}`}
          onClick={() => onSelect?.(item)}
          className="group relative aspect-square overflow-hidden bg-[#111111] text-left"
        >
          <img
            src={item.imageUrl}
            alt={item.label}
            className={cn(
              "h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]",
              item.kind === "snap" && item.mediaType === "video" && "brightness-[0.88]",
            )}
          />

          {item.mediaType === "video" && (
            <div className="absolute right-2 top-2 rounded-full bg-black/45 p-1 text-white">
              <Play className="h-3.5 w-3.5 fill-current" />
            </div>
          )}

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

          {typeof item.count === "number" && (
            <div className="pointer-events-none absolute bottom-2 left-2 text-[11px] font-semibold text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              {item.count.toLocaleString("pt-BR")}
            </div>
          )}
        </button>
      ))}
    </div>
  );
}
