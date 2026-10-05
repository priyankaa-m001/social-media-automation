import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MailIcon, LockIcon, ArrowRightIcon, User2Icon } from "lucide-react";

// Small reusable input so we don't repeat the same markup 3 times (name, email, password)
function Field({ label, icon: Icon, ...props }: { label: string; icon: React.ElementType } & React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <div>
            <label className="block mb-1.5">{label}</label>
            <div className="relative">
                <Icon className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input required className="w-full pl-10 pr-4 py-2.5 bg-slate-50 outline-slate-300 border border-slate-200 rounded-full" {...props} />
            </div>
        </div>
    );
}

export default function Login() {
    // true = Sign In form, false = Sign Up form (Sign Up also asks for a name)
    const [isSignIn, setIsSignIn] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // No backend yet, so we fake a 1 second request, then move to the dashboard page
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // stop the browser from reloading the page
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigate("/dashboard");
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-8">
                <div className="flex flex-col items-center mb-8">
                    <Link to="/" className="flex items-center gap-2">
                        <img src={`${import.meta.env.BASE_URL}logo.svg`} alt="Logo" className="size-6.5" />
                        <h1 className="text-2xl">Scheduler</h1>
                    </Link>
                    <p className="text-slate-500 text-sm mt-1">Sign in to your Dashboard</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 text-sm">
                    {!isSignIn && <Field label="Name" icon={User2Icon} type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />}
                    <Field label="Email" icon={MailIcon} type="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Field label="Password" icon={LockIcon} type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} />

                    <button type="submit" disabled={loading} className="w-full py-2.5 px-4 bg-linear-to-r from-red-600 to-red-500 text-white rounded-full text-sm transition-all disabled:opacity-60 flex items-center justify-center gap-2">
                        {loading ? "Signing in..." : <>{isSignIn ? "Sign In" : "Sign Up"} <ArrowRightIcon className="size-4" /></>}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-slate-500">
                    {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
                    <button onClick={() => setIsSignIn(!isSignIn)} className="text-red-600 hover:text-red-700">
                        {isSignIn ? "Create one free" : "Sign In"}
                    </button>
                </p>
            </div>
        </div>
    );
}
