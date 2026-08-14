import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDashboardData } from "../services/ApiService";
import { toast } from "react-toastify";
import Loader from "../components/Loader";


import "./RecruiterDashboard.css";

function RecruiterDashboard() {
  const [dashboard, setDashboard] = useState({
    totalJobs: 0,
    openJobs: 0,
    closedJobs: 0,
    totalCandidates: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const response = await getDashboardData();

      setDashboard(response.data);
    } catch (error) {
      console.log(error);

      toast.error("Unable to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container py-5">
      {/* Page Heading */}

      <div className="text-center mb-5">
        <h1
          className="fw-bold"
          style={{
            color: "#2563EB",
            fontSize: "42px",
          }}
        >
          Recruiter Dashboard
        </h1>

        <p
          className="text-muted fs-5"
          style={{
            maxWidth: "700px",
            margin: "0 auto",
          }}
        >
          Monitor your hiring process, manage job postings, and track
          recruitment activities from one place.
        </p>
      </div>

      {/* Analytics Cards */}

      <div className="row g-4">
        <div className="col-lg-3 col-md-6">
          <div
  className="card dashboard-card border-0 shadow rounded-4 h-100"
            style={{
              background: "linear-gradient(135deg,#2563EB,#1D4ED8)",
              color: "white",
            }}
          >
            <div className="card-body text-center p-4">
              <div style={{ fontSize: "45px" }}>📋</div>

              <h6 className="mt-3 text-white">Total Jobs</h6>

              <h2 className="fw-bold text-white">{dashboard.totalJobs}</h2>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div
  className="card dashboard-card border-0 shadow rounded-4 h-100"
            style={{
              background: "linear-gradient(135deg,#10B981,#059669)",
              color: "white",
            }}
          >
            <div className="card-body text-center p-4">
              <div style={{ fontSize: "45px" }}>🟢</div>

              <h6 className="mt-3 text-white">Open Jobs</h6>

              <h2 className="fw-bold text-white">{dashboard.openJobs}</h2>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div
  className="card dashboard-card border-0 shadow rounded-4 h-100"
            style={{
              background: "linear-gradient(135deg,#EF4444,#DC2626)",
              color: "white",
            }}
          >
            <div className="card-body text-center p-4">
              <div style={{ fontSize: "45px" }}>🔒</div>

              <h6 className="mt-3 text-white">Closed Jobs</h6>

              <h2 className="fw-bold text-white">{dashboard.closedJobs}</h2>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
 <div
  className="card dashboard-card border-0 shadow rounded-4 h-100"
            style={{
              background: "linear-gradient(135deg,#7C3AED,#5B21B6)",
              color: "white",
            }}
          >
            <div className="card-body text-center p-4">
              <div style={{ fontSize: "45px" }}>👥</div>

              <h6 className="mt-3 text-white">Total Candidates</h6>

              <h2 className="fw-bold text-white">
                {dashboard.totalCandidates}
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Application Analytics */}

      <div className="row g-4 mt-2">
        <div className="col-lg-4 col-md-6">
<div
  className="card dashboard-card border-0 shadow rounded-4 h-100"
            style={{
              background: "linear-gradient(135deg,#F59E0B,#D97706)",
              color: "white",
            }}
          >
            <div className="card-body text-center p-4">
              <div style={{ fontSize: "45px" }}>📄</div>

              <h6 className="mt-3 text-white">Total Applications</h6>

              <h2 className="fw-bold text-white">
                {dashboard.totalApplications}
              </h2>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6">
<div
  className="card dashboard-card border-0 shadow rounded-4 h-100"
            style={{
              background: "linear-gradient(135deg,#FBBF24,#F59E0B)",
              color: "white",
            }}
          >
            <div className="card-body text-center p-4">
              <div style={{ fontSize: "45px" }}>⏳</div>

              <h6 className="mt-3 text-white">Pending Applications</h6>

              <h2 className="fw-bold text-white">
                {dashboard.pendingApplications}
              </h2>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6">
<div
  className="card dashboard-card border-0 shadow rounded-4 h-100"
            style={{
              background: "linear-gradient(135deg,#22C55E,#16A34A)",
              color: "white",
            }}
          >
            <div className="card-body text-center p-4">
              <div style={{ fontSize: "45px" }}>✅</div>

              <h6 className="mt-3 text-white">Accepted Applications</h6>

              <h2 className="fw-bold text-white">
                {dashboard.acceptedApplications}
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}

      <div className="mt-5">
        <h3 className="fw-bold mb-4">Quick Actions</h3>

        <div className="row g-4">
          <div className="col-lg-4">
            <div
  className="card quick-card border-0 shadow-lg rounded-4 h-100 text-center p-4"
              style={{
                transition: ".3s",
                cursor: "pointer",
              }}
            >
              <div
                className="mx-auto mb-4 d-flex align-items-center justify-content-center rounded-circle"
                style={{
                  width: "80px",
                  height: "80px",
                  background: "#DBEAFE",
                  fontSize: "38px",
                }}
              >
                📝
              </div>

              <h4 className="fw-bold">Post New Job</h4>

              <p className="text-muted mt-3">
                Create a new job posting and start receiving applications
                instantly.
              </p>

              <Link
                to="/post-job"
                className="btn btn-primary rounded-pill px-4 mt-3"
              >
                Post Job
              </Link>
            </div>
          </div>

          <div className="col-lg-4">
            <div
              className="card quick-card border-0 shadow-lg rounded-4 h-100 text-center p-4"
              style={{
                transition: ".3s",
                cursor: "pointer",
              }}
            >
              <div
                className="mx-auto mb-4 d-flex align-items-center justify-content-center rounded-circle"
                style={{
                  width: "80px",
                  height: "80px",
                  background: "#DCFCE7",
                  fontSize: "38px",
                }}
              >
                💼
              </div>

              <h4 className="fw-bold">Manage Jobs</h4>

              <p className="text-muted mt-3">
                Edit, close or reopen your existing job postings anytime.
              </p>

              <Link
                to="/manage-jobs"
                className="btn btn-success rounded-pill px-4 mt-3"
              >
                Manage Jobs
              </Link>
            </div>
          </div>

          <div className="col-lg-4">
            <div
              className="card quick-card border-0 shadow-lg rounded-4 h-100 text-center p-4"
              style={{
                transition: ".3s",
                cursor: "pointer",
              }}
            >
              <div
                className="mx-auto mb-4 d-flex align-items-center justify-content-center rounded-circle"
                style={{
                  width: "80px",
                  height: "80px",
                  background: "#FEF3C7",
                  fontSize: "38px",
                }}
              >
                👨‍💼
              </div>

              <h4 className="fw-bold">View Applicants</h4>

              <p className="text-muted mt-3">
                Review candidate applications and manage the hiring process.
              </p>

              <Link
                to="/view-applicants"
                className="btn btn-warning rounded-pill px-4 mt-3"
              >
                View Applicants
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Welcome Banner */}

      <div
        className="card welcome-card border-0 shadow-lg rounded-4 mt-5 overflow-hidden"
        style={{
          background: "linear-gradient(135deg,#2563EB,#1D4ED8)",
          color: "white",
        }}
      >
        <div className="card-body p-5">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h2 className="fw-bold">👋 Welcome Recruiter</h2>

              <p
                className="mt-3"
                style={{
                  fontSize: "18px",
                  lineHeight: "30px",
                }}
              >
                Keep your job postings updated, review applications regularly
                and hire the best candidates faster with JobSphere.
              </p>
            </div>

            <div className="col-lg-4 text-center">
              <div
                style={{
                  fontSize: "90px",
                }}
              >
                🚀
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recruitment Tips */}

      <div className="row mt-5 g-4">
        <div className="col-lg-6">
          <div className="card info-card border-0 shadow rounded-4 h-100">
            <div className="card-body p-4">
              <h4 className="fw-bold mb-4">💡 Recruitment Tips</h4>

              <ul
                className="mb-0"
                style={{
                  lineHeight: "35px",
                  fontSize: "17px",
                }}
              >
                <li>Keep job descriptions detailed.</li>

                <li>Mention salary whenever possible.</li>

                <li>Review applications daily.</li>

                <li>Close filled positions quickly.</li>

                <li>Respond to candidates on time.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card border-0 shadow rounded-4 h-100">
            <div className="card-body p-4">
              <h4 className="fw-bold mb-4">📊 Dashboard Summary</h4>

              <div className="mb-3">
                <strong>Total Jobs :</strong>

                <span className="float-end">{dashboard.totalJobs}</span>
              </div>

              <div className="mb-3">
                <strong>Open Jobs :</strong>

                <span className="float-end text-success">
                  {dashboard.openJobs}
                </span>
              </div>

              <div className="mb-3">
                <strong>Closed Jobs :</strong>

                <span className="float-end text-danger">
                  {dashboard.closedJobs}
                </span>
              </div>

              <div>
                <strong>Total Candidates :</strong>

                <span className="float-end text-primary">
                  {dashboard.totalCandidates}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecruiterDashboard;
