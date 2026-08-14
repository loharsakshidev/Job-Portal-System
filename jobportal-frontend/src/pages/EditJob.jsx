import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getJobById, updateJob } from "../services/ApiService";
import { toast } from "react-toastify";

function EditJob() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [job, setJob] = useState({
        title: "",
        companyName: "",
        location: "",
        salary: "",
        skills: "",
        experience: "",
        applicationDeadline: "",
        status: "OPEN",
        description: "",
        responsibilities: "",
        benefits: ""
    });

    useEffect(() => {
        loadJob();
    }, []);

    const loadJob = async () => {

        try {

            const response = await getJobById(id);

            setJob(response.data);

        } catch (error) {

            console.log(error);

            toast.error("Unable to update job");

        }

    };

    const handleChange = (e) => {

        setJob({

            ...job,

            [e.target.name]: e.target.value

        });

    };

    const handleUpdate = async (e) => {

        e.preventDefault();

        try {

            await updateJob(id, job);

            toast.success("Job Updated Successfully");
            navigate("/manage-jobs");

        } catch (error) {

            console.log(error);

            toast.error("Unable to update job");

        }

    };

    return (

        <div className="container mt-5 mb-5">

            <div className="card shadow-lg border-0 rounded-4">

                <div className="card-body p-5">

                    <h2 className="text-center text-primary mb-4">
                        Edit Job
                    </h2>

                    <form onSubmit={handleUpdate}>

                        <div className="row">

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Job Title
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    value={job.title}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Company Name
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="companyName"
                                    value={job.companyName}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Location
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="location"
                                    value={job.location}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Salary
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="salary"
                                    value={job.salary}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Skills
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="skills"
                                    value={job.skills}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Experience
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="experience"
                                    value={job.experience}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Application Deadline
                                </label>

                                <input
                                    type="date"
                                    className="form-control"
                                    name="applicationDeadline"
                                    value={job.applicationDeadline}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Status
                                </label>

                                <select
                                    className="form-select"
                                    name="status"
                                    value={job.status}
                                    onChange={handleChange}
                                >
                                    <option value="OPEN">OPEN</option>
                                    <option value="CLOSED">CLOSED</option>
                                </select>

                            </div>

                        </div>

                        <div className="mb-3">

                            <label className="form-label">
                                Job Description
                            </label>

                            <textarea
                                rows="5"
                                className="form-control"
                                name="description"
                                value={job.description}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="mb-3">

                            <label className="form-label">
                                Responsibilities
                            </label>

                            <textarea
                                rows="4"
                                className="form-control"
                                name="responsibilities"
                                value={job.responsibilities}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="mb-4">

                            <label className="form-label">
                                Benefits
                            </label>

                            <textarea
                                rows="4"
                                className="form-control"
                                name="benefits"
                                value={job.benefits}
                                onChange={handleChange}
                            />

                        </div>

                        <button
                            type="submit"
                            className="btn btn-success btn-lg w-100"
                        >
                            Update Job
                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

}

export default EditJob;