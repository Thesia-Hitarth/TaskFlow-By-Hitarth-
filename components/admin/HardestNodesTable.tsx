interface HardestNodeItem {
  roadmapId: string;
  nodeId: string;
  stuckCount: number;
}

export function HardestNodesTable({ data }: { data: HardestNodeItem[] }) {
  if (data.length === 0) {
    return <p className="text-sm text-text-secondary py-4 text-center">No stuck users recorded.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-xs text-text-secondary border-b border-border/80 uppercase font-bold tracking-wider">
            <th className="text-left pb-3 font-semibold">Node Name</th>
            <th className="text-left pb-3 font-semibold">Roadmap ID</th>
            <th className="text-right pb-3 font-semibold">Stuck Users (In Progress)</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/60">
          {data.map((row) => (
            <tr key={`${row.roadmapId}-${row.nodeId}`} className="hover:bg-surface/30">
              <td className="py-3 font-medium capitalize text-text-primary">
                {row.nodeId.replace(/-/g, " ")}
              </td>
              <td className="py-3 text-text-secondary capitalize">{row.roadmapId}</td>
              <td className="py-3 text-right font-mono font-bold text-rose-500">{row.stuckCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
