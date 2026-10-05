import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDashboard } from "../../hooks/useDashboard";
import { PLATFORMS } from "../../lib/platforms";
import { toLocalInput } from "../../lib/utils";
import type { PlatformId } from "../../types";

export default function CreatePost() {
    const { accounts, setPosts } = useDashboard();
    const navigate = useNavigate();
    const [content, setContent] = useState("");
    const [selected, setSelected] = useState<PlatformId[]>([]);
    const [when, setWhen] = useState("");
    const [error, setError] = useState("");

    // The shortest limit among chosen platforms applies (e.g. X allows only 280)
    const limit = selected.length ? Math.min(...PLATFORMS.filter((p) => selected.includes(p.id)).map((p) => p.limit)) : 3000;
    const connected = PLATFORMS.filter((p) => accounts.includes(p.id));

    const toggle = (id: PlatformId) => setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

    const save = (publishNow: boolean) => {
        if (!content.trim()) return setError("Write something first.");
        if (selected.length === 0) return setError("Choose at least one platform.");
        if (content.length > limit) return setError(`Your post is over the ${limit} character limit.`);
        if (!publishNow && !when) return setError("Pick a date and time, or use Post now.");

        setPosts((posts) => [
            { id: crypto.randomUUID(), content: content.trim(), platforms: selected, scheduledAt: publishNow ? toLocalInput() : when, status: publishNow ? "published" : "scheduled" },
            ...posts,
        ]);
        navigate("/dashboard/posts");
    };

    if (connected.length === 0) {
        return (
            <div className="bg-white rounded-xl p-6 text-sm">
                Connect an account first. <Link to="/dashboard/accounts" className="text-red-600">Go to Accounts</Link>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-medium">Create post</h1>
            <div className="grid lg:grid-cols-2 gap-6">
                <form
                    onSubmit={(e) => { e.preventDefault(); save(false); }} // preventDefault: no page reload
                    className="bg-white rounded-xl p-5 space-y-5 text-sm"
                >
                    <div>
                        <label className="block mb-1.5">Content</label>
                        <textarea
                            value={content}
                            onChange={(e) => { setContent(e.target.value); setError(""); }}
                            rows={6}
                            placeholder="What do you want to share?"
                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-slate-300"
                        />
                        <p className={`text-xs mt-1 text-right ${content.length > limit ? "text-red-600" : "text-slate-400"}`}>{content.length} / {limit}</p>
                    </div>

                    <div>
                        <p className="mb-1.5">Platforms</p>
                        <div className="flex gap-2 flex-wrap">
                            {connected.map((p) => (
                                <button
                                    type="button"
                                    key={p.id}
                                    onClick={() => toggle(p.id)}
                                    className={`px-3 py-1.5 rounded-full border ${selected.includes(p.id) ? "bg-red-50 border-red-300 text-red-600" : "border-slate-200 text-slate-600"}`}
                                >
                                    {p.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block mb-1.5">Schedule for</label>
                        <input type="datetime-local" value={when} min={toLocalInput()} onChange={(e) => setWhen(e.target.value)} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl" />
                    </div>

                    {error && <p className="text-red-600">{error}</p>}

                    <div className="flex gap-3">
                        <button type="submit" className="px-5 py-2.5 bg-linear-to-r from-red-600 to-red-500 text-white rounded-full">Schedule</button>
                        <button type="button" onClick={() => save(true)} className="px-5 py-2.5 border border-slate-300 rounded-full">Post now</button>
                    </div>
                </form>

                {/* Live preview so the user sees the post before saving */}
                <div className="bg-white rounded-xl p-5 h-fit">
                    <h2 className="font-medium mb-3 text-sm">Preview</h2>
                    <p className="whitespace-pre-wrap text-sm min-h-16 text-slate-700">{content || "Your post will appear here."}</p>
                </div>
            </div>
        </div>
    );
}
