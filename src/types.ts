import type { Dispatch, SetStateAction } from "react";

export type PlatformId = "twitter" | "linkedin" | "facebook" | "instagram";

export interface Post {
    id: string;
    content: string;
    platforms: PlatformId[];
    scheduledAt: string; // "YYYY-MM-DDTHH:mm", the format <input type="datetime-local"> uses
    status: "scheduled" | "published";
}

// Data shared by all dashboard pages (the layout owns it, pages read it)
export interface DashboardContext {
    posts: Post[];
    setPosts: Dispatch<SetStateAction<Post[]>>;
    accounts: PlatformId[]; // connected platforms
    setAccounts: Dispatch<SetStateAction<PlatformId[]>>;
}
