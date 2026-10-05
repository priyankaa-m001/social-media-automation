import { useDashboard } from "../../hooks/useDashboard";
import { PLATFORMS } from "../../lib/platforms";
import type { PlatformId } from "../../types";

export default function Accounts() {
    const { accounts, setAccounts } = useDashboard();

    // Connect if not connected, disconnect if connected (fake for now, no real OAuth)
    const toggle = (id: PlatformId) => setAccounts((a) => (a.includes(id) ? a.filter((x) => x !== id) : [...a, id]));

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-medium">Accounts</h1>
            <ul className="grid sm:grid-cols-2 gap-4">
                {PLATFORMS.map((p) => {
                    const on = accounts.includes(p.id);
                    return (
                        <li key={p.id} className="bg-white rounded-xl p-5 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className={`${p.color} size-10 rounded-full text-white grid place-items-center`}>{p.name[0]}</span>
                                <div>
                                    <p className="text-sm">{p.name}</p>
                                    <p className={`text-xs ${on ? "text-green-600" : "text-slate-400"}`}>{on ? "Connected" : "Not connected"}</p>
                                </div>
                            </div>
                            <button onClick={() => toggle(p.id)} className={`text-sm px-4 py-1.5 rounded-full ${on ? "border border-slate-300" : "bg-red-600 text-white"}`}>
                                {on ? "Disconnect" : "Connect"}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
