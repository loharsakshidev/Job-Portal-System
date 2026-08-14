import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    getSavedJobs,
    getJobById,
    removeSavedJob
} from "../services/ApiService";
import JobCard from "../components/JobCard";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

function SavedJobs() {

    const user = JSON.parse(localStorage.getItem("user"));
    const [loading, setLoading] = useState(true);

    const [jobs, setJobs] = useState([]);

    useEffect(() => {

        loadSavedJobs();

    }, []);

  const loadSavedJobs = async () => {

    try {

        setLoading(true);

        const response = await getSavedJobs(user.id);

        const savedJobs = response.data;

        let jobList = [];

        for (let savedJob of savedJobs) {

            try {

                const jobResponse =
                    await getJobById(savedJob.jobId);

                jobList.push(jobResponse.data);

            }

            catch {

                // Ignore deleted jobs

            }

        }

        setJobs(jobList);

    }

    catch (error) {

        console.log(error);

        toast.error("Unable to load saved jobs");

    }

    finally {

        setLoading(false);

    }

};

    const handleRemove = async (jobId) => {

        try {

            await removeSavedJob(user.id, jobId);

            toast.success("Job Removed Successfully");

            loadSavedJobs();

        }

        catch (error) {

            console.log(error);

            toast.error("Unable to Remove Job");

        }

    };

    if (loading) {

    return <Loader />;

}

    return (

        <div className="container py-5">

            <div className="text-center mb-5">

                <h1 className="fw-bold text-danger">

                    ❤️ Saved Jobs

                </h1>

                <p className="text-muted fs-5">

                    Quickly access all the jobs you've saved.

                </p>

            </div>

            {

                jobs.length === 0 ?

                    <div className="text-center py-5">

                        <div
                            className="mx-auto mb-4 d-flex align-items-center justify-content-center"
                            style={{
                                width: "130px",
                                height: "130px",
                                borderRadius: "50%",
                                background: "#FFECEC",
                                fontSize: "60px"
                            }}
                        >
                            ❤️
                        </div>

                        <h2 className="fw-bold text-danger">

                            No Saved Jobs Yet

                        </h2>

                        <p
                            className="text-muted fs-5 mb-4"
                            style={{ maxWidth: "500px", margin: "0 auto" }}
                        >

                            Save jobs that interest you and they'll appear
                            here for quick access whenever you're ready to apply.

                        </p>

                        <Link
                            to="/jobs"
                            className="btn btn-danger btn-lg rounded-pill px-5 shadow"
                        >

                            🔍 Browse Jobs

                        </Link>

                    </div>

                    :

                    jobs.map(job => (

                        <JobCard
                            key={job.id}
                            job={job}
                            saved={true}
                            onRemove={handleRemove}
                        />

                    ))

            }

        </div>

    );

}

export default SavedJobs;