import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import Overview from "./pages/dashboard/Overview";
import CreatePost from "./pages/dashboard/CreatePost";
import Posts from "./pages/dashboard/Posts";
import Accounts from "./pages/dashboard/Accounts";

// Each <Route> maps a URL to a page component.
// The dashboard routes are nested: DashboardLayout (sidebar) stays, only the inner page changes.
export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<Overview />} />
                <Route path="create" element={<CreatePost />} />
                <Route path="posts" element={<Posts />} />
                <Route path="accounts" element={<Accounts />} />
            </Route>
        </Routes>
    );
}
