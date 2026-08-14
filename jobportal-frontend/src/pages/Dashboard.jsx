import { useEffect, useState } from "react";
import { getAllJobs, getAppliedJobs } from "../services/ApiService";

function Dashboard() {

    const [totalJobs, setTotalJobs] = useState(0);
    const [appliedJobs, setAppliedJobs] = useState(0);
    const [openJobs, setOpenJobs] = useState(0);
    const [expiredJobs, setExpiredJobs] = useState(0);

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            const jobsResponse = await getAllJobs();

            const jobs = jobsResponse.data;

            setTotalJobs(jobs.length);

            setOpenJobs(
                jobs.filter(job => job.status === "OPEN").length
            );

            setExpiredJobs(
                jobs.filter(job => job.status === "EXPIRED").length
            );

            if (user) {

                const applicationResponse =
                    await getAppliedJobs(user.id);

                setAppliedJobs(applicationResponse.data.length);

            }

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="container mt-5">

            <h2 className="mb-4">
                Welcome, {user?.name} 👋
            </h2>

            <div className="row">

                <div className="col-md-3">
                    <div className="card text-center shadow">
                        <div className="card-body">
                            <h3>{totalJobs}</h3>
                            <p>Total Jobs</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card text-center shadow">
                        <div className="card-body">
                            <h3>{appliedJobs}</h3>
                            <p>Applied Jobs</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card text-center shadow">
                        <div className="card-body">
                            <h3>{openJobs}</h3>
                            <p>Open Jobs</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card text-center shadow">
                        <div className="card-body">
                            <h3>{expiredJobs}</h3>
                            <p>Expired Jobs</p>
                        </div>
                    </div>
                </div>

            </div>

        </div>

    );

}

export default Dashboard;