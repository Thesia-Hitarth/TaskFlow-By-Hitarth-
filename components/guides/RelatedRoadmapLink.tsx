import Link from "next/link";
import { Map } from "lucide-react";
import { taskflows } from "@/lib/taskflows-data";

interface RelatedRoadmapLinkProps {
  roadmapIds: string[];
  nodeIds?: string[];
}

export default function RelatedRoadmapLink({
  roadmapIds,
  nodeIds,
}: RelatedRoadmapLinkProps) {
  return (
    <div className="flex flex-wrap gap-2 my-4">
      {roadmapIds.map((id) => {
        const tf = taskflows.find((t) => t.slug === id);
        if (!tf) return null;
        
        // Deep link to first node if provided
        const href = nodeIds?.[0] ? `/${id}?node=${nodeIds[0]}` : `/${id}`;

        return (
          <Link
            key={id}
            href={href}
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent hover:bg-accent/15 transition-colors cursor-pointer"
          >
            <Map className="h-3.5 w-3.5" />
            <span>Part of the {tf.title} Taskflow</span>
          </Link>
        );
      })}
    </div>
  );
}
