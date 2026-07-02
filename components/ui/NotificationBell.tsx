"use client";

import { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import * as Popover from "@radix-ui/react-popover";
import { getUnreadNotifications, markAllRead } from "@/lib/actions/notifications";
import Link from "next/link";

interface Notification {
  id: string;
  title: string;
  message: string;
  linkUrl?: string | null;
  isRead: boolean;
  createdAt: Date;
  type: string;
}

const TYPE_EMOJI: Record<string, string> = {
  badge_earned: "🏆",
  streak_milestone: "🔥",
  new_guide: "📖",
  welcome: "👋",
  roadmap_complete: "🎉",
};

export function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Initial fetch
    getUnreadNotifications().then((data) => {
      // Safely map dates
      const formatted = data.map((n) => ({
        ...n,
        createdAt: new Date(n.createdAt),
      }));
      setNotifications(formatted);
    });
  }, []);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleOpen = async (open: boolean) => {
    setIsOpen(open);
    if (open && unreadCount > 0) {
      await markAllRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    }
  };

  return (
    <Popover.Root open={isOpen} onOpenChange={handleOpen}>
      <Popover.Trigger asChild>
        <button
          aria-label={`Notifications${unreadCount > 0 ? ` — ${unreadCount} unread` : ""}`}
          className="relative p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <Bell size={18} className="text-text-secondary hover:text-text-primary" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 flex items-center justify-center rounded-full bg-accent text-black text-[9px] font-bold">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          align="end"
          sideOffset={8}
          className="w-80 rounded-2xl border border-border bg-card shadow-xl z-50 focus:outline-none max-h-96 flex flex-col"
        >
          <div className="px-4 py-3 border-b border-border flex items-center justify-between">
            <h3 className="text-sm font-bold text-text-primary">Notifications</h3>
            {unreadCount > 0 && (
              <span className="text-xs text-text-secondary">{unreadCount} new</span>
            )}
          </div>

          <div className="overflow-y-auto divide-y divide-border flex-1">
            {notifications.length === 0 ? (
              <div className="px-4 py-8 text-center text-sm text-text-secondary">
                No notifications yet
              </div>
            ) : (
              notifications.map((n) => {
                const content = (
                  <div className="flex items-start gap-3 px-4 py-3 hover:bg-surface/50 transition-colors w-full text-left">
                    <span className="text-lg shrink-0 mt-0.5">{TYPE_EMOJI[n.type] ?? "🔔"}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-text-primary leading-snug">
                        {n.title}
                      </p>
                      <p className="text-xs text-text-secondary mt-0.5 leading-snug">
                        {n.message}
                      </p>
                      <p className="text-[10px] text-text-muted mt-1">
                        {formatRelativeTime(n.createdAt)}
                      </p>
                    </div>
                    {!n.isRead && (
                      <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-2" />
                    )}
                  </div>
                );

                return n.linkUrl ? (
                  <Link key={n.id} href={n.linkUrl} className="block w-full">
                    {content}
                  </Link>
                ) : (
                  <div key={n.id} className="block w-full">
                    {content}
                  </div>
                );
              })
            )}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

function formatRelativeTime(date: Date): string {
  const diff = Date.now() - date.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}
