import { Link, NavLink, Outlet } from "react-router-dom";
import { LayoutDashboardIcon, PenSquareIcon, CalendarClockIcon, UsersIcon, LogOutIcon } from "lucide-react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { seedPosts } from "../../lib/utils";
import type { DashboardContext, PlatformId, Post } from "../../types";

const links = [
    { to: "/dashboard", label: "Overview", icon: LayoutDashboardIcon, end: true },
    { to: "/dashboard/create", label: "Create Post", icon: PenSquareIcon },
    { to: "/dashboard/posts", label: "Posts", icon: CalendarClockIcon },
    { to: "/dashboard/accounts", label: "Accounts", icon: UsersIcon },
];

export default function DashboardLayout() {
    // State lives here (the parent) so all pages share the same data
    const [posts, setPosts] = useLocalStorage<Post[]>("sma-posts", seedPosts);
    const [accounts, setAccounts] = useLocalStorage<PlatformId[]>("sma-accounts", ["twitter", "linkedin"]);
    const context: DashboardContext = { posts, setPosts, accounts, setAccounts };

    return (
        <div className="min-h-screen bg-slate-100 md:flex">
            {/* Sidebar on desktop, horizontal bar on mobile */}
            <aside className="bg-white border-b md:border-b-0 md:border-r border-slate-200 md:w-60 md:min-h-screen p-4 flex md:flex-col gap-4">
                <Link to="/" className="hidden md:flex items-center gap-2 px-2 py-1">
                    <img src={`${import.meta.env.BASE_URL}logo.svg`} alt="Logo" className="size-7" />
                    <span className="text-xl font-serif font-medium">Scheduler</span>
                </Link>
                <nav className="flex md:flex-col gap-1 flex-1 overflow-x-auto">
                    {links.map(({ to, label, icon: Icon, end }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={end}
                            className={({ isActive }) =>
                                `flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm whitespace-nowrap ${isActive ? "bg-red-50 text-red-600" : "text-slate-600 hover:bg-slate-50"}`
                            }
                        >
                            <Icon className="size-4" /> {label}
                        </NavLink>
                    ))}
                </nav>
                <Link to="/" className="flex items-center gap-2.5 px-3 py-2 text-sm text-slate-500 hover:text-slate-800">
                    <LogOutIcon className="size-4" /> <span className="hidden md:inline">Sign out</span>
                </Link>
            </aside>

            {/* Outlet = where the current dashboard page is shown */}
            <main className="flex-1 p-4 sm:p-8 max-w-5xl">
                <Outlet context={context} />
            </main>
        </div>
    );
}
