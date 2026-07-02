import Image from "next/image";

interface UserItem {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  createdAt: Date;
}

export function RecentSignupsTable({ users }: { users: UserItem[] }) {
  if (users.length === 0) {
    return <p className="text-sm text-text-secondary py-4 text-center">No signups found.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-xs text-text-secondary border-b border-border/80 uppercase font-bold tracking-wider">
            <th className="text-left pb-3 font-semibold">User</th>
            <th className="text-left pb-3 font-semibold">Email</th>
            <th className="text-right pb-3 font-semibold">Joined At</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/60">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-surface/30">
              <td className="py-3 font-semibold text-text-primary flex items-center gap-2">
                {user.image && (
                  <Image
                    src={user.image}
                    alt={user.name || "avatar"}
                    width={24}
                    height={24}
                    unoptimized={true}
                    className="w-6 h-6 rounded-full border border-border"
                  />
                )}
                <span>{user.name ?? "Anonymous Learner"}</span>
              </td>
              <td className="py-3 text-text-secondary text-xs">{user.email ?? "—"}</td>
              <td className="py-3 text-right text-xs text-text-secondary font-mono">
                {new Date(user.createdAt).toLocaleString("en-IN", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
