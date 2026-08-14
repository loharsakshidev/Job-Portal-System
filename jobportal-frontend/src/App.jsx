import {BrowserRouter, Routes, Route, useLocation} from "react-router-dom";

import { useEffect } from "react";


import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Jobs from "./pages/Jobs";
import ApplyJob from "./pages/ApplyJob";
import AppliedJobs from "./pages/AppliedJobs";
import Dashboard from "./pages/Dashboard";
import RecruiterLogin from "./pages/RecruiterLogin";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import PostJob from "./pages/PostJob";
import ManageJobs from "./pages/ManageJobs";
import EditJob from "./pages/EditJob";
import ViewApplicants from "./pages/ViewApplicants";
import JobDetails from "./pages/JobDetails";
import Profile from "./pages/Profile";
import RecruiterProfile from "./pages/RecruiterProfile";
import ForgotPassword from "./pages/ForgotPassword";
import SavedJobs from "./pages/SavedJobs";
import Notifications from "./pages/Notifications";
import BackToTop from "./components/BackToTop";

function Layout() {

    const location = useLocation();

    // Hide footer on login pages
    const hideFooter =
        location.pathname === "/login" ||
        location.pathname === "/register" ||
        location.pathname === "/recruiter-login" ||
        location.pathname === "/notifications" ||
        location.pathname === "/saved-jobs" ||
        location.pathname === "/profile" ||
        location.pathname === "/recruiter-profile" ||
        location.pathname === "/manage-jobs" ||
        location.pathname === "/view-applicants";

        
    return (
        <>

            <Navbar />

            <Routes>

                {/* Candidate */}

                <Route path="/" element={<Home />} />

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route path="/jobs" element={<Jobs />} />

                <Route path="/jobs/:id" element={<JobDetails />} />

                <Route path="/apply" element={<ApplyJob />} />

                <Route
                    path="/applied-jobs"
                    element={<AppliedJobs />}
                />

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                <Route
                    path="/profile"
                    element={<Profile />}
                />

                {/* Recruiter */}

                <Route
                    path="/recruiter-login"
                    element={<RecruiterLogin />}
                />

                <Route
                    path="/recruiter-dashboard"
                    element={<RecruiterDashboard />}
                />

                <Route
                    path="/recruiter-profile"
                    element={<RecruiterProfile />}
                />

                <Route
                    path="/post-job"
                    element={<PostJob />}
                />

                <Route
                    path="/manage-jobs"
                    element={<ManageJobs />}
                />

                <Route
                    path="/edit-job/:id"
                    element={<EditJob />}
                />

                <Route
                    path="/view-applicants"
                    element={<ViewApplicants />}
                />

                <Route
    path="/forgot-password"
    element={<ForgotPassword />}
/>

<Route
    path="/saved-jobs"
    element={<SavedJobs />}
/>

<Route
    path="/notifications"
    element={<Notifications />}
/>



            </Routes>

            <BackToTop />

            {!hideFooter && <Footer />}

        </>


    );

}

function App() {

    useEffect(() => {

        const theme = localStorage.getItem("theme");

        if (theme === "dark") {

            document.body.classList.add("dark-mode");

        } else {

            document.body.classList.remove("dark-mode");

        }

    }, []);

    return (

        <BrowserRouter>

            <Layout />

        </BrowserRouter>

    );

}

export default App;