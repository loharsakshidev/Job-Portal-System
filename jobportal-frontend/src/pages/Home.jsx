import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllJobs } from "../services/ApiService";
import JobCard from "../components/JobCard";
import "./Home.css";


function Home() {

    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        loadJobs();
    }, []);

    const loadJobs = async () => {

        try {

            const response = await getAllJobs();

            setJobs(response.data.slice(0, 3));

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <>

            {/* HERO */}

<section className="hero-section">

    <div className="hero-circle hero-circle-1"></div>
    <div className="hero-circle hero-circle-2"></div>
    <div className="hero-circle hero-circle-3"></div>

    <div className="container">

        <div className="row align-items-center">

            <div className="col-lg-6">

                <span className="hero-badge">

                    🚀 India's Trusted Job Portal

                </span>

                <h1 className="hero-title mt-4">

                    Build Your

                    <span className="text-warning">

                        {" "}Dream Career

                    </span>

                    <br />

                    With JobSphere

                </h1>

                <p className="hero-description">

                    Discover verified opportunities from top companies,

                    upload your resume, apply in one click and

                    track every application effortlessly.

                </p>

                <div className="hero-buttons mt-4">

                    <Link
                        to="/jobs"
                        className="btn btn-warning btn-lg me-3"
                    >
                        🔍 Browse Jobs
                    </Link>

                    <Link
                        to="/register"
                        className="btn btn-outline-light btn-lg"
                    >
                        Create Account
                    </Link>

                </div>

                <div className="hero-tags mt-5">

                    <span>✔ Verified Companies</span>

                    <span>✔ One Click Apply</span>

                    <span>✔ Resume Upload</span>

                    <span>✔ Application Tracking</span>

                </div>

            </div>

            <div className="col-lg-6">

                <div className="hero-image-card">

                    <img
                        src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                        className="img-fluid hero-image"
                        alt="Hero"
                    />

                    <div className="floating-card card-1">

                        💼 100+ Jobs

                    </div>

                    <div className="floating-card card-2">

                        👨‍💻 500+ Candidates

                    </div>

                    <div className="floating-card card-3">

                        🏢 Top Recruiters

                    </div>

                </div>

            </div>

        </div>

    </div>

</section>

            {/* STATISTICS */}

            <section className="container my-5">

                <div className="row g-4">

                    <div className="col-md-3">

                        <div className="stats-card">

                            <h2>10+</h2>

                            <p>Jobs Posted</p>

                        </div>

                    </div>

                    <div className="col-md-3">

                        <div className="stats-card">

                            <h2>50+</h2>

                            <p>Applications</p>

                        </div>

                    </div>

                    <div className="col-md-3">

                        <div className="stats-card">

                            <h2>15+</h2>

                            <p>Registered Users</p>

                        </div>

                    </div>

                    <div className="col-md-3">

                        <div className="stats-card">

                            <h2>100%</h2>

                            <p>Free Platform</p>

                        </div>

                    </div>

                </div>

            </section>

            {/* WHY CHOOSE */}

            <section className="container py-5">

                <h2 className="section-heading">

                    Why Choose JobSphere?

                </h2>

                <div className="row mt-5">

                    <div className="col-md-3 mb-4">

                        <div className="feature-card">

                            <div className="feature-icon">

                                💼

                            </div>

                            <h4>Find Jobs</h4>

                            <p>

                                Browse jobs matching your skills and
                                interests.

                            </p>

                        </div>

                    </div>

                    <div className="col-md-3 mb-4">

                        <div className="feature-card">

                            <div className="feature-icon">

                                ⚡

                            </div>

                            <h4>Quick Apply</h4>

                            <p>

                                Apply for jobs in just one click.

                            </p>

                        </div>

                    </div>

                    <div className="col-md-3 mb-4">

                        <div className="feature-card">

                            <div className="feature-icon">

                                📊

                            </div>

                            <h4>Track Status</h4>

                            <p>

                                Monitor all your applications easily.

                            </p>

                        </div>

                    </div>

                    <div className="col-md-3 mb-4">

                        <div className="feature-card">

                            <div className="feature-icon">

                                🔒

                            </div>

                            <h4>Secure Platform</h4>

                            <p>

                                Your personal information remains safe.

                            </p>

                        </div>

                    </div>

                </div>

            </section>

            {/* LATEST JOBS */}

            <section className="container py-5">

                <h2 className="section-heading">

                    Latest Job Opportunities

                </h2>

                <div className="mt-5">

                    {

                        jobs.length === 0 ?

                            <h5 className="text-center">

                                No Jobs Available

                            </h5>

                            :

                            jobs.map((job) => (

                                <JobCard

                                    key={job.id}

                                    job={job}

                                />

                            ))

                    }

                </div>

            </section>

            {/* HOW IT WORKS */}

            <section className="container py-5">

                <h2 className="section-heading">

                    How It Works

                </h2>

                <div className="row mt-5 text-center">

                    <div className="col-md-4">

                        <div className="step-card">

                            <h1>1️⃣</h1>

                            <h4>Create Account</h4>

                            <p>

                                Register yourself as a candidate.

                            </p>

                        </div>

                    </div>

                    <div className="col-md-4">

                        <div className="step-card">

                            <h1>2️⃣</h1>

                            <h4>Browse Jobs</h4>

                            <p>

                                Search and explore jobs.

                            </p>

                        </div>

                    </div>

                    <div className="col-md-4">

                        <div className="step-card">

                            <h1>3️⃣</h1>

                            <h4>Apply & Get Hired</h4>

                            <p>

                                Apply and track your application.

                            </p>

                        </div>

                    </div>

                </div>

            </section>

            {/* CTA */}

            <section className="cta-section">

                <div className="container text-center">

                    <h1>

                        Your Dream Job is Just One Click Away

                    </h1>

                    <p className="mt-3">

                        Join JobSphere today and start building
                        your career.

                    </p>

                    <Link

                        to="/register"

                        className="btn btn-warning btn-lg hero-btn mt-3"

                    >

                        Get Started

                    </Link>

                </div>

            </section>

        </>

    );

}

export default Home;