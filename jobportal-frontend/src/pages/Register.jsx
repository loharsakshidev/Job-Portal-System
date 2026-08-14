import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    FaUser,
    FaEnvelope,
    FaLock,
    FaUserTie,
    FaBriefcase
} from "react-icons/fa";
import API from "../services/ApiService";
import { toast } from "react-toastify";

function Register() {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        role: "CANDIDATE"
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {

    const { name, value } = e.target;

    setUser({
        ...user,
        [name]: value
    });

    setErrors({
        ...errors,
        [name]: ""
    });

};

    const validateForm = () => {

    let newErrors = {};

    if (!user.name.trim()) {
        newErrors.name = "Full Name is required";
    }

    if (!user.email.trim()) {
        newErrors.email = "Email is required";
    }
    else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(user.email)
    ) {
        newErrors.email = "Enter a valid email";
    }

    if (!user.password.trim()) {
        newErrors.password = "Password is required";
    }
    else if (user.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
};

    const registerUser = async () => {
        if (!validateForm()) {
    return;
}

        try {

            const response = await API.post(
                "/users/register",
                user
            );

            toast.success("Registration Successful 🎉");

            setUser({
                name: "",
                email: "",
                password: "",
                role: "CANDIDATE"
            });

            setTimeout(() => {

                if (user.role === "RECRUITER") {

                    navigate("/recruiter-login");

                } else {

                    navigate("/login");

                }

            }, 1200);

        }

        catch (error) {

            console.log(error);

            toast.error("Registration Failed");

        }

    };

    return (

        <div
    className="container-fluid py-5 auth-page"
    style={{
        minHeight: "100vh"
    }}
>

            <div className="row align-items-center justify-content-center">

                {/* Left Side */}

                <div className="col-lg-6 d-none d-lg-block">

                    <div className="p-5">

                        <h1
                            className="fw-bold"
                            style={{
                                color: "#2563EB",
                                fontSize: "3rem"
                            }}
                        >
                            Join JobSphere 🚀
                        </h1>

                        <h3 className="mt-3">
                            Your career starts here.
                        </h3>

                        <p
                            className="text-secondary mt-4"
                            style={{
                                fontSize: "18px",
                                lineHeight: "30px"
                            }}
                        >
                            Whether you're searching for your dream
                            job or looking for talented candidates,
                            JobSphere helps you connect quickly and
                            securely.
                        </p>

                        <div className="mt-5">

                            <h5>✔ Apply for Thousands of Jobs</h5>

                            <h5 className="mt-3">
                                ✔ Hire Top Candidates
                            </h5>

                            <h5 className="mt-3">
                                ✔ Fast & Secure Registration
                            </h5>

                        </div>

                    </div>

                </div>

                {/* Registration Card */}

                <div className="col-lg-5 col-md-8">

                    <div className="card border-0 shadow-lg rounded-4 p-5">

                        <h2 className="text-center fw-bold mb-4">

                            Create Account

                        </h2>
                                                {/* Name */}

                        <div className="mb-3">

                            <label className="form-label fw-semibold">
                                Full Name
                            </label>

                            <div className="input-group">

                                <span className="input-group-text bg-white">
                                    <FaUser />
                                </span>

                                <input
    type="text"
    className={`form-control ${errors.name ? "is-invalid" : ""}`}
    name="name"
    placeholder="Enter your full name"
    value={user.name}
    onChange={handleChange}
/>

{errors.name && (
    <div className="invalid-feedback d-block">
        {errors.name}
    </div>
)}

                            </div>

                        </div>

                        {/* Email */}

                        <div className="mb-3">

                            <label className="form-label fw-semibold">
                                Email
                            </label>

                            <div className="input-group">

                                <span className="input-group-text bg-white">
                                    <FaEnvelope />
                                </span>

<input
    type="email"
    className={`form-control ${errors.email ? "is-invalid" : ""}`}
    name="email"
    placeholder="Enter your email"
    value={user.email}
    onChange={handleChange}
/>

{errors.email && (
    <div className="invalid-feedback d-block">
        {errors.email}
    </div>
)}

                            </div>

                        </div>

                        {/* Password */}

                        <div className="mb-4">

                            <label className="form-label fw-semibold">
                                Password
                            </label>

                            <div className="input-group">

                                <span className="input-group-text bg-white">
                                    <FaLock />
                                </span>

<input
    type="password"
    className={`form-control ${errors.password ? "is-invalid" : ""}`}
    name="password"
    placeholder="Create a password"
    value={user.password}
    onChange={handleChange}
/>

{errors.password && (
    <div className="invalid-feedback d-block">
        {errors.password}
    </div>
)}

                            </div>

                        </div>

                        {/* Role Selection */}

                        <label className="form-label fw-bold mb-3">
                            Choose Account Type
                        </label>

                        <div className="row mb-4">

                            <div className="col-6">

                                <div
                                    className={`card p-3 text-center h-100 ${
                                        user.role === "CANDIDATE"
                                            ? "border-primary shadow"
                                            : ""
                                    }`}
                                    style={{
                                        cursor: "pointer",
                                        transition: ".3s",
                                        background:
                                            user.role === "CANDIDATE"
                                                ? "#EFF6FF"
                                                : "#fff"
                                    }}
                                    onClick={() =>
                                        setUser({
                                            ...user,
                                            role: "CANDIDATE"
                                        })
                                    }
                                >

                                    <FaUser
                                        size={35}
                                        className="mx-auto text-primary mb-3"
                                    />

                                    <h5 className="fw-bold">
                                        Candidate
                                    </h5>

                                    <small className="text-muted">
                                        Apply for jobs
                                    </small>

                                </div>

                            </div>

                            <div className="col-6">

                                <div
                                    className={`card p-3 text-center h-100 ${
                                        user.role === "RECRUITER"
                                            ? "border-primary shadow"
                                            : ""
                                    }`}
                                    style={{
                                        cursor: "pointer",
                                        transition: ".3s",
                                        background:
                                            user.role === "RECRUITER"
                                                ? "#EFF6FF"
                                                : "#fff"
                                    }}
                                    onClick={() =>
                                        setUser({
                                            ...user,
                                            role: "RECRUITER"
                                        })
                                    }
                                >

                                    <FaBriefcase
                                        size={35}
                                        className="mx-auto text-primary mb-3"
                                    />

                                    <h5 className="fw-bold">
                                        Recruiter
                                    </h5>

                                    <small className="text-muted">
                                        Post jobs & hire
                                    </small>

                                </div>

                            </div>

                        </div>

                        <button
                            className="btn btn-primary btn-lg w-100"
                            onClick={registerUser}
                        >
                            Create Account
                        </button>

                        <div className="text-center mt-4">

                            <span className="text-muted">
                                Already have an account?
                            </span>

                            <Link
                                to={
                                    user.role === "RECRUITER"
                                        ? "/recruiter-login"
                                        : "/login"
                                }
                                className="fw-bold text-decoration-none ms-2"
                            >
                                Login
                            </Link>

                        </div>
                                            </div>

                </div>

            </div>

        </div>

    );

}

export default Register;