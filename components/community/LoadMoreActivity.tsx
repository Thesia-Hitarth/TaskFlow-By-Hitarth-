"use client";

import { useState } from "react";
import { getMoreActivityAction, FeedItem } from "@/lib/actions/activity";
import { formatTimeAgo } from "@/lib/utils";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface LoadMoreActivityProps {
  initialBeforeTimeISO: string | null;
}

export function LoadMoreActivity({ initialBeforeTimeISO }: LoadMoreActivityProps) {
  const [items, setItems] = useState<FeedItem[]>([]);
  const [beforeTimeISO, setBeforeTimeISO] = useState<string | null>(initialBeforeTimeISO);
  const [loading, setLoading] = useState(false);

  const loadMore = async () => {
    if (!beforeTimeISO || loading) return;
    setLoading(true);
    try {
      const res = await getMoreActivityAction(beforeTimeISO);
      setItems((prev) => [...prev, ...res.items]);
      setBeforeTimeISO(res.nextBeforeTimeISO);
    } catch (err) {
      console.error("Failed to load more activity:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Paginated list */}
      {items.map((item, idx) => {
        const userProfileUrl = item.user.username ? `/u/${item.user.username}` : "#";

        return (
          <div
            key={`more-${idx}`}
            className="flex items-start gap-3.5 p-4 rounded-2xl bg-card border border-border hover:border-accent/10 transition-all text-left"
          >
            {item.user.image ? (
              <Image
                src={item.user.image}
                alt={item.user.name || "User"}
                width={32}
                height={32}
                className="w-8 h-8 rounded-full border border-border object-cover shrink-0 mt-0.5"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-border flex items-center justify-center text-[10px] font-bold text-text-secondary shrink-0 mt-0.5">
                {(item.user.name || "U").charAt(0).toUpperCase()}
              </div>
            )}

            <div className="flex-1 min-w-0">
              <p className="text-sm text-text-secondary font-medium leading-relaxed">
                {item.user.username ? (
                  <Link
                    href={userProfileUrl}
                    className="font-extrabold text-text-primary hover:text-accent transition-colors"
                  >
                    {item.user.name || item.user.username}
                  </Link>
                ) : (
                  <span className="font-extrabold text-text-primary">
                    {item.user.name || "Anonymous"}
                  </span>
                )}{" "}
                {item.type === "progress" ? (
                  <>
                    completed{" "}
                    <span className="font-bold text-text-primary capitalize">
                      {item.nodeId.replace(/-/g, " ")}
                    </span>{" "}
                    on the{" "}
                    <span className="font-bold text-text-primary capitalize">
                      {item.taskflowSlug.replace(/-/g, " ")}
                    </span>{" "}
                    path.
                  </>
                ) : (
                  <>
                    submitted a project:{" "}
                    <Link href={`/showcase`} className="font-bold text-accent hover:underline">
                      {item.title}
                    </Link>
                  </>
                )}
              </p>
              <p className="text-[10px] text-text-secondary/50 font-bold mt-1 uppercase">
                {formatTimeAgo(item.time)}
              </p>
            </div>
          </div>
        );
      })}

      {/* Pagination Trigger */}
      {beforeTimeISO && (
        <div className="flex justify-center pt-4">
          <Button
            onClick={loadMore}
            disabled={loading}
            variant="outline"
            className="w-full font-bold py-2.5 rounded-xl border border-border hover:border-accent hover:text-accent flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 size={14} className="animate-spin text-accent" /> Loading...
              </>
            ) : (
              "Load More Activities"
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
