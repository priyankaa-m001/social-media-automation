import { useEffect, useState } from "react";

// Works like useState, but saves to the browser so data survives a refresh.
// We use it because the project has no backend yet.
export function useLocalStorage<T>(key: string, initial: T) {
    const [value, setValue] = useState<T>(() => {
        try {
            const saved = localStorage.getItem(key);
            return saved ? (JSON.parse(saved) as T) : initial;
        } catch {
            return initial; // storage blocked or data corrupted
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch {
            // ignore: the app still works, it just won't be saved
        }
    }, [key, value]);

    return [value, setValue] as const;
}
