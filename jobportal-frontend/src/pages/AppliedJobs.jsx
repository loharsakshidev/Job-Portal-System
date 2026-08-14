import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAppliedJobs } from "../services/ApiService";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

function AppliedJobs() {

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        loadAppliedJobs();
    }, []);

    const loadAppliedJobs = async () => {

        try {

            setLoading(true);

            if (!user) {
                toast.error("Please login first");
                return;
            }

            const response = await getAppliedJobs(user.id);

            setApplications(response.data);

        }

        catch (error) {

            console.log(error);

            toast.error("Unable to load applied jobs");

        }

        finally {

            setLoading(false);

        }

    };

    if (loading) {

        return <Loader />;

    }

    return (

        <div className="container py-5">

            <div className="text-center mb-5">

                <h1 className="fw-bold text-primary">
                    My Applications
                </h1>

                <p className="text-muted fs-5">
                    Track all your job applications in one place.
                </p>

            </div>

            {

                applications.length === 0 ?

                    <div className="text-center py-5">

                        <h1 style={{ fontSize: "70px" }}>📭</h1>

                        <h3>No Applications Yet</h3>

                        <p className="text-muted">
                            Start applying for jobs to see them here.
                        </p>

                        <Link
                            to="/jobs"
                            className="btn btn-primary rounded-pill px-4"
                        >
                            Browse Jobs
                        </Link>

                    </div>

                    :

                    <div className="row">

                        {

                            applications.map((application) => (

                                <div
                                    className="col-lg-6 mb-4"
                                    key={application.applicationId}
                                >

                                    <div className="card shadow border-0 rounded-4 h-100">

                                        <div className="card-body p-4">

                                            <h4 className="fw-bold text-primary">

                                                💼 {application.jobTitle}

                                            </h4>

                                            <h6 className="text-secondary mb-4">

                                                🏢 {application.companyName}

                                            </h6>

                                            <div className="row">

                                                <div className="col-6 mb-3">

                                                    <strong>📍 Location</strong>

                                                    <br />

                                                    {application.location}

                                                </div>

                                                <div className="col-6 mb-3">

                                                    <strong>💰 Salary</strong>

                                                    <br />

                                                    ₹ {application.salary}

                                                </div>

                                            </div>

                                            <div className="mb-3">

                                                <strong>📅 Applied On</strong>

                                                <br />

                                                {application.appliedDate}

                                            </div>

                                            <div className="mb-4">

                                                <strong>Status</strong>

                                                <br />

                                                {

                                                    application.status === "PENDING" ?

                                                        <span className="badge bg-warning text-dark fs-6 mt-2">
                                                            Pending Review
                                                        </span>

                                                        :

                                                        application.status === "ACCEPTED" ?

                                                            <span className="badge bg-success fs-6 mt-2">
                                                                Accepted 🎉
                                                            </span>

                                                            :

                                                            <span className="badge bg-danger fs-6 mt-2">
                                                                Rejected
                                                            </span>

                                                }

                                            </div>

                                            {

                                                application.jobTitle !== "Job Deleted" ?

                                                    <Link
                                                        to={`/jobs/${application.applicationId}`}
                                                        className="btn btn-outline-primary rounded-pill"
                                                    >
                                                        View Job Details
                                                    </Link>

                                                    :

                                                    <button
                                                        className="btn btn-secondary rounded-pill"
                                                        disabled
                                                    >
                                                        Job No Longer Available
                                                    </button>

                                            }

                                        </div>

                                    </div>

                                </div>

                            ))

                        }

                    </div>

            }

        </div>

    );

}

export default AppliedJobs;