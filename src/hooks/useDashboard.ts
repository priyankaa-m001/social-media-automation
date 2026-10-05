import { useOutletContext } from "react-router-dom";
import type { DashboardContext } from "../types";

// Lets any dashboard page read posts/accounts without passing props around
export const useDashboard = () => useOutletContext<DashboardContext>();
