import Link from "next/link";
import { Taskflow } from "@/lib/taskflows-data";

interface TaskflowCardProps {
  taskflow: Taskflow;
}

export default function TaskflowCard({ taskflow }: TaskflowCardProps) {
  return (
    <Link href={`/${taskflow.slug}`} className="group block h-full">
      <div className="bg-card border border-border rounded-xl p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-500/10 hover:border-amber-500/50 h-full flex flex-col justify-between w-full">
        <div className="w-full">
          <div className="flex items-center justify-between gap-2 mb-2.5 w-full">
            <div className="flex items-center gap-2">
              <h3 className="text-text-primary font-bold text-base group-hover:text-accent transition-colors">
                {taskflow.title}
              </h3>
              {taskflow.isNew && (
                <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-700 dark:text-amber-500 border border-amber-500/30 rounded-full px-2 py-0.5">
                  New
                </span>
              )}
            </div>
            {taskflow.difficulty && (
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full border shrink-0 ${
                taskflow.difficulty === "Beginner"
                  ? "border-green-500/40 text-green-700 dark:text-green-400 bg-green-500/10"
                  : taskflow.difficulty === "Intermediate"
                  ? "border-yellow-500/40 text-amber-700 dark:text-yellow-400 bg-yellow-500/10"
                  : "border-red-500/40 text-red-700 dark:text-red-400 bg-red-500/10"
              }`}>
                {taskflow.difficulty}
              </span>
            )}
          </div>
          <p className="text-text-secondary text-sm line-clamp-2 leading-relaxed font-medium">
            {taskflow.description}
          </p>
          {taskflow.estimatedTime && (
            <p className="text-xs text-[#737373] mt-2">⏱ {taskflow.estimatedTime}</p>
          )}
        </div>
      </div>
    </Link>
  );
}

