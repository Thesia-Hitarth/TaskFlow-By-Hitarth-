"use client";

import { useEffect, useState } from "react";
import { getRoadmapDynamicData } from "@/lib/actions/roadmap";
import { UserAvatar } from "@/components/ui/UserAvatar";
import Link from "next/link";
import { WelcomeTour } from "@/components/onboarding/WelcomeTour";

interface RoadmapDynamicIslandProps {
  slug: string;
}

export function RoadmapDynamicIsland({ slug }: RoadmapDynamicIslandProps) {
  const [data, setData] = useState<{
    hasSeenTour: boolean;
    learnerCount: number;
    recentLearners: Array<{ image: string; name: string; username: string }>;
  } | null>(null);

  useEffect(() => {
    getRoadmapDynamicData(slug).then((res) => {
      if (res.success) {
        setData({
          hasSeenTour: res.hasSeenTour,
          learnerCount: res.learnerCount,
          recentLearners: res.recentLearners,
        });
      }
    });
  }, [slug]);

  if (!data) {
    // Return empty placeholder block to match UI dimensions and prevent layout shifts
    return <div className="h-7 mt-4"></div>;
  }

  const { hasSeenTour, learnerCount, recentLearners } = data;

  return (
    <>
      {learnerCount > 0 ? (
        <div className="flex flex-wrap items-center gap-3 mt-4 animate-fade-in">
          {recentLearners.length > 0 && (
            <div className="flex -space-x-2.5">
              {recentLearners.map((l, i) => (
                <UserAvatar
                  key={i}
                  src={l.image}
                  name={l.name}
                  username={l.username}
                  className="w-7 h-7 ring-2 ring-background"
                  size={28}
                />
              ))}
            </div>
          )}
          <p className="text-xs font-bold text-text-secondary/70">
            <span className="text-accent">{learnerCount.toLocaleString()}</span> learner{learnerCount > 1 ? "s" : ""} on this path
          </p>
          
          <span className="text-text-secondary/30 text-xs">•</span>
          
          <Link
            href={`/${slug}/buddies`}
            className="text-xs font-bold text-accent hover:underline flex items-center gap-1"
          >
            Find study buddies &rarr;
          </Link>
        </div>
      ) : (
        <div className="flex items-center mt-4">
          <Link
            href={`/${slug}/buddies`}
            className="text-xs font-bold text-accent hover:underline flex items-center gap-1"
          >
            Find study buddies &rarr;
          </Link>
        </div>
      )}
      <WelcomeTour hasSeenTour={hasSeenTour} />
    </>
  );
}
