// components/compare/RoadmapPickerDropdown.tsx
"use client"

import { X } from "lucide-react"
import { getAllRoadmapIds, getRoadmap } from "@/lib/roadmaps"

interface Props {
  value: string
  onChange: (roadmapId: string) => void
  onRemove?: () => void
  excludeIds: string[]
  label?: string
}

export function RoadmapPickerDropdown({ value, onChange, onRemove, excludeIds, label }: Props) {
  const allIds = getAllRoadmapIds().filter(id => !excludeIds.includes(id) || id === value)

  return (
    <div className="flex flex-col gap-1.5 w-full sm:w-auto">
      {label && (
        <span className="text-[10px] font-extrabold text-text-secondary uppercase tracking-widest block">
          {label}
        </span>
      )}
      <div className="flex items-center gap-1.5 w-full">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full sm:min-w-[200px] px-3.5 py-2 text-sm font-semibold rounded-xl border border-border bg-card text-text-primary outline-none focus:border-accent cursor-pointer transition-colors"
        >
          <option value="" disabled>Choose a path...</option>
          {allIds.map(id => (
            <option key={id} value={id}>{getRoadmap(id)?.title}</option>
          ))}
        </select>
        {onRemove && (
          <button onClick={onRemove} aria-label="Remove column" className="p-1.5 rounded-lg border border-transparent hover:border-border bg-transparent hover:bg-surface text-text-secondary cursor-pointer transition-colors shrink-0">
            <X size={15} />
          </button>
        )}
      </div>
    </div>
  )
}
