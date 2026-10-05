import { PLATFORMS } from "../../lib/platforms";
import type { PlatformId } from "../../types";

// Small colored pill used in lists and previews
export default function PlatformBadge({ id }: { id: PlatformId }) {
    const p = PLATFORMS.find((x) => x.id === id)!;
    return <span className={`${p.color} text-white text-[11px] px-2.5 py-1 rounded-full`}>{p.name}</span>;
}
