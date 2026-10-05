import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckIcon, Trash2Icon } from "lucide-react";
import { useDashboard } from "../../hooks/useDashboard";
import { formatDate } from "../../lib/utils";
import PlatformBadge from "../../components/dashboard/PlatformBadge";

const tabs = ["all", "scheduled", "published"] as const;

export default function Posts() {
    const { posts, setPosts } = useDashboard();
    const [tab, setTab] = useState<(typeof tabs)[number]>("all");

    const visible = posts
        .filter((p) => tab === "all" || p.status === tab)
        .sort((a, b) => a.scheduledAt.localeCompare(b.scheduledAt));

    const publish = (id: string) => setPosts((all) => all.map((p) => (p.id === id ? { ...p, status: "published" } : p)));
    const remove = (id: string) => setPosts((all) => all.filter((p) => p.id !== id));

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-medium">Posts</h1>
                <Link to="/dashboard/create" className="text-sm text-red-600">+ New post</Link>
            </div>

            <div className="flex gap-2 text-sm">
                {tabs.map((t) => (
                    <button key={t} onClick={() => setTab(t)} className={`px-4 py-1.5 rounded-full capitalize ${tab === t ? "bg-slate-900 text-white" : "bg-white text-slate-600"}`}>
                        {t}
                    </button>
                ))}
            </div>

            {visible.length === 0 && <p className="text-sm text-slate-500">No posts here yet.</p>}

            <ul className="space-y-3">
                {visible.map((p) => (
                    <li key={p.id} className="bg-white rounded-xl p-5 flex gap-4 justify-between text-sm">
                        <div className="space-y-2 min-w-0">
                            <p className="whitespace-pre-wrap break-words">{p.content}</p>
                            <p className="text-xs text-slate-500">
                                {p.status === "published" ? "Published" : "Scheduled"} · {formatDate(p.scheduledAt)}
                            </p>
                            <div className="flex gap-1.5 flex-wrap">{p.platforms.map((id) => <PlatformBadge key={id} id={id} />)}</div>
                        </div>
                        <div className="flex gap-1 shrink-0 h-fit">
                            {p.status === "scheduled" && (
                                <button onClick={() => publish(p.id)} title="Mark as published" className="p-2 rounded-lg hover:bg-slate-100 text-green-600">
                                    <CheckIcon className="size-4" />
                                </button>
                            )}
                            <button onClick={() => remove(p.id)} title="Delete post" className="p-2 rounded-lg hover:bg-slate-100 text-red-600">
                                <Trash2Icon className="size-4" />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
