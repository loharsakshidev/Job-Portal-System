import { useState, useEffect } from "react";
import { applyForJob, saveJob, hasApplied } from "../services/ApiService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";


function JobCard({ job, saved = false, onRemove })  {

    const [applied, setApplied] = useState(false);
    useEffect(() => {

    checkApplied();

}, []);

const checkApplied = async () => {

    if (!user) return;

    try {

        const response = await hasApplied(
            user.id,
            job.id
        );

        setApplied(response.data);

    }

    catch (error) {

        console.log(error);

    }

};

    const user = JSON.parse(localStorage.getItem("user"));

    const isOpen = job.status === "OPEN";

    

   const handleApply = async () => {

    if (!user) {

        toast.warning("Please login first");

        return;

    }

    try {

        await applyForJob({

            userId: user.id,
            jobId: job.id

        });

        toast.success("Application Submitted Successfully");

        setApplied(true);

    }

    catch (error) {

        console.log(error);

        toast.error(
            error.response?.data || "Unable to Apply"
        );

    }

};

    const handleSaveJob = async () => {

    if (!user) {

        toast.error("Please login first");

        return;

    }

    try {

        await saveJob(user.id, job.id);

        toast.success("Job Saved Successfully");

    }

    catch (error) {

        console.log(error);

        toast.error(error.response?.data || "Unable to Save Job");

    }

};

    return (

        <div className="card border-0 shadow-lg rounded-4 mb-4">

            <div className="card-body p-4">

                <div className="d-flex justify-content-between align-items-start">

                    <div>

                        <h3 className="fw-bold text-primary">

                            {job.title}

                        </h3>

                        <h5 className="text-secondary">

                            🏢 {job.companyName}

                        </h5>

                    </div>

                    {

                        isOpen ?

                            <span className="badge bg-success fs-6 px-3 py-2">

                                OPEN

                            </span>

                            :

                            <span className="badge bg-danger fs-6 px-3 py-2">

                                CLOSED

                            </span>

                    }

                </div>

                <hr />

                <div className="row">

                    <div className="col-md-6">

                        <p>

                            📍 <strong>Location :</strong>

                            {" "}

                            {job.location}

                        </p>

                    </div>

                    <div className="col-md-6">

                        <p>

                            💰 <strong>Salary :</strong>

                            ₹ {job.salary}

                        </p>

                    </div>

                    <div className="col-md-6">

                        <p>

                            🛠 <strong>Skills :</strong>

                            {job.skills}

                        </p>

                    </div>

                    <div className="col-md-6">

                        <p>

                            💼 <strong>Experience :</strong>

                            {job.experience}

                        </p>

                    </div>

                    <div className="col-md-12">

                        <p>

                            📅 <strong>Application Deadline :</strong>

                            {" "}

                            {job.applicationDeadline}

                        </p>

                    </div>

                </div>

                <div className="d-flex gap-2 mt-4">

    <Link
        to={`/jobs/${job.id}`}
        className="btn btn-outline-primary"
    >
        View Details
    </Link>

   {
    saved ?

        <button
            className="btn btn-outline-danger"
            onClick={() => onRemove(job.id)}
        >
            ❌ Remove
        </button>

        :

        <button
            className="btn btn-outline-success"
            onClick={handleSaveJob}
        >
            ❤️ Save
        </button>
}


    {

        isOpen ?

            applied ?

                <button
                    className="btn btn-success"
                    disabled
                >
                    Applied
                </button>

                :

                <button
                    className="btn btn-primary"
                    onClick={handleApply}
                >
                    Apply
                </button>

            :

            <button
                className="btn btn-secondary"
                disabled
            >
                Closed
            </button>

            

    }


                    

                </div>

            </div>

        </div>

    );

}

export default JobCard;