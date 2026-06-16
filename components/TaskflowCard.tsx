import Link from "next/link";
import { Taskflow } from "@/lib/taskflows-data";

interface TaskflowCardProps {
  taskflow: Taskflow;
}

export default function TaskflowCard({ taskflow }: TaskflowCardProps) {
  return (
    <Link href={`/${taskflow.slug}`} className="group block h-full">
      <div className="bg-card border border-border rounded-xl p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-500/10 hover:border-amber-500/50 h-full flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2.5">
            <h3 className="text-text-primary font-bold text-base group-hover:text-accent transition-colors">
              {taskflow.title}
            </h3>
            {taskflow.isNew && (
              <span className="ml-2 text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-500 border border-amber-500/30 rounded-full px-2 py-0.5">
                New
              </span>
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

