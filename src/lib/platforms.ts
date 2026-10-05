import type { PlatformId } from "../types";

// One place for platform info so every page shows the same names, colors and limits
export const PLATFORMS: { id: PlatformId; name: string; color: string; limit: number }[] = [
    { id: "twitter", name: "Twitter / X", color: "bg-black", limit: 280 },
    { id: "linkedin", name: "LinkedIn", color: "bg-blue-700", limit: 3000 },
    { id: "facebook", name: "Facebook", color: "bg-blue-500", limit: 63000 },
    { id: "instagram", name: "Instagram", color: "bg-pink-500", limit: 2200 },
];
