import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../services/ApiService";
import { toast } from "react-toastify";

function ForgotPassword() {

    const navigate = useNavigate();

    const [data, setData] = useState({
        email: "",
        newPassword: ""
    });

    const handleChange = (e) => {

        setData({
            ...data,
            [e.target.name]: e.target.value
        });

    };

    const handleReset = async () => {

        try {

            const response = await forgotPassword(data);

            toast.success(response.data);

            setTimeout(() => {

                navigate("/login");

            }, 1500);

        } catch (error) {

    console.log(error);

    console.log(error.response);

    console.log(error.response?.data);

    toast.error(error.response?.data || "Unable to reset password");

}

    };

    return (

        <div
            className="container d-flex justify-content-center align-items-center"
            style={{ minHeight: "90vh" }}
        >

            <div
                className="card shadow-lg border-0 rounded-4 p-5"
                style={{ width: "450px" }}
            >

                <h2 className="text-center mb-4 text-primary">

                    Forgot Password

                </h2>

                <div className="mb-3">

                    <label className="form-label">

                        Email

                    </label>

                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="Enter registered email"
                        value={data.email}
                        onChange={handleChange}
                    />

                </div>

                <div className="mb-4">

                    <label className="form-label">

                        New Password

                    </label>

                    <input
                        type="password"
                        className="form-control"
                        name="newPassword"
                        placeholder="Enter new password"
                        value={data.newPassword}
                        onChange={handleChange}
                    />

                </div>

                <button
                    className="btn btn-primary w-100"
                    onClick={handleReset}
                >

                    Reset Password

                </button>

            </div>

        </div>

    );

}

export default ForgotPassword;