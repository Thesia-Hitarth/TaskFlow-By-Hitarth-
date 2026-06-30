// components/compare/ComparisonPicker.tsx
"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { ComparisonTable } from "./ComparisonTable"
import { ThreeColumnTable } from "./ThreeColumnTable"
import { OverlapVennDiagram } from "./OverlapVennDiagram"
import { RoadmapPickerDropdown } from "./RoadmapPickerDropdown"
import { AlsoCompared } from "./AlsoCompared"
import { Plus } from "lucide-react"

export function ComparisonPicker({ initialA, initialB }: { initialA: string; initialB: string }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Read initial slots from URL if present, else use props
  const urlA = searchParams.get("a") || initialA
  const urlB = searchParams.get("b") || initialB
  const urlC = searchParams.get("c") || ""

  const [selectedIds, setSelectedIds] = useState<string[]>(
    urlC ? [urlA, urlB, urlC] : [urlA, urlB]
  )

  // Sync state if URL changes (e.g. forward/back buttons)
  useEffect(() => {
    const a = searchParams.get("a") || initialA
    const b = searchParams.get("b") || initialB
    const c = searchParams.get("c") || ""
    setSelectedIds(c ? [a, b, c] : [a, b])
  }, [searchParams, initialA, initialB])

  const updateUrl = (ids: string[]) => {
    const params = new URLSearchParams()
    if (ids[0]) params.set("a", ids[0])
    if (ids[1]) params.set("b", ids[1])
    if (ids[2]) params.set("c", ids[2])
    router.replace(`${pathname}?${params.toString()}`)
  }

  const addSlot = () => {
    if (selectedIds.length < 3) {
      const updated = [...selectedIds, ""]
      setSelectedIds(updated)
      updateUrl(updated)
    }
  }

  const updateSlot = (index: number, roadmapId: string) => {
    const updated = selectedIds.map((id, i) => (i === index ? roadmapId : id))
    setSelectedIds(updated)
    updateUrl(updated)
  }

  const removeSlot = (index: number) => {
    const updated = selectedIds.filter((_, i) => i !== index)
    setSelectedIds(updated)
    updateUrl(updated)
  }

  const validIds = selectedIds.filter(Boolean)

  return (
    <div>
      <div className="flex flex-wrap items-end gap-4 mb-8 bg-card border border-border p-6 rounded-2xl shadow-xs">
        {selectedIds.map((id, i) => (
          <RoadmapPickerDropdown
            key={i}
            value={id}
            label={`Path ${String.fromCharCode(65 + i)}`}
            onChange={(newId) => updateSlot(i, newId)}
            onRemove={selectedIds.length > 2 ? () => removeSlot(i) : undefined}
            excludeIds={selectedIds.filter((_, idx) => idx !== i)}
          />
        ))}

        {selectedIds.length < 3 && (
          <button
            onClick={addSlot}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-accent border border-dashed border-accent/40 rounded-xl hover:bg-accent/5 transition-colors cursor-pointer self-start sm:self-auto h-[38px] mb-0.5"
          >
            <Plus size={14} /> Add a third path
          </button>
        )}
      </div>

      {validIds.length === 2 && (
        <div className="space-y-8">
          <ComparisonTable roadmapIdA={validIds[0]} roadmapIdB={validIds[1]} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            <div className="md:col-span-2">
              <OverlapVennDiagram roadmapIdA={validIds[0]} roadmapIdB={validIds[1]} />
            </div>
            <div>
              <AlsoCompared roadmapId={validIds[0]} />
              <AlsoCompared roadmapId={validIds[1]} />
            </div>
          </div>
        </div>
      )}

      {validIds.length === 3 && (
        <div className="space-y-8">
          <ThreeColumnTable roadmapIds={validIds as [string, string, string]} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <OverlapVennDiagram roadmapIdA={validIds[0]} roadmapIdB={validIds[1]} />
            <OverlapVennDiagram roadmapIdA={validIds[0]} roadmapIdB={validIds[2]} />
            <OverlapVennDiagram roadmapIdA={validIds[1]} roadmapIdB={validIds[2]} />
          </div>
        </div>
      )}
    </div>
  )
}
