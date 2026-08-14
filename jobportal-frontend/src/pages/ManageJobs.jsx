import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    getAllJobs,
    closeJob,
    reopenJob
} from "../services/ApiService";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import "./ManageJobs.css";

function ManageJobs() {

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    // Popup states
    const [showPopup, setShowPopup] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [actionType, setActionType] = useState("");

    useEffect(() => {
        loadJobs();
    }, []);

    // ===============================
    // LOAD ALL JOBS
    // ===============================

    const loadJobs = async () => {

        try {

            setLoading(true);

            const response = await getAllJobs();

            setJobs(response.data);

        } catch (error) {

            console.log(error);

            toast.error("Unable to load jobs");

        } finally {

            setLoading(false);

        }

    };


    // ===============================
    // OPEN CONFIRMATION POPUP
    // ===============================

    const openConfirmationPopup = (job, type) => {

        setSelectedJob(job);
        setActionType(type);
        setShowPopup(true);

    };


    // ===============================
    // CLOSE POPUP
    // ===============================

    const closePopup = () => {

        setShowPopup(false);
        setSelectedJob(null);
        setActionType("");

    };


    // ===============================
    // CONFIRM CLOSE / REOPEN
    // ===============================

    const confirmAction = async () => {

        if (!selectedJob) {
            return;
        }

        try {

            if (actionType === "close") {

                await closeJob(selectedJob.id);

                toast.success("Job Closed Successfully");

            } else if (actionType === "reopen") {

                await reopenJob(selectedJob.id);

                toast.success("Job Reopened Successfully");

            }

            closePopup();

            loadJobs();

        } catch (error) {

            console.log(error);

            if (actionType === "close") {

                toast.error("Unable to Close Job");

            } else {

                toast.error("Unable to Reopen Job");

            }

            closePopup();

        }

    };


    // ===============================
    // SEARCH / FILTER
    // ===============================

    const filteredJobs = jobs.filter((job) =>
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.companyName.toLowerCase().includes(search.toLowerCase()) ||
        job.location.toLowerCase().includes(search.toLowerCase())
    );


    // ===============================
    // LOADING
    // ===============================

    if (loading) {

        return <Loader />;

    }


    return (

        <div className="container mt-5">

            {/* =====================================
                PAGE HEADER
            ===================================== */}

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h1 className="fw-bold text-primary">
                        Manage Jobs
                    </h1>

                    <p className="text-muted">
                        Edit, update or manage all posted jobs.
                    </p>

                </div>


                <Link
                    to="/post-job"
                    className="btn btn-primary rounded-pill px-4"
                >
                    + Post New Job
                </Link>

            </div>


            {/* =====================================
                SEARCH
            ===================================== */}

            <div className="card shadow border-0 rounded-4 p-4 mb-4">

                <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Search Job, Company or Location..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

            </div>


            {/* =====================================
                JOB TABLE
            ===================================== */}

            <div className="table-responsive">

                <table className="table table-hover table-bordered shadow">

                    <thead className="table-dark">

                        <tr>

                            <th>ID</th>

                            <th>Job</th>

                            <th>Company</th>

                            <th>Location</th>

                            <th>Salary</th>

                            <th>Status</th>

                            <th>Deadline</th>

                            <th width="220">
                                Actions
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        {filteredJobs.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="8"
                                    className="text-center py-4"
                                >
                                    No Jobs Found
                                </td>

                            </tr>

                        ) : (

                            filteredJobs.map((job) => (

                                <tr key={job.id}>

                                    {/* ID */}

                                    <td>
                                        {job.id}
                                    </td>


                                    {/* JOB */}

                                    <td>
                                        {job.title}
                                    </td>


                                    {/* COMPANY */}

                                    <td>
                                        {job.companyName}
                                    </td>


                                    {/* LOCATION */}

                                    <td>
                                        {job.location}
                                    </td>


                                    {/* SALARY */}

                                    <td>
                                        ₹ {job.salary}
                                    </td>


                                    {/* STATUS */}

                                    <td>

                                        {job.status === "OPEN" ? (

                                            <span className="badge bg-success">
                                                OPEN
                                            </span>

                                        ) : (

                                            <span className="badge bg-danger">
                                                CLOSED
                                            </span>

                                        )}

                                    </td>


                                    {/* DEADLINE */}

                                    <td>
                                        {job.applicationDeadline}
                                    </td>


                                    {/* ACTIONS */}

                                    <td>

                                        <div className="d-flex gap-2">

                                            {/* EDIT */}

                                            <Link
                                                to={`/edit-job/${job.id}`}
                                                className="btn btn-warning btn-sm"
                                            >
                                                Edit
                                            </Link>


                                            {/* CLOSE / REOPEN */}

                                            {job.status === "OPEN" ? (

                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() =>
                                                        openConfirmationPopup(
                                                            job,
                                                            "close"
                                                        )
                                                    }
                                                >
                                                    Close Job
                                                </button>

                                            ) : (

                                                <button
                                                    className="btn btn-success btn-sm"
                                                    onClick={() =>
                                                        openConfirmationPopup(
                                                            job,
                                                            "reopen"
                                                        )
                                                    }
                                                >
                                                    Reopen Job
                                                </button>

                                            )}

                                        </div>

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>


            {/* =====================================
                CONFIRMATION POPUP
            ===================================== */}

            {showPopup && selectedJob && (

                <div className="job-popup-overlay">

                    <div
                        className={`job-confirm-popup ${
                            actionType === "close"
                                ? "close-popup"
                                : "reopen-popup"
                        }`}
                    >

                        {/* =====================================
                            POPUP ICON
                        ===================================== */}

                        <div className="popup-icon">

                            {actionType === "close" ? (

                                <span>!</span>

                            ) : (

                                <span>✓</span>

                            )}

                        </div>


                        {/* =====================================
                            POPUP TITLE
                        ===================================== */}

                        <h3>

                            {actionType === "close"
                                ? "Close Job?"
                                : "Reopen Job?"}

                        </h3>


                        {/* =====================================
                            POPUP MESSAGE
                        ===================================== */}

                        <p className="popup-message">

                            Are you sure you want to{" "}

                            <strong>
                                {actionType === "close"
                                    ? "close"
                                    : "reopen"}
                            </strong>{" "}

                            this job?

                        </p>


                        {/* JOB NAME */}

                        <p className="popup-job-name">

                            "{selectedJob.title}"

                        </p>


                        {/* DESCRIPTION */}

                        <p className="popup-description">

                            {actionType === "close"

                                ? "Candidates will no longer be able to apply for this job."

                                : "Candidates will be able to apply for this job again."

                            }

                        </p>


                        {/* =====================================
                            POPUP BUTTONS
                        ===================================== */}

                        <div className="popup-buttons">

                            {/* CANCEL */}

                            <button
                                className="popup-cancel-btn"
                                onClick={closePopup}
                            >
                                Cancel
                            </button>


                            {/* CONFIRM */}

                            {actionType === "close" ? (

                                <button
                                    className="popup-confirm-close"
                                    onClick={confirmAction}
                                >
                                    Yes, Close Job
                                </button>

                            ) : (

                                <button
                                    className="popup-confirm-reopen"
                                    onClick={confirmAction}
                                >
                                    Yes, Reopen Job
                                </button>

                            )}

                        </div>

                    </div>

                </div>

            )}

        </div>

    );

}

export default ManageJobs;