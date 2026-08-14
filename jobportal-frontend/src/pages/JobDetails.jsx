import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    getJobById,
    applyForJob,
    uploadResume,
    hasApplied
} from "../services/ApiService";
import { toast } from "react-toastify";

function JobDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [job, setJob] = useState(null);

    const [selectedFile, setSelectedFile] = useState(null);

    const [applied, setApplied] = useState(false);

  useEffect(() => {

    loadJob();
    checkApplicationStatus();

}, []);

const checkApplicationStatus = async () => {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) return;

    try {

        const response = await hasApplied(user.id, id);

        setApplied(response.data);

    }

    catch (error) {

        console.log(error);

    }

};

    const loadJob = async () => {

        try {

            const response = await getJobById(id);

            setJob(response.data);

        }

        catch (error) {

            console.log(error);

            toast.error("Unable to load job");

        }

    };

const handleResumeChange = (e) => {

    const file = e.target.files[0];

    setSelectedFile(file);

    if (file) {

        toast.success("Resume uploaded successfully");

    }

};

    const handleApply = async () => {

        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {

            toast.warning("Please login first");

            return;

        }

        if (!selectedFile) {

            toast.warning("Please upload your resume first");

            return;

        }

        try {

            // Apply Job
            const response = await applyForJob({

                userId: user.id,
                jobId: job.id

            });

            // Get Application ID
            const applicationId = response.data.id;

            // Upload Resume
            const formData = new FormData();

            formData.append("file", selectedFile);

            await uploadResume(applicationId, formData);

            // Change Button
            setApplied(true);

            toast.success("Application Submitted Successfully");

            // Redirect after 2 seconds
            setTimeout(() => {

                navigate("/applied-jobs");

            }, 2000);

        }

        catch (error) {

            console.log(error);

            toast.error(

                error.response?.data ||

                "Unable to apply"

            );

        }

    };

    if (!job) {

        return (

            <div className="container mt-5">

                <h3 className="text-center">

                    Loading...

                </h3>

            </div>

        );

    }

    return (

        <div className="container mt-5 mb-5">

            {/* Back Button */}

            <div className="mb-4">

                <button

                    className="btn btn-outline-primary rounded-pill px-4 shadow-sm"

                    onClick={() => navigate(-1)}

                >

                    ← Back to Previous Page

                </button>

            </div>

            <div className="card shadow-lg border-0 rounded-4">

                <div className="card-body p-5">

                    <h2 className="text-primary fw-bold">

                        {job.title}

                    </h2>

                    <h4 className="text-secondary mb-4">

                        {job.companyName}

                    </h4>

                    <div className="row mb-4">

                        <div className="col-md-4">

                            <p>

                                <strong>📍 Location</strong>

                            </p>

                            <p>{job.location}</p>

                        </div>

                        <div className="col-md-4">

                            <p>

                                <strong>💰 Salary</strong>

                            </p>

                            <p>₹ {job.salary}</p>

                        </div>

                        <div className="col-md-4">

                            <p>

                                <strong>💼 Experience</strong>

                            </p>

                            <p>{job.experience}</p>

                        </div>

                    </div>

                    <hr />

                    <h4 className="mt-4">

                        🛠 Required Skills

                    </h4>

                    <p>

                        {job.skills}

                    </p>

                    <hr />

                    <h4>

                        📝 Job Description

                    </h4>

                    <p>

                        {job.description}

                    </p>

                    <hr />

                    <h4>

                        📋 Responsibilities

                    </h4>

                    <p>

                        {job.responsibilities}

                    </p>

                    <hr />

                    <h4>

                        🎁 Benefits

                    </h4>

                    <p>

                        {job.benefits}

                    </p>

                    <hr />

                    <div className="mb-4">

                        <label className="form-label fw-bold">

                            Upload Resume (PDF/DOC/DOCX)

                        </label>

                        <input

                            type="file"

                            className="form-control"

                            accept=".pdf,.doc,.docx"

                            onChange={handleResumeChange}

                        />

                    </div>

                    <div className="d-flex justify-content-between align-items-center">

                        <div>

                            <strong>

                                Last Date :

                            </strong>

                            {" "}

                            {job.applicationDeadline}

                        </div>

                        {

                            job.status === "OPEN"

                                ?

                                applied

                                    ?

                                    <button

                                        className="btn btn-success btn-lg rounded-pill px-4"

                                        disabled

                                    >

                                        ✔ Applied

                                    </button>

                                    :

                                    <button

                                        className="btn btn-primary btn-lg rounded-pill px-4"

                                        onClick={handleApply}

                                    >

                                        Apply Now

                                    </button>

                                :

                                <button

                                    className="btn btn-secondary btn-lg rounded-pill px-4"

                                    disabled

                                >

                                    Applications Closed

                                </button>

                        }

                    </div>

                </div>

            </div>

        </div>

    );

}

export default JobDetails;