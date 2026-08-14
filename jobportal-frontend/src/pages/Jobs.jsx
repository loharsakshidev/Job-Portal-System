import { useEffect, useState } from "react";
import { getAllJobs } from "../services/ApiService";
import JobCard from "../components/JobCard";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

function Jobs() {

    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadJobs();
    }, []);

    const loadJobs = async () => {

    try {

        setLoading(true);

        const response = await getAllJobs();

setJobs(response.data);
setFilteredJobs(response.data);
    }

    catch (error) {

        console.log(error);

        toast.error("Unable to load jobs");

    }

    finally {

        setLoading(false);

    }

};
    const handleSearch = (value) => {

        setSearch(value);

        const result = jobs.filter((job) =>

            job.title.toLowerCase().includes(value.toLowerCase()) ||

            job.companyName.toLowerCase().includes(value.toLowerCase()) ||

            job.location.toLowerCase().includes(value.toLowerCase()) ||

            job.skills.toLowerCase().includes(value.toLowerCase())

        );

        setFilteredJobs(result);

    };

    if (loading) {

    return <Loader />;

}

    return (

        <div className="container mt-5">

            <div className="text-center mb-5">

                <h1 className="fw-bold text-primary">

                    Explore Jobs

                </h1>

                <p className="text-muted">

                    Find your dream opportunity from hundreds of companies.

                </p>

            </div>

            <div className="card shadow border-0 p-4 mb-4">

                <div className="row align-items-center">

                    <div className="col-md-8">

                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Search by Job, Company, Skills or Location..."
                            value={search}
                            onChange={(e) =>
                                handleSearch(e.target.value)
                            }
                        />

                    </div>

                    <div className="col-md-4 text-end">

                        <h5 className="mt-3 mt-md-0">

                            Jobs Found :
                            <span className="text-primary">

                                {" "}
                                {filteredJobs.length}

                            </span>

                        </h5>

                    </div>

                </div>

            </div>

            {

                filteredJobs.length === 0 ?

                    <div className="alert alert-warning text-center">

                        No jobs found.

                    </div>

                    :

                    filteredJobs.map((job) => (

                        <JobCard
                            key={job.id}
                            job={job}
                        />

                    ))

            }

        </div>

    );

}

export default Jobs;