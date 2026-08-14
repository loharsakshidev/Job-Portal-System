import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { loginUser } from "../services/ApiService";
import { toast } from "react-toastify";

function RecruiterLogin() {

    const navigate = useNavigate();

    const [recruiter, setRecruiter] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {

        setRecruiter({
            ...recruiter,
            [e.target.name]: e.target.value
        });

    };

    const handleLogin = async () => {

    try {

        const response = await loginUser(recruiter);

        localStorage.setItem(
            "recruiter",
            JSON.stringify(response.data)
        );

        toast.success("Welcome Recruiter 👋");

        setTimeout(() => {

            navigate("/recruiter-dashboard");

        }, 1200);

    }

    catch (error) {

        console.log(error);

        toast.error("Invalid Email or Password");

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

                <div className="col-lg-6 d-none d-lg-block">

                    <div className="p-5">

                        <h1
                            className="fw-bold"
                            style={{
                                color:"#2563EB",
                                fontSize:"3rem"
                            }}
                        >
                            Welcome Recruiter 👋
                        </h1>

                        <h3 className="mt-3">
                            Hire the Right Talent with JobSphere
                        </h3>

                        <p
                            className="text-secondary mt-4"
                            style={{
                                fontSize:"18px",
                                lineHeight:"30px"
                            }}
                        >
                            Post job openings, manage applications,
                            shortlist candidates and hire the best
                            talent from one place.
                        </p>

                        <div className="mt-5">

                            <h5>✔ Post Jobs</h5>

                            <h5 className="mt-3">
                                ✔ Review Applications
                            </h5>

                            <h5 className="mt-3">
                                ✔ Hire Faster
                            </h5>

                        </div>

                    </div>

                </div>

                <div className="col-lg-5 col-md-8">

                    <div className="card border-0 shadow-lg login-card p-5">

                        <h2 className="text-center fw-bold mb-4">
                            Recruiter Login
                        </h2>

                        <div className="mb-4">

                            <label className="form-label fw-semibold">
                                Email
                            </label>

                            <div className="input-group">

                                <span className="input-group-text bg-white">
                                    <FaEnvelope/>
                                </span>

                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={recruiter.email}
                                    onChange={handleChange}
                                />

                            </div>

                        </div>

                        <div className="mb-4">

                            <label className="form-label fw-semibold">
                                Password
                            </label>

                            <div className="input-group">

                                <span className="input-group-text bg-white">
                                    <FaLock/>
                                </span>

                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    placeholder="Enter your password"
                                    value={recruiter.password}
                                    onChange={handleChange}
                                />

                            </div>

                        </div>

                        <div className="text-end mb-4">

    <Link
        to="/forgot-password"
        className="text-decoration-none"
    >
        Forgot Password?
    </Link>

</div>

                        <button
                            className="btn btn-primary login-btn w-100"
                            onClick={handleLogin}
                        >
                            Login
                        </button>

                        <div className="text-center mt-4">

                            <span className="text-muted">
                                New Recruiter?
                            </span>

                            <Link
                                to="/register"
                                className="fw-bold text-decoration-none ms-2"
                            >
                                Register
                            </Link>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default RecruiterLogin;