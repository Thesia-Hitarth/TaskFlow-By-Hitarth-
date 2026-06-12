import Link from "next/link";
import { Taskflow } from "@/lib/taskflows-data";
import { Badge } from "@/components/ui/badge";

interface TaskflowCardProps {
  taskflow: Taskflow;
}

export default function TaskflowCard({ taskflow }: TaskflowCardProps) {
  return (
    <Link href={`/${taskflow.slug}`} className="group block">
      <div className="bg-card border border-border rounded-lg p-4 transition-all duration-200 group-hover:border-accent group-hover:bg-[#222222] h-full flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-white font-medium text-base group-hover:text-amber-500 transition-colors">
              {taskflow.title}
            </h3>
            {taskflow.isNew && (
              <Badge className="bg-amber-500 hover:bg-amber-500 text-black text-xs font-semibold rounded-full px-2 py-0.5">
                New
              </Badge>
            )}
          </div>
          <p className="text-muted text-sm line-clamp-2 leading-relaxed">
            {taskflow.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
