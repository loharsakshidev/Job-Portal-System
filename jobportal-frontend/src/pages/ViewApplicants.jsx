import { useEffect, useState } from "react";
import {
    getAllApplications,
    updateApplicationStatus,
    downloadResume
} from "../services/ApiService";

import { toast } from "react-toastify";
import Loader from "../components/Loader";

import "./ViewApplicants.css";

function ViewApplicants() {

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadApplications();

    }, []);

    const loadApplications = async () => {

    try {

        setLoading(true);

        const response = await getAllApplications();

        setApplications(response.data);

    }

    catch (error) {

        console.log(error);

        toast.error("Unable to load applications");

    }

    finally {

        setLoading(false);

    }

};
    const changeStatus = async (id, status) => {

        try {

            const response =
                await updateApplicationStatus(id, status);

            toast.success(response.data);

            loadApplications();

        }

        catch (error) {

            console.log(error);

            toast.error("Unable to update application status");

        }

    };

    if (loading) {

    return <Loader />;

}

    return (

        <div className="container mt-5">

            <h2 className="text-center fw-bold mb-4">
                View Applicants
            </h2>

            {

                applications.length === 0 ?

                    <h4 className="text-center">
                        No Applications Found
                    </h4>

                    :

                    <div className="table-responsive">

                        <table className="table table-bordered table-hover shadow align-middle">

                            <thead className="table-dark">

                            <tr>

                                <th>Application ID</th>

                                <th>Candidate Name</th>

                                <th>Email</th>

                                <th>Job Title</th>

                                <th>Company</th>

                                <th>Applied Date</th>

                                <th>Status</th>

                                <th>Resume</th>

                                <th>Action</th>

                            </tr>

                            </thead>

                            <tbody>

                            {

                                applications.map((application) => (

                                    <tr key={application.applicationId}>

                                        <td>
                                            {application.applicationId}
                                        </td>

                                        <td>
                                            {application.candidateName}
                                        </td>

                                        <td>
                                            {application.candidateEmail}
                                        </td>

                                        <td>

                                            {

                                                application.jobTitle === "Job Deleted"

                                                    ?

                                                    <span className="badge bg-danger fs-6">

                                                        ❌ Job Deleted

                                                    </span>

                                                    :

                                                    <span className="fw-semibold">

                                                        {application.jobTitle}

                                                    </span>

                                            }

                                        </td>

                                        <td>

                                            {

                                                application.companyName === "-"

                                                    ?

                                                    <span className="text-muted">

                                                        N/A

                                                    </span>

                                                    :

                                                    application.companyName

                                            }

                                        </td>

                                        <td>

                                            {application.appliedDate}

                                        </td>

                                        <td>

                                            {

                                                application.status === "PENDING"

                                                    ?

                                                    <span className="badge bg-warning">

                                                        PENDING

                                                    </span>

                                                    :

                                                    application.status === "ACCEPTED"

                                                        ?

                                                        <span className="badge bg-success">

                                                            ACCEPTED

                                                        </span>

                                                        :

                                                        <span className="badge bg-danger">

                                                            REJECTED

                                                        </span>

                                            }

                                        </td>

                                        <td>

                                            {

                                                application.resume

                                                    ?

                                                    <div className="d-grid gap-2">

                                                        <span className="badge bg-success">

                                                            ✅ Resume Available

                                                        </span>

                                                        <button

                                                            className="btn btn-outline-primary btn-sm"

                                                            onClick={() =>
                                                                downloadResume(
                                                                    application.resume
                                                                )
                                                            }

                                                        >

                                                            📄 Download

                                                        </button>

                                                    </div>

                                                    :

                                                    <span className="badge bg-secondary">

                                                        ❌ No Resume

                                                    </span>

                                            }

                                        </td>

                                        <td>

                                            {

                                                application.status === "PENDING"

                                                    ?

                                                    <div className="d-grid gap-2">

                                                        <button

                                                            className="btn btn-success btn-sm"

                                                            onClick={() =>
                                                                changeStatus(
                                                                    application.applicationId,
                                                                    "ACCEPTED"
                                                                )
                                                            }

                                                        >

                                                            ✔ Accept

                                                        </button>

                                                        <button

                                                            className="btn btn-danger btn-sm"

                                                            onClick={() =>
                                                                changeStatus(
                                                                    application.applicationId,
                                                                    "REJECTED"
                                                                )
                                                            }

                                                        >

                                                            ✖ Reject

                                                        </button>

                                                    </div>

                                                    :

<span className="fw-bold text-success">
    No Action
</span>
                                            }

                                        </td>

                                    </tr>

                                ))

                            }

                            </tbody>

                        </table>

                    </div>

            }

        </div>

    );

}

export default ViewApplicants;