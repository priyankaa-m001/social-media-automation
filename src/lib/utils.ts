import type { Post } from "../types";

const pad = (n: number) => String(n).padStart(2, "0");

// Date -> "YYYY-MM-DDTHH:mm" in the user's local time (what datetime-local inputs expect)
export function toLocalInput(d = new Date()) {
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function formatDate(value: string) {
    return new Date(value).toLocaleString([], { dateStyle: "medium", timeStyle: "short" });
}

// Starter posts so the dashboard isn't empty on the first visit
function inDays(days: number, hour: number) {
    const d = new Date();
    d.setDate(d.getDate() + days);
    d.setHours(hour, 0, 0, 0);
    return toLocalInput(d);
}

export const seedPosts: Post[] = [
    { id: "seed-1", content: "Excited to share our new product launch this week! 🚀", platforms: ["twitter", "linkedin"], scheduledAt: inDays(1, 10), status: "scheduled" },
    { id: "seed-2", content: "5 tips to grow your audience without burning out.", platforms: ["linkedin"], scheduledAt: inDays(3, 9), status: "scheduled" },
    { id: "seed-3", content: "Behind the scenes at the studio today 📸", platforms: ["instagram", "facebook"], scheduledAt: inDays(-1, 18), status: "published" },
];
