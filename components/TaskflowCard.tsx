import Link from "next/link";
import { Taskflow } from "@/lib/taskflows-data";
import { Badge } from "@/components/ui/badge";

interface TaskflowCardProps {
  taskflow: Taskflow;
}

export default function TaskflowCard({ taskflow }: TaskflowCardProps) {
  return (
    <Link href={`/${taskflow.slug}`} className="group block h-full">
      <div className="bg-card border border-border rounded-xl p-5 transition-all duration-200 group-hover:border-accent group-hover:bg-surface/50 group-hover:shadow-sm h-full flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2.5">
            <h3 className="text-text-primary font-bold text-base group-hover:text-accent transition-colors">
              {taskflow.title}
            </h3>
            {taskflow.isNew && (
              <Badge className="bg-amber-500 hover:bg-amber-500 text-black text-[10px] font-bold uppercase tracking-wider rounded-full px-2 py-0.5">
                New
              </Badge>
            )}
          </div>
          <p className="text-text-secondary text-sm line-clamp-2 leading-relaxed font-medium">
            {taskflow.description}
          </p>
        </div>
      </div>
    </Link>
  );
}

