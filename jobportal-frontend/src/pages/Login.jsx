import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/ApiService";
import { toast } from "react-toastify";
import "./Login.css";

function Login() {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {

        setUser({
            ...user,
            [e.target.name]: e.target.value
        });

    };

   const handleLogin = async () => {

    try {

        const response = await loginUser(user);

        localStorage.setItem(
            "user",
            JSON.stringify(response.data)
        );

        toast.success("Welcome Back 👋");

        setTimeout(() => {

            navigate("/");

        }, 1200);

    }

    catch (error) {

        console.log(error);

        toast.error("Invalid Email or Password");

    }

};
    return (

        <div
    className="container-fluid auth-page"
    style={{
        minHeight: "90vh"
    }}
>
            <div className="row align-items-center justify-content-center h-100">

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
                            Welcome Back 👋
                        </h1>

                        <h3 className="mt-3 text-dark">

                            Login to your JobSphere account

                        </h3>

                        <p
                            className="text-secondary mt-4"
                            style={{fontSize:"18px"}}
                        >
                            Discover exciting career opportunities,
                            apply with one click and connect with
                            top companies.
                        </p>

                        
                    </div>

                </div>

                {/* Right Side */}

                <div
    className="col-lg-5 col-md-8"
    style={{ marginTop: "70px" }}
>

                    

                    <div
                        className="card border-0 shadow-lg rounded-4 p-5"
                    >

                        <h2
                            className="text-center fw-bold mb-4"
                        >
                            Candidate Login
                        </h2>

                        <div className="mb-3">

                            <label className="form-label fw-semibold">
                                Email
                            </label>

                            <input
                                type="email"
                                className="form-control form-control-lg"
                                name="email"
                                placeholder="Enter email"
                                value={user.email}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="mb-4">

                            <label className="form-label fw-semibold">
                                Password
                            </label>

                            <input
                                type="password"
                                className="form-control form-control-lg"
                                name="password"
                                placeholder="Enter password"
                                value={user.password}
                                onChange={handleChange}
                            />

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
                            className="btn btn-primary btn-lg w-100"
                            onClick={handleLogin}
                        >
                            Login
                        </button>

                        <div className="text-center mt-4">

                            <span className="text-secondary">
                                Don't have an account?
                            </span>

                            <Link
                                to="/register"
                                className="text-decoration-none fw-bold ms-2"
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

export default Login;