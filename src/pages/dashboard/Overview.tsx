import { Link } from "react-router-dom";
import { useDashboard } from "../../hooks/useDashboard";
import { PLATFORMS } from "../../lib/platforms";
import { formatDate } from "../../lib/utils";
import PlatformBadge from "../../components/dashboard/PlatformBadge";

export default function Overview() {
    const { posts, accounts } = useDashboard();
    const scheduled = posts.filter((p) => p.status === "scheduled");
    const upcoming = [...scheduled].sort((a, b) => a.scheduledAt.localeCompare(b.scheduledAt)).slice(0, 5);

    const stats = [
        { label: "Total posts", value: posts.length },
        { label: "Scheduled", value: scheduled.length },
        { label: "Published", value: posts.length - scheduled.length },
        { label: "Connected accounts", value: accounts.length },
    ];

    // Count of posts per platform for the simple bar chart
    const perPlatform = PLATFORMS.map((p) => ({ ...p, count: posts.filter((post) => post.platforms.includes(p.id)).length }));
    const max = Math.max(1, ...perPlatform.map((p) => p.count));

    return (
        <div className="space-y-8">
            <h1 className="text-2xl font-medium">Overview</h1>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((s) => (
                    <div key={s.label} className="bg-white rounded-xl p-5">
                        <p className="text-sm text-slate-500">{s.label}</p>
                        <p className="text-3xl mt-1">{s.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                <section className="bg-white rounded-xl p-5">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="font-medium">Upcoming posts</h2>
                        <Link to="/dashboard/create" className="text-sm text-red-600">+ New post</Link>
                    </div>
                    {upcoming.length === 0 && <p className="text-sm text-slate-500">Nothing scheduled yet.</p>}
                    <ul className="space-y-4">
                        {upcoming.map((p) => (
                            <li key={p.id} className="text-sm">
                                <p className="line-clamp-2">{p.content}</p>
                                <p className="text-slate-500 text-xs my-1.5">{formatDate(p.scheduledAt)}</p>
                                <div className="flex gap-1.5 flex-wrap">{p.platforms.map((id) => <PlatformBadge key={id} id={id} />)}</div>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="bg-white rounded-xl p-5">
                    <h2 className="font-medium mb-4">Posts per platform</h2>
                    <div className="space-y-3">
                        {perPlatform.map((p) => (
                            <div key={p.id} className="text-sm">
                                <div className="flex justify-between mb-1"><span>{p.name}</span><span className="text-slate-500">{p.count}</span></div>
                                <div className="h-2 bg-slate-100 rounded-full">
                                    <div className={`${p.color} h-2 rounded-full`} style={{ width: `${(p.count / max) * 100}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
