import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { getProfilePicture, getNotifications } from "../services/ApiService";
import { FaBriefcase, FaHome, FaBell, FaFileAlt, FaHeart } from "react-icons/fa";
import { FaTachometerAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
import { FaBuilding } from "react-icons/fa";
import "./Navbar.css";


function Navbar() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));
    const recruiter = JSON.parse(localStorage.getItem("recruiter"));

    const [notificationCount, setNotificationCount] = useState(0);

const loadNotifications = async () => {

    if (!user) return;

    try {

        const response = await getNotifications(user.id);

        const unreadNotifications = response.data.filter(
            notification => notification.read === false
        );

        setNotificationCount(unreadNotifications.length);

    }
    catch (error) {

        console.log(error);

    }

};

useEffect(() => {

    if (!user) return;

    loadNotifications();

    const interval = setInterval(() => {

        loadNotifications();

    }, 3000);

    return () => clearInterval(interval);

}, []);
    /* ===========================
       DARK MODE
    =========================== */

    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("theme") === "dark"
    );

    useEffect(() => {

        if (darkMode) {

            document.body.classList.add("dark-mode");
            localStorage.setItem("theme", "dark");

        } else {

            document.body.classList.remove("dark-mode");
            localStorage.setItem("theme", "light");

        }

    }, [darkMode]);

    const toggleTheme = () => {

        setDarkMode(!darkMode);

    };

    /* ===========================
       LOGOUT
    =========================== */

    const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("recruiter");

    toast.success("Logged out successfully");

    setTimeout(() => {
        navigate("/login", { replace: true });
    }, 300);
};

    return (

        <nav
            className="navbar navbar-expand-lg shadow navbar-custom sticky-top"
            style={{
                background:
                    darkMode
                        ? "#0F172A"
                        : "linear-gradient(90deg,#2563EB,#1D4ED8)"
            }}
        >

            <div className="container">

                <Link
                    className="navbar-brand fw-bold text-white"
                    to="/"
                >
                    Job<span className="text-warning">Sphere</span>
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbar"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="navbar"
                >

{/* Candidate Navbar */}

{user && (

    <ul className="navbar-nav ms-auto align-items-center">

        <li className="nav-item">

            <NavLink
                to="/"
                className={({ isActive }) =>
                    isActive
                        ? "nav-link text-white active-nav"
                        : "nav-link text-white"
                }
            >

                <FaHome
                    className="me-2"
                    style={{
                        fontSize: "22px",
                        marginTop: "-3px"
                    }}
                />

                Home

            </NavLink>

        </li>

        <li className="nav-item">

            <NavLink
                to="/jobs"
                className={({ isActive }) =>
                    isActive
                        ? "nav-link text-white active-nav"
                        : "nav-link text-white"
                }
            >

                <FaBriefcase className="me-2" />

                Jobs

            </NavLink>

        </li>

        <li className="nav-item">

            <NavLink
                to="/applied-jobs"
                className={({ isActive }) =>
                    isActive
                        ? "nav-link text-white active-nav"
                        : "nav-link text-white"
                }
            >

                <FaFileAlt className="me-2" />

                Applied Jobs

            </NavLink>

        </li>

        <li className="nav-item">

            <NavLink
                to="/saved-jobs"
                className={({ isActive }) =>
                    isActive
                        ? "nav-link text-white active-nav"
                        : "nav-link text-white"
                }
            >

                <FaHeart className="me-2 text-danger" />

                Saved Jobs

            </NavLink>

        </li>

        <li className="nav-item">

            <NavLink
                to="/notifications"
                title="Notifications"
                className={({ isActive }) =>
                    isActive
                        ? "nav-link text-white position-relative active-nav"
                        : "nav-link text-white position-relative"
                }
            >

                <FaBell size={20} />

                {

                    notificationCount > 0 &&

                    <span
                        className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                        style={{
                            fontSize: "10px"
                        }}
                    >

                        {notificationCount}

                    </span>

                }

            </NavLink>

        </li>

        <li className="nav-item ms-3">

            <button
                className="btn btn-outline-light rounded-circle d-flex align-items-center justify-content-center"
                onClick={toggleTheme}
                title={darkMode ? "Light Mode" : "Dark Mode"}
                style={{
                    width: "42px",
                    height: "42px"
                }}
            >

                {darkMode ? "☀" : "🌙"}

            </button>

        </li>

        <li className="nav-item dropdown ms-3">

            <a
                href="#"
                className="nav-link dropdown-toggle fw-semibold text-white d-flex align-items-center"
                role="button"
                data-bs-toggle="dropdown"
            >

                {

                    user.profilePicture ?

                        <img
                            src={getProfilePicture(user.profilePicture)}
                            alt="Profile"
                            className="rounded-circle me-2"
                            style={{
                                width: "38px",
                                height: "38px",
                                objectFit: "cover",
                                border: "2px solid white"
                            }}
                        />

                        :

                        <div
                            className="rounded-circle bg-white text-primary d-flex align-items-center justify-content-center me-2"
                            style={{
                                width: "38px",
                                height: "38px",
                                fontWeight: "bold"
                            }}
                        >

                            {user.name.charAt(0).toUpperCase()}

                        </div>

                }

                <span className="text-white fw-semibold ms-1">

                    {user.name.split(" ")[0]}

                </span>

            </a>

            <ul className="dropdown-menu dropdown-menu-end">

                <li>

                    <Link
                        className="dropdown-item"
                        to="/profile"
                    >

                        My Profile

                    </Link>

                </li>

                <li>

                    <hr className="dropdown-divider" />

                </li>

                <li>

                    <button
                        className="dropdown-item text-danger"
                        onClick={handleLogout}
                    >

                        Logout

                    </button>

                </li>

            </ul>

        </li>

    </ul>

)}


{/* Recruiter Navbar */}

{recruiter && (

    <ul className="navbar-nav ms-auto align-items-center">

        <li className="nav-item">

            <NavLink
                to="/recruiter-dashboard"
                className={({ isActive }) =>
                    isActive
                        ? "nav-link text-white active-nav"
                        : "nav-link text-white"
                }
            >

                <FaTachometerAlt className="me-2" />

                Dashboard

            </NavLink>

        </li>

        <li className="nav-item">

            <NavLink
                to="/manage-jobs"
                className={({ isActive }) =>
                    isActive
                        ? "nav-link text-white active-nav"
                        : "nav-link text-white"
                }
            >

                <FaBriefcase className="me-2" />

                Manage Jobs

            </NavLink>

        </li>

        <li className="nav-item">

            <NavLink
                to="/view-applicants"
                className={({ isActive }) =>
                    isActive
                        ? "nav-link text-white active-nav"
                        : "nav-link text-white"
                }
            >

                <FaFileAlt className="me-2" />

                Applications

            </NavLink>

        </li>

        <li className="nav-item ms-3">

            <button
                className="btn btn-outline-light rounded-circle d-flex align-items-center justify-content-center"
                onClick={toggleTheme}
                title={darkMode ? "Light Mode" : "Dark Mode"}
                style={{
                    width: "42px",
                    height: "42px"
                }}
            >

                {darkMode ? "☀" : "🌙"}

            </button>

        </li>

        <li className="nav-item dropdown ms-3">

            <a
                href="#"
                className="nav-link dropdown-toggle text-white d-flex align-items-center"
                role="button"
                data-bs-toggle="dropdown"
                title="Profile"
            >

                {

                    recruiter.profilePicture ?

                        <img
                            src={getProfilePicture(recruiter.profilePicture)}
                            alt="Profile"
                            className="rounded-circle me-2"
                            style={{
                                width: "38px",
                                height: "38px",
                                objectFit: "cover",
                                border: "2px solid white"
                            }}
                        />

                        :

                        <div
                            className="rounded-circle bg-white text-primary d-flex align-items-center justify-content-center me-2"
                            style={{
                                width: "38px",
                                height: "38px",
                                fontWeight: "bold"
                            }}
                        >

                            {recruiter.name.charAt(0).toUpperCase()}

                        </div>

                }

                <span className="text-white fw-semibold ms-1">

                    {recruiter.name.split(" ")[0]}

                </span>

            </a>

            <ul className="dropdown-menu dropdown-menu-end">

                <li>

                    <Link
                        className="dropdown-item"
                        to="/recruiter-profile"
                    >

                        My Profile

                    </Link>

                </li>

                <li>

                    <hr className="dropdown-divider" />

                </li>

                <li>

                    <button
                        className="dropdown-item text-danger"
                        onClick={handleLogout}
                    >

                        Logout

                    </button>

                </li>

            </ul>

        </li>

    </ul>

)}

                   {/* Guest Navbar */}

{!user && !recruiter && (

    <ul className="navbar-nav ms-auto align-items-center">

        <li className="nav-item">
            <NavLink
                to="/"
                className={({ isActive }) =>
                    isActive ? "nav-link text-white active-nav" : "nav-link text-white"
                }
            >
                <FaHome
                    className="me-2"
                    style={{
                        fontSize: "22px",
                        marginTop: "-3px"
                    }}
                />
                Home
            </NavLink>
        </li>

        <li className="nav-item">
            <NavLink
                to="/jobs"
                className={({ isActive }) =>
                    isActive ? "nav-link text-white active-nav" : "nav-link text-white"
                }
            >
                <FaBriefcase className="me-2" />
                Jobs
            </NavLink>
        </li>

        <li className="nav-item">
            <NavLink
                to="/login"
                className={({ isActive }) =>
                    isActive ? "nav-link text-white active-nav" : "nav-link text-white"
                }
            >
                <FaUser className="me-2" />
                Candidate Login
            </NavLink>
        </li>

        <li className="nav-item">
            <NavLink
                to="/recruiter-login"
                className={({ isActive }) =>
                    isActive ? "nav-link text-white active-nav" : "nav-link text-white"
                }
            >
                <FaBuilding className="me-2" />
                Recruiter Login
            </NavLink>
        </li>

        <li className="nav-item">
            <NavLink
                to="/register"
                className={({ isActive }) =>
                    isActive ? "nav-link text-white active-nav" : "nav-link text-white"
                }
            >
                <FaUserPlus className="me-2" />
                Register
            </NavLink>
        </li>

        <li className="nav-item ms-3">

            <button
                className="btn btn-outline-light rounded-circle d-flex align-items-center justify-content-center"
                onClick={toggleTheme}
                title={darkMode ? "Light Mode" : "Dark Mode"}
                style={{
                    width: "42px",
                    height: "42px"
                }}
            >
                {darkMode ? "☀" : "🌙"}
            </button>

        </li>

    </ul>

)}

                </div>

            </div>

        </nav>

    );

}

export default Navbar;
